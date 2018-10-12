import actionTracker from "./actionTracker"
import pageTimeTracker from "./pageTimeTracker"
import {getConfig,setConfig} from './config'
import {sendCookieData,sendStorageData,sendAsyncData,send,sendSync} from "./send"
import hijackHistoryEvent from "../utils/hijackHistoryEvent"
import {SEND_TYPE} from '../constant'
hijackHistoryEvent()



function routeChange(e){
  pageTimeTracker.change()
}

const install=function(conf){
  if(conf){
    setConfig(cof)
  }
  const config=getConfig();

  if(config.autoSendCookie){
    sendCookieData()
  }

  if(config.autoTrakerPage){
    actionTracker.trackPage()
  }

  if(config.pageTime){
    pageTimeTracker.start()
    if (typeof window.onpopstate === 'undefined') {
      window.addEventListener('hashchange', routeChange)
    }
    window.addEventListener('historyPushState', routeChange)
    window.addEventListener('historyPopstate', routeChange)
  }

  window.addEventListener('beforeunload',()=>{
    if(config.pageTime){
      pageTimeTracker.end()
    }
    sendAsyncData(0,true)
    if(config.sendType===SEND_TYPE.UNLOAD){
      sendStorageData()
    }
  })

  document.addEventListener('click',(e)=>{
    if(!e.path){
      return
    }
    for(let target of e.path){
      if(target.tagName==='BODY'||!target.dataset){
        break;
      }
      if(target.dataset.track||config.autoTrakerClick&&(target.tagName==="A"||target.tagName==="BUTTON"||target.tagName==="INPUT")){
        console.log(e)
        actionTracker.trackByDomAttr(target)
      }
    }
  })
}

export default install
