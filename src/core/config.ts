import { TRACKER_IDENTIFY, SERVER_URL } from './../constant/index';
import { ISetConfigParam } from './../types/index';
import { SEND_TYPE, ENVIRONMENT } from '../constant';
import Base64 from '../utils/base64';
import { IConfig } from '../types';
//default config
let config: IConfig = {
  serverUrl: SERVER_URL,
  pageTime: true, //是否记录页面停留时间
  watchHistoryAndHash: true, //单页面应用监听
  env: ENVIRONMENT.PRODUCTION,
  console: true,
  projectId: null,
  version: null,
  domain: '',
  sendType: SEND_TYPE.ASYNC, //发送日志方式 (同步发,异步延迟发,关闭浏览器前发送)
  delayTime: 1000, //延迟发送的时间
  autoTrackPage: true, //自动埋点页面
  autoTrackClick: true, //自动埋点a,button,input
  autoInstall: true, //自定开始埋点监控
  delayLink: true, //跳转延迟
  delayLinkTime: 200,
  useServerTime: true, //使用服务器时间
  corssSubdomain: false, //false 域名不同认作为两个用户
  analyseScript: '../dist/analyse.min.js',
  performance: false,
  utokenKey: TRACKER_IDENTIFY
};

//script tracker-key  config
let scriptDom = document.querySelector('script[tracker-key]');
if (scriptDom) {
  let newConfig = Base64.decode(scriptDom.getAttribute('tracker-key') || '');
  if (newConfig) {
    config = { ...config, ...JSON.parse(newConfig) };
  }
}

export function getConfig() {
  return config;
}

export function setConfig(data: ISetConfigParam) {
  config = { ...config, ...data };
}
