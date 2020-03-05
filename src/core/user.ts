import { ACTION_TYPE, TRACKER_IDENTIFY } from '../constant/index';
import { UserInfo } from '../types';
import { getCookie, setCookie } from '../utils/util';
import { getConfig } from './config';

let userInfo: UserInfo = {
  uid: null,
  isLogin: false
};

export function setUserInfo(info: UserInfo) {
  userInfo = {
    ...userInfo,
    ...info
  };
}

export function getUserInfo() {
  return userInfo;
}

export function login(info: UserInfo) {
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
