import track from "./decoratiors/track"
import actionTracker from "./core/actionTracker"
import pageTimeTracker from "./core/pageTimeTracker"
import {getConfig,setConfig} from './core/config'
import {sendCookieData,sendStorageData,sendAsyncData,send,sendSync} from "./core/send"
import {after,before} from "./decoratiors/tools"
import trackView from "./directives/trackView"
import trackEvent from "./directives/trackEvent"
import install from "./core/bindEvent"


//自动开始埋点
window.addEventListener('load',()=>{
  const config=getConfig()
  if(config.autoInstall){
    install()
  }
})






export {
  //装饰器
  before,
  after,
  track,
  //指令
  trackView,
  trackEvent,

  install,

  //tracker
  pageTimeTracker,
  pageTracker,
  actionTracker,

  setConfig,
  getConfig,

  sendCookieData,
  sendStorageData,
  sendAsyncData,
  send,
  sendSync,
}
