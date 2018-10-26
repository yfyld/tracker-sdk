import {send} from "./send"
import {ACTION_TYPE} from "@/constant"
import {getDomPath} from "../utils/util"

class ActionTracker{
  pageId=(document.querySelector('meta[name="tracker-id"]')||{content:null}).content;
  static instance=null;
  static getInstance() {
      if (!ActionTracker.instance) {
          ActionTracker.instance = new ActionTracker();
      }
      return ActionTracker.instance;
  }

  trackPage(info={}){
    let data={
      actionType:ACTION_TYPE.PAGE,
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      pageId:this.pageId,
      ...info
    }
    this.pageId=data.pageId;
    window._trackerPageId=this.pageId;
    send(data)
  }

  trackEvent(info={}){
    let data={
      actionType:ACTION_TYPE.PAGE,
      eventName:"CLICK",
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      ...info
    }
    this.pageId=data.pageId;

    send(data)
  }

  track(info={}){
    let data={
      actionType:ACTION_TYPE.EVENT,
      eventName:'CLICK',
      pageId:this.pageId,
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      ...info
    }

    send(data)
  }

  trackLink(linkDom,info){
    linkDom.addEventListener('click',function(e){
      e.preventDefault()
      setTimeout(()=>{
        linkDom.click()
      },300)
    },false)
    if(info){
      let data={
        actionType:ACTION_TYPE.EVENT,
        eventName:'CLICK',
        url:location.origin,
        host:location.host,
        path:location.pathname,
        hash:location.hash,
        ...info
      }

      send(data)
    }

  }



  trackDom(dom,info){
    let trackInfo={
      domId:dom.id,
      domClass:dom.className,
      domHref:dom.href||"",
      domName:dom.name||"",
      domTag:dom.tagName,
      domContent:dom.textContent.substr(0,20),
      domPath:getDomPath(dom),
      pageId:this.pageId
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
    this.track(trackInfo)
  }
}

let instance=ActionTracker.getInstance();

export default instance
