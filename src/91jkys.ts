import { setClientInfo } from './core/clientInfo';
import { getCookie, getQueryVariable, inMin, inWechat } from './utils/util';
import { setConfig } from './core/config';
import { setUserInfo } from './core/user';
import { login } from './core/user';
try {
  const ua = window.navigator.userAgent;
  //跟进host 判断环境
  if (
    /(pre|qa|127|192)\.|localhost/.test(window.location.host) ||
    (/env\((pre|qa)\)/i.test(ua) && !window.location.host)
  ) {
    setConfig({
      serverUrl: `${
        window.location.protocol === 'http:' ? 'http:' : 'https:'
      }//frontlo-collection.qa.91jkys.com/log.gif`
    });
  }

  //获取客户端deviceId
  if (/DeviceId/i.test(ua)) {
    const deviceIdMatch = ua.match(/DeviceId\((.*?)\)/);
    if (deviceIdMatch && deviceIdMatch.length >= 2) {
      setUserInfo({
        deviceId: deviceIdMatch[1]
      });
    }
  }

  //获取appID 和app版本
  if (/AppInfo/i.test(ua)) {
    const AppInfoMatch = ua.match(/AppInfo\((.*?);(.*?)\)/);
    if (AppInfoMatch && AppInfoMatch.length >= 3) {
      setClientInfo({
        appId: AppInfoMatch[1],
        appVersion: AppInfoMatch[2]
      });
    }
  }

  // 获取userId
  if (typeof Sailer !== 'undefined' && /AppInfo|tangyi/.test(ua)) {
    Sailer.ready(() => {
      const { uid } = Sailer.getUserInfo();
      if (uid > 0) {
        login({ uid });
      }
    });
    //zyyd_login
  } else {
    const uid = getCookie('user_id') || getCookie('wechat_uid');
    if (uid) {
      login({ uid });
    }
  }
} catch (error) {
  console.error(error);
}
