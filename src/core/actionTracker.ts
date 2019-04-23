import {send} from "./send"
import {ACTION_TYPE} from "../constant"
import {getDomPath} from "../utils/util"
import { TrackerData, VisSenseConfig } from "@/types";
import pageTimeTracker from './pageTimeTracker';
import { getConfig } from './config';
import performanceTracker from './performanceTracker'
import VisSense  from "./viewTracker";


class ActionTracker{
  static instance:ActionTracker=null;
  static getInstance() {
      if (!ActionTracker.instance) {
          ActionTracker.instance = new ActionTracker();
      }
      return ActionTracker.instance;
  }

  trackPage(info:TrackerData={}){
    let data:TrackerData={
      actionType:ACTION_TYPE.PAGE,
      ...info
    }
    pageTimeTracker.info=data;
    const config = getConfig()
    if(!config.pageTime){
      send(data)
    }
  }

  trackEvent(info:TrackerData={}){
    let data:TrackerData={
      actionType:ACTION_TYPE.EVENT,
      eventName:"CLICK",
      ...info
    }
    send(data)
  }

  trackView(dom:HTMLElement,info:TrackerData&VisSenseConfig={}){
    let data:TrackerData={
      actionType:ACTION_TYPE.VIEW,
      domId:dom.id,
      domClass:dom.className,
      domTag:dom.tagName,
      domContent:dom.textContent.substr(0,20),
      domPath:getDomPath(dom),
      ...info
    }

    var visobj = VisSense(dom);
    visobj.onPercentageTimeTestPassed(function() {
      send(data);
    }, {
      percentageLimit: info.percentageLimit ||0.5,
      timeLimit: info.timeLimit ||1000,
      interval: 200
    });    
  }

  track(info:TrackerData={}){
    send(info)
  }

  trackLink(linkDom:HTMLLinkElement,info:TrackerData={}){
    linkDom.addEventListener('click',function(e){
      e.preventDefault()
      setTimeout(()=>{
        linkDom.click()
      },300)
    },false)
    let trackInfo={
      href:linkDom.href||"",
      domId:linkDom.id,
      domClass:linkDom.className,
      domTag:linkDom.tagName,
      domContent:linkDom.textContent.substr(0,20),
      domPath:getDomPath(linkDom),
      ...info
    }
    this.trackEvent(trackInfo)
  }



  trackDom(dom:HTMLLinkElement&HTMLInputElement,info:TrackerData={}){
    let trackInfo:TrackerData={
      domId:dom.id,
      domClass:dom.className,
      domHref:dom.href||"",
      domName:dom.name||"",
      domTag:dom.tagName,
      domContent:dom.textContent.substr(0,20),
      domPath:getDomPath(dom)
    }

    let track=dom.dataset.track;

    if(track&&track.search(/^\{[\S\s]*\}$/)>=0){
      trackInfo={...trackInfo,...JSON.parse(track)}
    }else{
      trackInfo.trackId=track||""
    }
    if(info){
      trackInfo={...trackInfo,...info}
    }
    this.trackEvent(trackInfo)
  }

  trackPerformance(){
    const info=performanceTracker.getRenderTiming();
    if(info.loadPage<=0){
      setTimeout(()=>{
        this.trackPerformance();
      },300)
      return;
    }
    let data:TrackerData={
      actionType:ACTION_TYPE.PERFORMANCE,
      ...info
    }
    send(data)
  }
}

let instance=ActionTracker.getInstance();

export default instance
