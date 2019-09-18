import { ACTION_TYPE, TRACKER_IDENTIFY } from '../constant/index'
import { UserInfo } from '../types'
import { getCookie, setCookie } from '../utils/util'
import { getConfig } from './config'

let userInfo: UserInfo = {
  userId: null,
  identify: null
}

export function setUserInfo(info: UserInfo) {
  const config = getConfig()
  userInfo = {
    ...userInfo,
    identify: getCookie(config.identify || TRACKER_IDENTIFY),
    ...info
  }
}

export function getUserInfo() {
  return userInfo
}

export function login(info: UserInfo) {
  const config = getConfig()
  let identify = localStorage.getItem(info.userId)
  if (identify) {
    setCookie(config.identify || TRACKER_IDENTIFY, identify)
  }
  setUserInfo(info)
}

export function logout(moment: boolean = true) {
  const config = getConfig()
  setCookie(config.identify || TRACKER_IDENTIFY, null)
  if (moment && userInfo.userId) {
    localStorage.setItem(userInfo.userId, userInfo.identify)
  }
  userInfo = {}
}

export function getIdentify() {}

export function changeIdentify() {}
