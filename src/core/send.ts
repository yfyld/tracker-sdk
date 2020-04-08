import { ACTION_TYPE } from './../constant/index';
import { getPageInfo, setPageInfo, IPageInfo } from './pageInfo';
import http from '../utils/http';
import libInfo from './libInfo';
import clientInfo from './clientInfo';
import { getConfig, IConfig } from './config';
import { setCookie, getCookie, getUUID } from '../utils/util';
import { getUserInfo, IUserInfo } from './user';
import { SEND_TYPE } from '../constant/index';
import { ITrackerData, ICleintInfo, ILibInfo } from '../types';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

export interface ILogDataDataItem extends ITrackerData, IPageInfo {
  trackTime: number;
  id: string;
}

export interface ILogData extends ICleintInfo, IUserInfo, ILibInfo {
  data: ILogDataDataItem[];
  projectId: string;
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

export function sendSync(data: ITrackerData) {
  const config = getConfig();
  _sendToServer(_generateData(data, config));
}

/**
 * 延迟发送
 * @param data
 */
export function sendAsync(data?: ITrackerData) {
  if (!data) {
    if (allData.length > 0) {
      _sendToServer(allData);
      allData.length = 0;
    }
    clearTimeout(timer);
    return;
  }

  const config = getConfig();
  allData.push(_generateData(data, config));
  clearTimeout(timer);
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
function _sendToServer(data: ILogDataDataItem | ILogDataDataItem[], isAjax?: boolean) {
  if (!isArray(data)) {
    data = [data];
  }
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
    data,
    ...clientInfo(),
    ...libInfo,
    ...getUserInfo(),
    projectId: config.projectId,
    version: config.version
  };
}

/**
 * 补充埋点信息
 * @param data
 * @param config
 */
function _generateData(data: ITrackerData, config: IConfig): ILogDataDataItem {
  index++;
  //序列化自定义
  if (isObject(data.custom)) {
    data.custom = JSON.stringify(data.custom);
  }

  const resutl = {
    ...data,
    ...getPageInfo(),
    trackTime: Date.now(),
    id: uuid + '-' + index
  };

  //单页面设置referrer
  if (resutl.actionType === ACTION_TYPE.PAGE) {
    setTimeout(() => {
      setPageInfo({
        referrerCode: resutl.trackId,
        referrerUrl: resutl.url
      });
    }, 0);
  }

  return resutl;
}
