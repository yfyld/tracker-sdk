import { setConfig } from './core/config';
import { login } from './core/user';

if (/\.(pre|qa|127|192|)\.|localhost/) {
  setConfig({ serverUrl: 'http://frontlo-collection.qa.91jkys.com/log.gif' });
}

if (typeof Sailer !== 'undefined' && typeof adapt !== 'undefined') {
  if (adapt.isLogin()) {
    adapt.getUserInfo().then(({ uid }: any) => {
      login(uid);
    });
  }
}
