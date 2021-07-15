import { setClientInfo } from './core/clientInfo';
import { getCookie, getQueryVariable } from './utils/util';
import { setConfig } from './core/config';
import { setUserInfo } from './core/user';
import { login } from './core/user';
import install from './core/bindEvent';
import { is } from 'ramda';
try {
  const ua = window.navigator.userAgent;
  const protocol = window.location.protocol === 'http:' ? 'http:' : 'https:';
  const host = window.location.host;
  //跟进host 判断环境
  if (/(pre|qa|127|192)\.|localhost/.test(host) || (/env\((pre|qa)\)/i.test(ua) && !host)) {
    setConfig({
      serverUrl: `${protocol}//frontlo-collection.qa.91jkys.com/log.gif`,
      debugServerUrl: `${protocol}//frontlo-collection.qa.91jkys.com/f2e/log.gif`
    });
  } else if (/zyhealth\.com/.test(host)) {
    setConfig({
      serverUrl: `${protocol}//frontlo-collection.zyhealth.com/log.gif`,
      debugServerUrl: `${protocol}//frontlo-collection.zyhealth.com/f2e/log.gif`
    });
  } else if (/dia-solution\.com/.test(host)) {
    setConfig({
      serverUrl: `${protocol}//frontlo-collection.dia-solution.com/log.gif`,
      debugServerUrl: `${protocol}//frontlo-collection.dia-solution.com/f2e/log.gif`
    });
  } else if (/c4-91jkys\.com/.test(host)) {
    setConfig({
      serverUrl: `${protocol}//frontlo-collection.c4-91jkys.com/log.gif`,
      debugServerUrl: `${protocol}//frontlo-collection.c4-91jkys.com/f2e/log.gif`
    });
  } else if (/c10-91jkys\.com/.test(host)) {
    setConfig({
      serverUrl: `${protocol}//frontlo-collection.c10-91jkys.com/log.gif`,
      debugServerUrl: `${protocol}//frontlo-collection.c10-91jkys.com/f2e/log.gif`
    });
  }

  //获取客户端deviceId
  if (/DeviceId/i.test(ua)) {
    const deviceIdMatch = ua.match(/DeviceId\((.*?)\)/);
    if (deviceIdMatch && deviceIdMatch.length >= 2) {
      setClientInfo({
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
        appVersion: AppInfoMatch[2],
        appType: 'APP'
      });
    }
  }

  if (typeof Sailer !== 'undefined' && /AppInfo|tangyi/.test(ua)) {
    setConfig({
      autoInstall: false
    });

    Sailer.ready(() => {
      // 获取userId
      const { uid } = Sailer.getUserInfo();
      if (uid > 0) {
        login({ uid });
      }
      install();
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
