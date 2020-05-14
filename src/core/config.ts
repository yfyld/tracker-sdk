import { CUSTOM_TOKEN_KEY, SERVER_URL } from './../constant/index';

import { SEND_TYPE } from '../constant';
// import Base64 from '../utils/base64';
// import { getGlobal } from 'src/utils/util';

export interface IConfig {
  store: string;
  trackKey: string;
  serverUrl: string;
  watchHistoryAndHash: boolean;
  pageTime: boolean;
  env: string;
  console: boolean;
  projectId: number;
  version: string;
  domain: string;
  sendType: string;
  delayTime: number;
  autoTrackPage: boolean;
  autoTrackClick: boolean;
  autoInstall: boolean;
  delayLink: boolean;
  delayLinkTime: number;
  useServerTime: boolean;
  corssSubdomain: boolean;
  utokenKey: string;
}

//default config
let config: IConfig = {
  store: 'test',
  trackKey: '', //日志验证
  serverUrl: SERVER_URL,
  pageTime: true, //是否记录页面停留时间
  watchHistoryAndHash: true, //单页面应用监听
  env: 'PRODUCT',
  console: true,
  projectId: null,
  version: null,
  domain: '',
  sendType: SEND_TYPE.ASYNC, //发送日志方式 (同步发,异步延迟发,关闭浏览器前发送)
  delayTime: 1000, //延迟发送的时间
  autoTrackPage: false, //自动埋点页面
  autoTrackClick: false, //自动埋点a,button,input
  autoInstall: true, //自定开始埋点监控
  delayLink: true, //跳转延迟
  delayLinkTime: 200,
  useServerTime: true, //使用服务器时间
  corssSubdomain: false, //false 域名不同认作为两个用户
  utokenKey: CUSTOM_TOKEN_KEY
};

//script tracker-key  config
let scriptDom = document.querySelector('script[track-key]');
if (scriptDom) {
  let trackKey = scriptDom.getAttribute('track-key') || '';
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
