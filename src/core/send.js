import http from "../utils/http"
import trackerInfo from "./trackerInfo"
import clientInfo from "./clientInfo"
import {getConfig} from "./config"
import {setCookie,getCookie,getUUID} from "../utils/util"
import {TRACKER_DATA_KEY,SEND_TYPE,TRACKER_IDENTIFY} from '../constant'

const allData=[];
let timer=null;
let uuid=getUUID()
let index=0;

export function send(data){
  const config=getConfig();
  const sendType=config.sendType;

  data=_wrapperData(data,config);

  if(config.console){
    console.log(data)
  }

  if(sendType===SEND_TYPE.UNLOAD){
    let oldData=JSON.parse(localStorage.getItem(TRACKER_DATA_KEY)||'[]')
    localStorage.setItem(TRACKER_DATA_KEY,JSON.stringify(oldData.concat(data)))
  }else if(sendType===SEND_TYPE.SYNC){
    _sendToServer([data])
  }else if(sendType===SEND_TYPE.ASYNC){
    allData.push(data)
    sendAsyncData(config.delayTime)
  }
}


export function sendSync(data){
  const config=getConfig();
  data=_wrapperData(data,config);
  _sendToServer([data])
}


export function sendCookieData(){
  let oldData=getCookie(TRACKER_DATA_KEY)
  if(oldData&&oldData!=='[]'){
    _sendToServer(oldData,true).then(()=>{
      setCookie(TRACKER_DATA_KEY,"[]")
    })
  }
}


export function sendStorageData(){
  let oldData=localStorage.getItem(TRACKER_DATA_KEY)
  if(oldData&&oldData!=='[]'){
    _sendToServer(oldData).then(()=>{
      localStorage.removeItem(TRACKER_DATA_KEY)
    })
  }
}


export function sendAsyncData(delayTime=0,unload=false){
  if(!allData.length){
    return;
  }
  clearTimeout(timer)
  if(unload){
    _sendToServer(JSON.stringify(allData))
    allData.length=0;
    return;
  }
  timer=setTimeout(()=>{
    _sendToServer(JSON.stringify(allData))
    allData.length=0;
  },delayTime);
}



function _sendToServer(data,isAjax){
  return http(data,isAjax)
}





function _wrapperData(data,config){
  index++
  return {
    ...data,
    ...clientInfo(),
    ...trackerInfo,
    trackTime:Date.now(),
    useServerTime:config.useServerTime,
    identify:getCookie(config.identify||TRACKER_IDENTIFY),
    projectId:config.projectId,
    version:config.version,
    uuid:uuid+"-"+index
  }
}
