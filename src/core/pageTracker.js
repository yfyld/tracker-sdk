import {send} from "./send"

class PageTracker{

  tracker(info={}){
    let data={
      type:"tracker-page",
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      ...info
    }
    send(data)
  }
}

export default new PageTracker()
