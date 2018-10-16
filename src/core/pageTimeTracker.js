import {send} from "./send"
import actionTracker from "./actionTracker"
import {ACTION_TYPE} from "../constant"
class PageTimeTracker{
  static instance=null;
  startTime=Date.now()
  endTime=Date.now()
  pageTimes=[]
  invalidStartTime=Date.now()
  invalidEndTime=Date.now()
  totalInvalidTime=0
  url=location.origin
  pageId=null

  static getInstance() {
      if (!PageTimeTracker.instance) {
          PageTimeTracker.instance = new PageTimeTracker();
      }
      return PageTimeTracker.instance;
  }

  start(){
    this.startTime=Date.now();
    this.pageTimes=[];
    this.pageId=actionTracker.pageId
    window.addEventListener('visibilitychange', ()=> {
      var isHidden = document.hidden;
      if (isHidden) {

        this.invalidStartTime=Date.now()
      } else {

        this.invalidEndTime=Date.now();
        this.totalInvalidTime+=(this.invalidEndTime-this.invalidStartTime);
      }
    });
  }

  end(){
    this.change()
    let data={
      actionType:ACTION_TYPE.TIME,
      url:location.origin,
      host:location.host,
      path:location.pathname,
      hash:location.hash,
      pageId:this.pageId,
      startTime:this.startTime,
      endTime:this.endTime,
      pageTimes:this.pageTimes,
      invalidTime:this.totalInvalidTime
    }

    send(data)

  }

  change(){
    this.pageId=actionTracker.pageId
    this.pageTimes.push({
      url:this.url,
      href: location.href,
      pageId:this.pageId,
      startTime:this.endTime,
      invalidTime:this.invalidEndTime-this.invalidStartTime,
      endTime:Date.now()
    })

    this.invalidEndTime=this.invalidStartTime=this.endTime=Date.now();
  }
}

let instance=PageTimeTracker.getInstance();

export default instance
