import { getCookie, getUUID, setCookie } from '../utils/util';
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
  // 兼容老用户优先取 TRACKER_IDENTIFY
  let deviceId = userInfo.deviceId || getCookie('TRACKER_IDENTIFY') || getCookie(config.deviceIdKey);

  if (!deviceId) {
    deviceId = getUUID();
    setCookie(config.deviceIdKey, deviceId);
  }

  const newUserInfo = { deviceId, ...info, isLogin: true };

  setUserInfo(newUserInfo);
}

export function logout() {
  setUserInfo({ uid: null, isLogin: false });
}
