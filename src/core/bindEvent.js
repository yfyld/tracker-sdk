import actionTracker from "./actionTracker"
import pageTimeTracker from "./pageTimeTracker"
import {getConfig,setConfig} from './config'
import {sendCookieData,sendStorageData,sendAsyncData,send,sendSync} from "./send"
import hijackHistoryEvent from "../utils/hijackHistoryEvent"
import {SEND_TYPE,TRACKER_DATA_KEY} from '../constant'
import {getFlag,setFlag} from "../utils/util"


function routeChange(e){
  pageTimeTracker.change()
}

const install=function(conf){
  if(getFlag("install"))return;
  setFlag("install")

  hijackHistoryEvent()
  if(conf){
    setConfig(cof)
  }
  const config=getConfig();

  if(config.sendType===SEND_TYPE.UNLOAD){
    sendStorageData()
    //localStorage.removeItem(TRACKER_DATA_KEY)
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
    if(!e.path||!e.isTrusted){
      return
    }

    for(let target of e.path){
      if(target.tagName==='BODY'||!target.dataset){
        break;
      }

      if(target.dataset.track||config.autoTrakerClick&&(target.tagName==="A"||target.tagName==="BUTTON"||target.tagName==="INPUT")&&!target._isWatchTrack){
        if(e.target.tagName==='A'&&config.delayLink&&e.target.href){
          e.preventDefault()
          setTimeout(()=>{
            actionTracker.trackDom(target)
            e.target.click()
          },config.delayLinkTime)
        }else{
          actionTracker.trackDom(target)
        }
      }
    }
  },false)
}

export default install
