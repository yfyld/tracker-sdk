import { getConfig } from 'src/core/config';
import { getCookie, getQueryVariable, inMin, setCookie, inWechat, getUUID } from './../utils/util';

function getDeviceId() {
  const config = getConfig();
  let deviceId =
    getCookie(config.deviceIdKey) ||
    localStorage.getItem(config.deviceIdKey) ||
    (config.localGenerateDeviceId ? getUUID() : null);
  if (deviceId) {
    setCookie(config.deviceIdKey, deviceId);
    localStorage.setItem(config.deviceIdKey, deviceId);
  }
  return deviceId;
}

export interface IClientInfo {
  clientWidth: number;
  clientHeight: number;
  radio: number;
  domain: string;
  appId: string;
  appVersion: string;
  appType: string;
  marketId?: string;
  sessionId: string;
  channel?: string;
  deviceId?: string;
}
const config = getConfig();
let clientInfo: IClientInfo = {
  clientWidth: window.screen.height,
  clientHeight: window.screen.width,
  radio: window.devicePixelRatio || 1,
  domain: document.domain || '',
  appId: 'H5',
  appVersion: null,
  appType: 'H5',
  marketId: null,
  sessionId: getUUID(),
  channel: null,
  deviceId: getDeviceId()
};

export const setClientInfo = (info: Partial<IClientInfo>) => {
  //小程序
  let urlInfoStr = getQueryVariable('telescope-info');

  let urlInfo = {} as {
    appId: string;
    appVersion: string;
    marketId: string;
    sessionId: string;
    channel: string;
    deviceId: string;
  };
  if (urlInfoStr) {
    try {
      urlInfo = JSON.parse(decodeURIComponent(urlInfoStr));
    } catch (error) {}
  }

  // cookie 缓存
  let cookieInfoStr = getCookie('TELESCOPE_CACHE_INFO');
  let cookieInfo = {} as {
    appId: string;
    appVersion: string;
    marketId: string;
    sessionId: string;
    channel: string;
    expired: number;
    deviceId: string;
  };
  if (cookieInfoStr) {
    try {
      cookieInfo = JSON.parse(cookieInfoStr);
    } catch (error) {}
  }
  if (cookieInfo.expired && cookieInfo.expired < Date.now()) {
    // 30分钟过期
    cookieInfo.channel = null;
    cookieInfo.sessionId = getUUID();
  }
  delete cookieInfo.expired;

  const channel = getQueryVariable('channel') || urlInfo.channel || cookieInfo.channel;
  clientInfo = {
    ...clientInfo,
    ...cookieInfo,
    ...urlInfo,
    channel,
    ...info
  };
  // 兼容小程序ua不准 没法判断是否是小程序
  if (/_mini_/.test(clientInfo.appId)) {
    clientInfo.appType = 'MINI';
  }

  if (clientInfo.deviceId) {
    const config = getConfig();
    setCookie(config.deviceIdKey, clientInfo.deviceId);
    localStorage.setItem(config.deviceIdKey, clientInfo.deviceId);
  } else {
    clientInfo.deviceId = getDeviceId();
  }

  setCookie(
    'TELESCOPE_CACHE_INFO',
    JSON.stringify({
      appId: clientInfo.appId,
      appVersion: clientInfo.appVersion,
      marketId: clientInfo.marketId,
      channel: clientInfo.channel,
      sessionId: clientInfo.sessionId,
      deviceId: clientInfo.deviceId,
      expired: Date.now() + 30 * 60 * 1000
    })
  );
};

if (inMin) {
  setClientInfo({
    appType: 'MINI'
  });
} else if (inWechat) {
  setClientInfo({
    appId: 'wechat',
    appType: 'WECHAT'
  });
}

export const getClientInfo = () => {
  setClientInfo({});
  return { ...clientInfo };
};
