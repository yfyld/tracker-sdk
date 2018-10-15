import actionTracker from '../core/actionTracker'
import { notChanged, isEmpty } from '../utils/util'

function handleEvent(e){
  this._trackerInfo.event=e.type.toUpperCase();
  actionTracker.trackDom(this,this._trackerInfo)
}

export default function (el, binding) {
  if (notChanged(binding) || isEmpty(binding)) {
    return
  }

  let info = {}
  if (typeof binding.value === 'object') {
    info = binding.value
  } else if (typeof binding.value === 'string') {
    info.trackId=binding.value
  }
  el._trackerInfo=info;
  el._isWatchTrack=true;//去除自动点击埋点

  let events = Object.keys(binding.modifiers).map(modifier => {
    if (binding.modifiers[modifier]) {
      return modifier
    }
  })
  if (!events.length) events.push('click')

  events.forEach((event) => {
    el.removeEventListener(event, handleEvent, false)
    el.addEventListener(event, handleEvent, false)
  })
}
