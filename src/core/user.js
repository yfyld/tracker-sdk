import {ACTION_TYPE} from "@/constant"

export let userInfo = {
  userId: null
}

export function getUserInfo(){
  return userInfo
}

export function login(info) {
  if (typeof info === 'object' && info) {
    userInfo = {
      ...userInfo,
      ...info
    };
  } else {
    userInfo.userId = info;
  }
}

export function logout() {
  userInfo = {};
}

export function getIdentify() {}

export function changeIdentify() {}
