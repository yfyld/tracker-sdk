import {send} from "./send"

class ActionTracker{

  tracker(info={}){
    let data={
      type:"tracker_action",
      event:'CLICK',
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      ...info
    }
    send(data)
  }
}

export default new ActionTracker()
