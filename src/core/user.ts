import { getCookie, setCookie } from '../utils/util';
import { getConfig } from './config';

export interface IUserInfo {
  uid?: string | number;
  isLogin: boolean;
  utoken?: string;
  deviceId?: string;
}

let userInfo: IUserInfo = {
  uid: null,
  isLogin: false
};

export function setUserInfo(info: Partial<IUserInfo>) {
  userInfo = {
    ...userInfo,
    ...info
  };
}

export function getUserInfo() {
  return userInfo;
}

export function login(info: Partial<IUserInfo>) {
  const config = getConfig();
  let deviceId = userInfo.deviceId || getCookie(config.deviceIdKey);

  const newUserInfo = { deviceId, ...info, isLogin: true };

  // let uid = window.localStorage.getItem('UTOKEN_' + deviceId);
  // if (info.uid && deviceId && uid) {
  //   if (uid !== info.uid) {
  //     newUserInfo.utoken = deviceId + '__' + info.uid;
  //   } else {
  //     newUserInfo.utoken = deviceId;
  //   }
  // }
  // if (info.uid && !uid && deviceId) {
  //   //将第一个登录用户utoken映射当前deviceId
  //   window.localStorage.setItem('UTOKEN_' + deviceId, uid);
  // }
  setUserInfo(newUserInfo);
}

export function logout() {
  setUserInfo({ uid: null, isLogin: false });
}
