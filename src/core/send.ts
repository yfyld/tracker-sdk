import { ACTION_TYPE, SAFETY_KEY } from './../constant/index';
import { getPageInfo, setPageInfo, IPageInfo } from './pageInfo';
import http from '../utils/http';
import libInfo from './libInfo';
import getNetInfo from './netInfo';
import clientInfo from './clientInfo';
import { getConfig, IConfig } from './config';
import { getUUID } from '../utils/util';
import { getUserInfo, IUserInfo } from './user';
import { SEND_TYPE } from '../constant/index';
import { ITrackerData, ICleintInfo, ILibInfo } from '../types';
import { isArray, isObject } from './../utils/util';
import pick from 'ramda/src/pick';

export interface ILogDataDataItem extends ITrackerData, IPageInfo {
  trackTime: number;
  id: string;
}

export interface ILogData extends ICleintInfo, IUserInfo, ILibInfo {
  customTime: number;
  items: ILogDataDataItem[];
  version: string;
}

const allData: ILogDataDataItem[] = [];
let timer: any = null;
const uuid = getUUID();
let index = 0;

/**
 * 同步发送
 * @param data
 */
export function send(data: ITrackerData) {
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
    const newData = _generateData(data, config);
    if (!newData) {
      return;
    }
    allData.push(newData);
  }

  clearTimeout(timer);

  _sendToServer(allData);
  allData.length = 0;
}

/**
 * 延迟发送  data不存在则马上发送
 * @param data
 */
export function sendAsync(data?: ITrackerData) {
  const config = getConfig();
  if (data) {
    const newData = _generateData(data, config);
    if (!newData) {
      return;
    }
    allData.push(newData);
  }
  clearTimeout(timer);
  // 无参数或者大于10条发送发送
  if ((!data && allData.length > 0) || allData.length >= 10) {
    _sendToServer(allData);
    allData.length = 0;
    return;
  }
  timer = setTimeout(() => {
    _sendToServer(allData);
    allData.length = 0;
  }, config.delayTime);
}

/**
 * 发送到服务器
 * @param data
 * @param isAjax
 */
function _sendToServer(data: ILogDataDataItem[], isAjax?: boolean) {
  // console.log(JSON.stringify(data, null, 2));
  return http(JSON.stringify(_wrapperData(data)), isAjax);
}

/**
 * 合并其他信息
 * @param data
 */
function _wrapperData(data: ILogDataDataItem[]): ILogData {
  //console.log(JSON.stringify(data, null, 2));
  const config = getConfig();
  index++;
  return {
    customTime: Date.now(),
    items: data,
    ...clientInfo(),
    ...libInfo,
    ...getUserInfo(),
    version: config.version
  };
}

/**
 * 补充埋点信息
 * @param data
 * @param config
 */
function _generateData(data: ITrackerData, config: IConfig): ILogDataDataItem | void {
  index++;

  if (typeof config.beforeGenerateLog === 'function') {
    data = config.beforeGenerateLog(data);
    if (!data) {
      return;
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

  const pageInfo = getPageInfo();

  const netInfo = getNetInfo();

  if (data.actionType === 'PAGE') {
    pageInfo.pageId = null;
  }

  const result = {
    ...newData,
    ...pageInfo,
    ...netInfo,
    trackTime: Date.now(),
    id: uuid + '-' + index
  };

  // console.log(JSON.stringify(result, null, 2));

  return result;
}
