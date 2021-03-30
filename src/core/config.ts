import { CUSTOM_TOKEN_KEY, DEBUG_SERVER_URL, SERVER_URL } from './../constant/index';

import { SEND_TYPE } from '../constant';
// import Base64 from '../utils/base64';
// import { getGlobal } from 'src/utils/util';

export interface IConfig {
  trackKey: string;
  serverUrl: string;
  debugServerUrl: string;
  version: string;
  offlineUrl: string;
  sendType: string;
  delayTime: number;
  autoTrackPage: boolean;
  autoTrackClick: boolean;
  autoInstall: boolean;
  delayLink: boolean;
  delayLinkTime: number;
  deviceIdKey: string;
  beforeGenerateLog: Function | null;
}

//default config
let config: IConfig = {
  trackKey: '', //日志验证
  serverUrl: SERVER_URL,
  debugServerUrl: DEBUG_SERVER_URL,
  version: null,
  offlineUrl: '', // 离线带参数url
  sendType: SEND_TYPE.ASYNC, //发送日志方式 (同步发,异步延迟发,关闭浏览器前发送)
  delayTime: 1000, //延迟发送的时间
  autoTrackPage: true, //自动埋点页面
  autoTrackClick: true, //自动埋点a,button,input
  autoInstall: true, //自动开始埋点监控
  delayLink: true, //跳转延迟
  delayLinkTime: 300,
  deviceIdKey: CUSTOM_TOKEN_KEY,
  beforeGenerateLog: null
};

//script tracker-key  config
let scriptDom = document.querySelector('script[track-key]') || document.querySelector('script[trackKey]');
if (scriptDom) {
  let trackKey = scriptDom.getAttribute('track-key') || scriptDom.getAttribute('trackKey') || '';
  if (trackKey) {
    config.trackKey = trackKey;
  }
}

export function getConfig() {
  return config;
}

export function setConfig(data: Partial<IConfig>) {
  config = { ...config, ...data };
}
