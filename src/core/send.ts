import { getClientInfo } from './clientInfo';
import { ACTION_TYPE, SAFETY_KEY } from './../constant/index';
import { getPageInfo, setPageInfo, IPageInfo } from './pageInfo';
import http from '../utils/http';
import libInfo from './libInfo';
import getNetInfo from './netInfo';
import durationTime from './durationTime';

import { getConfig, IConfig } from './config';
import { getCookie, getQueryVariable, getUUID, setCookie } from '../utils/util';
import { getUserInfo, IUserInfo } from './user';
import { SEND_TYPE } from '../constant/index';
import { ITrackerData, ICleintInfo, ILibInfo } from '../types';
import { isArray, isObject } from './../utils/util';
import pick from 'ramda/src/pick';
import { getBusinessExtension, setBuinessExtension } from './business';

export interface ILogDataDataItem extends ITrackerData, IPageInfo {
  trackTime: number;
  startTime?: number;
  id: string;
  trackId?: string;
}

export interface ILogData extends ICleintInfo, IUserInfo, ILibInfo {
  customTime: number;
  items: ILogDataDataItem[];
  version: string;
}

const allData: ILogDataDataItem[] = [];
const allDebugData: ILogDataDataItem[] = [];
let timer: any = null;
const uuid = getUUID();
let index = 0;

/**
 * 同步发送
 * @param data
 */
export function send(data: ITrackerData | ILogDataDataItem) {
  const config = getConfig();
  const { sendType } = config;
  if (sendType === SEND_TYPE.SYNC) {
    sendSync(data);
  } else if (sendType === SEND_TYPE.ASYNC) {
    sendAsync(data);
  }
}

export function sendSync(data?: ITrackerData) {
  if (data) {
    const config = getConfig();
    const [newData, debug] = _generateData(data, config);
    if (!newData) {
      return;
    }
    if (debug) {
      allDebugData.push(newData);
    } else {
      allData.push(newData);
    }
  }

  clearTimeout(timer);

  _sendToServer(allData);
  _sendToServer(allDebugData, true);
  allData.length = 0;
  allDebugData.length = 0;
}

/**
 * 延迟发送  data不存在则马上发送allData
 * @param data
 */
export function sendAsync(data?: ITrackerData) {
  const config = getConfig();
  if (data) {
    const [newData, debug] = _generateData(data, config);
    if (!newData) {
      return;
    }
    if (debug) {
      allDebugData.push(newData);
    } else {
      allData.push(newData);
    }
  }
  clearTimeout(timer);
  // 无参数或者大于10条发送发送
  if ((!data && allData.length > 0) || allData.length >= 10 || allDebugData.length >= 10) {
    _sendToServer(allData);
    _sendToServer(allDebugData, true);
    allData.length = 0;
    allDebugData.length = 0;
    return;
  }
  timer = setTimeout(() => {
    _sendToServer(allData);
    _sendToServer(allDebugData, true);
    allData.length = 0;
    allDebugData.length = 0;
  }, config.delayTime);
}

/**
 * 发送到服务器
 * @param data
 * @param isAjax
 */
function _sendToServer(data: ILogDataDataItem[], isAjax?: boolean) {
  if (!data.length) {
    return;
  }
  return http(JSON.stringify(_wrapperData(data)), isAjax);
}

/**
 * 合并其他信息
 * @param data
 */
function _wrapperData(data: ILogDataDataItem[]): ILogData {
  const config = getConfig();
  index++;

  const wrapperData = {
    customTime: Date.now(),
    items: data,
    ...getClientInfo(),
    ...libInfo,
    ...getUserInfo(),
    version: config.version
  };

  console.log(JSON.stringify(wrapperData, null, 2));
  return wrapperData;
}

/**
 * 补充埋点信息
 * @param data
 * @param config
 */
function _generateData(data: ITrackerData, config: IConfig): [ILogDataDataItem, boolean] {
  index++;

  if (typeof config.beforeGenerateLog === 'function') {
    data = config.beforeGenerateLog(data);
    if (!data) {
      return [null, !!data.debug];
    }
  }

  //序列化自定义
  if (isObject(data.custom)) {
    data.custom = JSON.stringify(data.custom);
  }

  if (typeof data.custom === 'string' && data.custom.length > 500) {
    data.custom = data.custom.substr(0, 500) + '[超出500部分被裁剪]';
  }

  const newData = pick(SAFETY_KEY, data);
  let pageInfo = getPageInfo();
  const netInfo = getNetInfo();

  setBuinessExtension({
    seKeywords: getQueryVariable('seKeywords'),
    bizId: getQueryVariable('bizId')
  });

  const businessInfo = getBusinessExtension();
  if (data.actionType === ACTION_TYPE.PAGE) {
    //修改当前pageInfo
    setPageInfo({
      pageId: data.trackId || '',
      referrerId: pageInfo.pageId || pageInfo.referrerId || '',
      referrerUrl: pageInfo.url || ''
    });
    pageInfo = getPageInfo();
    pageInfo.pageId = null;
  }

  if (data.actionType === ACTION_TYPE.EVENT) {
    let sourceEventInfo = {
      date: Date.now(),
      id: data.trackId,
      pageId: pageInfo.pageId,
      isAutoTrack: data.isAutoTrack
    };
    if (data.isAutoTrack) {
      try {
        let preSourceEventInfo = JSON.parse(localStorage.getItem('source_event_id'));
        if (preSourceEventInfo && !preSourceEventInfo.isAutoTrack && preSourceEventInfo.date > Date.now() - 300) {
          sourceEventInfo = null;
        }
      } catch (error) {}
    }

    if (sourceEventInfo) {
      localStorage.setItem('source_event_id', JSON.stringify(sourceEventInfo));
    }
  }

  const result = {
    ...newData,
    ...pageInfo,
    ...netInfo,
    ...businessInfo,
    trackTime: Date.now(),
    id: uuid + '-' + index
  };

  if (result.actionType === ACTION_TYPE.PAGE && !data.debug) {
    const durationLogs = durationTime.end();
    if (durationLogs && durationLogs.length) {
      _sendToServer(durationLogs);
    }
    durationTime.start(result);
    localStorage.removeItem('source_event_id');
  } else {
    result.sourceEventId = null;
  }

  if (result.actionType === ACTION_TYPE.VIEW && !data.debug) {
    durationTime.start(result);
  }

  //.log(JSON.stringify(result, null, 2));

  return [result, !!data.debug];
}
