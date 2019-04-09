import {ACTION_TYPE} from "../constant/index"
import { UserInfo } from '@/types';

export let userInfo:UserInfo = {
  userId: null
}

export function getUserInfo(){
  return userInfo
}

export function login(info:UserInfo) {
  userInfo = {
    ...userInfo,
    ...info
  };
}

export function logout() {
  userInfo = {};
}

export function getIdentify() {}

export function changeIdentify() {}
