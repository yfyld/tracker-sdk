import {send} from "./send"
import {ACTION_TYPE} from "../constant"

class ActionTracker{

  pageId=null;

  trackPage(info={}){
    let data={
      type:ACTION_TYPE.PAGE,
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      ...info
    }
    this.pageId=data.pageId;
        console.log(data)
    send(data)
  }

  track(info={}){
    let data={
      type:ACTION_TYPE.EVENT,
      event:'CLICK',
      pageId:this.pageId,
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      ...info
    }
        console.log(data)
    send(data)
  }

  trackLink(info={}){
    let data={
      type:ACTION_TYPE.EVENT,
      event:'CLICK',
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      ...info
    }
        console.log(data)
    send(data)
  }

  trackByDomAttr(dom){
    let info={
      domId:dom.id,
      domClass:dom.className,
      domHref:dom.href||"",
      domName:dom.name||"",
      domTag:dom.tagName,
      domContent:dom.textContent.substr(0,20),
      pageId:this.pageId
    }

    let track=dom.dataset.track;

    if(track&&track.search(/^\{[\S\s]*\}$/)>=0){
      info={...info,...JSON.parse(track)}
    }else{
      info.trackId=track||""
    }
    this.track(info)
  }
}

export default new ActionTracker()
