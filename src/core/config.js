import {SEND_TYPE,ENVIRONMENT} from '../constant'
import Base64 from "../utils/base64"
//default config
let config={
  pageTime:false,
  env:ENVIRONMENT.PRODUCTION,
  projectId:null,
  token:null,
  version:null,
  domain:'',
  sendType:SEND_TYPE.ASYNC,
  delayTime:1000,
  autoSendCookie:true,
  autoTrakerPage:true,
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
