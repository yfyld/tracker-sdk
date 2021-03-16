// export default function () {
//   return {
//     clientWidth: window.screen.height,
//     clientHeight: window.screen.width,
//     radio: window.devicePixelRatio || 1,
//     domain: document.domain || ''
//   };
// }

import { getCookie, getQueryVariable, inMin, setCookie, inWechat, getUUID } from './../utils/util';

export interface IClientInfo {
  clientWidth: number;
  clientHeight: number;
  radio: number;
  domain: string;
  appId: string;
  appVersion: string;
  appType: string;
  marketid?: string;
  sessionId: string;
  channel?: string;
}

let clientInfo: IClientInfo = {
  clientWidth: window.screen.height,
  clientHeight: window.screen.width,
  radio: window.devicePixelRatio || 1,
  domain: document.domain || '',
  appId: 'H5',
  appVersion: null,
  appType: 'H5',
  marketid: null,
  sessionId: getUUID(),
  channel: null
};

export const setClientInfo = (info: Partial<IClientInfo>) => {
  //小程序
  let urlInfoStr = getQueryVariable('telescope-info');
  let urlInfo = {} as {
    appId: string;
    appVersion: string;
    marketid: string;
    sessionId: string;
    channel: string;
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
    marketid: string;
    sessionId: string;
    channel: string;
    expired: number;
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

  setCookie(
    'TELESCOPE_CACHE_INFO',
    JSON.stringify({
      appId: clientInfo.appId,
      appVersion: clientInfo.appVersion,
      marketid: clientInfo.marketid,
      channel: clientInfo.channel,
      sessionId: clientInfo.sessionId,
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
