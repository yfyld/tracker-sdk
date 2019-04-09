import actionTracker from '../core/actionTracker'
import { notChanged, isEmpty } from '../utils/util'



export default function (el:HTMLElement, binding:any) {
  if (notChanged(binding) || isEmpty(binding)) {
    return
  }

  let info:any= {}
  if (typeof binding.value === 'object'&&binding.value) {
    info = binding.value
  } else if (typeof binding.value === 'string') {
    info.trackId=binding.value
  } else if (typeof binding.value === 'number') {
    info.trackId=binding.value+""
  }
  el._trackerInfo=info;
  el._isWatchTrack=true;//去除自动点击埋点

  let events = Object.keys(binding.modifiers).filter(modifier => {
    return binding.modifiers[modifier]
  })
  if (!events.length) events.push('click')
  
  events.forEach((event:string) => {
    el.removeEventListener(event, handleEvent, false)
    el.addEventListener(event, handleEvent, false)
  })
}


function handleEvent(e:Event){
  this._trackerInfo.eventName=e.type.toUpperCase();
  actionTracker.trackDom(this,this._trackerInfo)
}