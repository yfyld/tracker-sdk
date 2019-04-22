import actionTracker from "./actionTracker";
import pageTimeTracker from "./pageTimeTracker";
import {getConfig,setConfig} from './config';
import {sendAsync,sendSync} from "./send";
import hijackHistoryEvent from "../utils/hijackHistoryEvent";
import {SEND_TYPE,TRACKER_DATA_KEY} from '../constant';
import {getFlag,setFlag} from "../utils/util";
import { Config } from '@/types';


function routeChange(){
  pageTimeTracker.change();
}

const install=function(conf?:Config){
  if(getFlag("install"))return;
  setFlag("install");

  hijackHistoryEvent();

  if(conf){
    setConfig(conf);
  }
  const config=getConfig();


  if(config.analyseScript){
    let trackerToken=window.name.match(/\{"trackerToken":.*\}/);
    if(trackerToken){
      const oHead = document.getElementsByTagName('head').item(0);
      const oScript= document.createElement("script");
      oScript.type = "text/javascript";
      oScript.src=config.analyseScript;
      oHead.appendChild(oScript);
    }
  }


  if(config.autoTrakerPage){
    actionTracker.trackPage();
  }

  if(config.performance){
    actionTracker.trackPerformance(); 
  }


  if(config.pageTime){
    pageTimeTracker.start();
  }

  if(config.watchHistoryAndHash){
    if (typeof window.onpopstate === 'undefined') {
      window.addEventListener('hashchange', routeChange);
    }
    window.addEventListener('historyPushState', routeChange);
    window.addEventListener('historyPopstate', routeChange);
  }


  window.addEventListener('beforeunload',() => {
    if(config.pageTime){
      pageTimeTracker.end();
    }
    sendAsync();
  });
  

  document.addEventListener('click',(e:any) => {
    if(!e.path||!e.isTrusted){
      return;
    }

    for(let target of e.path){
      if(target.tagName==='BODY'||!target.dataset){
        break;
      }

      if(target.dataset.track||config.autoTrakerClick&&(target.tagName==="A"||target.tagName==="BUTTON"||target.tagName==="INPUT")&&!target._isWatchTrack){
        if(e.target.tagName==='A'&&config.delayLink&&e.target.href){
          e.preventDefault();
          setTimeout(() => {
            actionTracker.trackDom(target);
            e.target.click();
          },config.delayLinkTime);
        }else{
          actionTracker.trackDom(target);
        }
      }
    }
  },false);

};



window.addEventListener('load',()=>{
  const config=getConfig()
  if(config.autoInstall){
    install()
  }
})

export default install;
