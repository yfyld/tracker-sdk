import { setConfig } from './core/config';
import { setUserInfo } from './core/user';
// import { login } from './core/user';

const ua = window.navigator.userAgent;
if (/(pre|qa|127|192|)\.|localhost/.test(window.location.host)) {
  setConfig({
    serverUrl: `${window.location.protocol === 'http:' ? 'http:' : 'https:'}//frontlo-collection.qa.91jkys.com/log.gif`
  });
}

if (/DeviceId/.test(ua)) {
  const deviceIdMatch = ua.match(/DeviceId\((.*)\)/);
  if (deviceIdMatch && deviceIdMatch.length >= 2) {
    setUserInfo({
      utoken: deviceIdMatch[1]
    });
  }
}

// if (typeof Sailer !== 'undefined' && typeof adapt !== 'undefined') {
//   if (adapt.isLogin()) {
//     adapt.getUserInfo().then(({ uid }: any) => {
//       login(uid);
//     });
//   }
// }
