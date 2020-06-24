import actionTracker, { ITrackerEventParam } from '../core/actionTracker';
import { notChanged, isEmpty } from '../utils/util';

export default function (el: HTMLElement, binding: any) {
  if (notChanged(binding) || isEmpty(binding)) {
    return;
  }

  let info: ITrackerEventParam = {};
  if (typeof binding.value === 'object' && binding.value) {
    info = binding.value as ITrackerEventParam;
  } else if (typeof binding.value === 'string') {
    info.trackId = binding.value;
  } else if (typeof binding.value === 'number') {
    info.trackId = binding.value + '';
  }
  el._trackerInfo = info;
  el._isWatchTrack = true; //去除自动点击埋点

  let events = Object.keys(binding.modifiers).filter((modifier) => {
    return binding.modifiers[modifier];
  });
  if (!events.length) events.push('click');

  events.forEach((event: string) => {
    el.removeEventListener(event, handleEvent, false);
    el.addEventListener(event, handleEvent, false);
  });
}

function handleEvent(e: Event) {
  this._trackerInfo.eventName = e.type.toUpperCase();
  if (this.tagName === 'A' && this.href) {
    actionTracker.trackLink(this, this._trackerInfo as ITrackerEventParam);
  } else {
    actionTracker.trackDom(this, this._trackerInfo as ITrackerEventParam);
  }
}
