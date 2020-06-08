import { setConfig } from './core/config';
// import { login } from './core/user';

if (/(pre|qa|127|192|)\.|localhost/.test(window.location.host)) {
  setConfig({
    serverUrl: `${window.location.protocol === 'http:' ? 'http:' : 'https:'}//frontlo-collection.qa.91jkys.com/log.gif`
  });
}

// if (typeof Sailer !== 'undefined' && typeof adapt !== 'undefined') {
//   if (adapt.isLogin()) {
//     adapt.getUserInfo().then(({ uid }: any) => {
//       login(uid);
//     });
//   }
// }
