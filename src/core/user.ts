import { getCookie, getUUID, setCookie } from '../utils/util';
import { getConfig } from './config';

export interface IUserInfo {
  uid?: string | number;
  isLogin: boolean;
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
  const newUserInfo = { ...info, isLogin: true };

  setUserInfo(newUserInfo);
}

export function logout() {
  setUserInfo({ uid: null, isLogin: false });
}
