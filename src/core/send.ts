import { ACTION_TYPE } from './../constant/index';
import { getReferrerInfo, setReferrerInfo } from './referrerInfo';
import http from '../utils/http';
import trackerInfo from './trackerInfo';
import clientInfo from './clientInfo';
import { getConfig } from './config';
import { setCookie, getCookie, getUUID } from '../utils/util';
import { getUserInfo } from './user';
import { SEND_TYPE } from '../constant/index';
import { IConfig, ITrackerData } from '../types';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const allData: ITrackerData[] = [];
let timer: any = null;
const uuid = getUUID();
let index = 0;

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
  data = _generateData(data, config);
  _sendToServer(data);
}

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
  data = _generateData(data, config);
  allData.push(data);
  clearTimeout(timer);
  timer = setTimeout(() => {
    _sendToServer(allData);
    allData.length = 0;
  }, config.delayTime);
}

//发送到服务器
function _sendToServer(data: ITrackerData | ITrackerData[], isAjax?: boolean) {
  if (!isArray(data)) {
    data = [data];
  }
  return http(JSON.stringify(_wrapperData(data)), isAjax);
}

function _wrapperData(data: ITrackerData[]) {
  //console.log(JSON.stringify(data, null, 2));
  const config = getConfig();
  index++;
  return {
    data,
    ...clientInfo(),
    ...trackerInfo,
    ...getUserInfo(),
    projectId: config.projectId,
    version: config.version
  };
}

function _generateData(data: ITrackerData, config: IConfig) {
  index++;
  if (isObject(data.custom)) {
    data.custom = Object.entries(data.custom)
      .map(([key, val]) => {
        return `@${key}:${val}`;
      })
      .join('');
  }

  const resutl = {
    ...data,
    ...getReferrerInfo(),
    trackTime: Date.now(),
    id: uuid + '-' + index
  };

  //单页面设置referrer
  if (data.actionType === ACTION_TYPE.PAGE) {
    setTimeout(() => {
      setReferrerInfo({
        referrerCode: data.trackId,
        referrerUrl: data.url
      });
    }, 0);
  }
  return resutl;
}
