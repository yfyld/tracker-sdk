import { getCookie } from './utils/util';
import { setConfig } from './core/config';
import { setUserInfo } from './core/user';
import { login } from './core/user';
try {
  const ua = window.navigator.userAgent;
  //跟进host 判断环境
  if (/(pre|qa|127|192)\.|localhost/.test(window.location.host) || /env\((pre|qa)\)/.test(ua)) {
    setConfig({
      serverUrl: `${
        window.location.protocol === 'http:' ? 'http:' : 'https:'
      }//frontlo-collection.qa.91jkys.com/log.gif`
    });
  }

  //获取客户端deviceId
  if (/DeviceId/.test(ua)) {
    const deviceIdMatch = ua.match(/DeviceId\((.*?)\)/);
    if (deviceIdMatch && deviceIdMatch.length >= 2) {
      setUserInfo({
        deviceId: deviceIdMatch[1]
      });
    }
  }

  // 获取userId
  if (typeof Sailer !== 'undefined' && Sailer.inApp) {
    Sailer.ready(() => {
      const { uid } = Sailer.getUserInfo();
      if (uid > 0) {
        login({ uid });
      }
    });
  } else if (getCookie('login') === 'true') {
    const uid = getCookie('user_id');
    if (uid) {
      login({ uid });
    }
  }
} catch (error) {
  console.error(error);
}
