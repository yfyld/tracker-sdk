import {SEND_TYPE,ENVIRONMENT} from '../constant'
import Base64 from "../utils/base64"
//default config
let config={
  pageTime:false,  //是否记录页面停留时间
  env:ENVIRONMENT.PRODUCTION,
  projectId:null,
  token:null,
  version:null,
  domain:'',
  sendType:SEND_TYPE.ASYNC,  //发送日志方式 (存cookie下次发,同步发,异步延迟发,关闭浏览器前发送)
  delayTime:1000,
  autoSendCookie:true,
  autoTrakerPage:true,
  autoTrakerClick:true,//自动埋点a,button,input
  autoInstall:true,
  delayLink:true,
  delayLinkTime:200,
}

//script tracker-key  config
let scriptDom = document.querySelector('script[tracker-key]')
if(scriptDom){
  let newConfig = Base64.decode(scriptDom.getAttribute('tracker-key') || '');
  if(newConfig){
    config={...config,...JSON.parse(newConfig)}
  }
}



export function getConfig(){
  return config
}

export function setConfig(data){
  config={...config,...data}
}
