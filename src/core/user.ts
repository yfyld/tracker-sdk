import { getCookie, setCookie } from '../utils/util';
import { getConfig } from './config';

export interface IUserInfo {
  uid?: string | number;
  isLogin: boolean;
}

let userInfo: IUserInfo = {
  uid: null,
  isLogin: false
};

export function setUserInfo(info: IUserInfo) {
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
  if (info.uid) {
    let utoken = localStorage.getItem(config.utokenKey + '__' + info.uid);
    if (utoken) {
      setCookie(config.utokenKey, utoken);
    }
  }
  setUserInfo({ ...info, isLogin: true });
}

export function logout(moment: boolean = false) {
  const config = getConfig();
  const utoken = getCookie(config.utokenKey);

  if (moment) {
    localStorage.setItem(config.utokenKey + '__' + (userInfo.uid || ''), utoken);
    setCookie(config.utokenKey, null);
  }
  userInfo = { uid: null, isLogin: false };
}
