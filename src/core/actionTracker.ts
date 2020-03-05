import { ITrackerParam } from './../types/index';
import { send } from './send';
import { ACTION_TYPE } from '../constant';
import { getDomPath } from '../utils/util';
import { ITrackerData, VisSenseConfig } from '../types';
import pageTimeTracker from './pageTimeTracker';
import { getConfig } from './config';
import performanceTracker from './performanceTracker';
import VisSense from './viewTracker';

class ActionTracker {
  static instance: ActionTracker = null;
  static getInstance() {
    if (!ActionTracker.instance) {
      ActionTracker.instance = new ActionTracker();
    }
    return ActionTracker.instance;
  }

  trackPage(info: ITrackerParam = {}) {
    let data: ITrackerData = {
      actionType: ACTION_TYPE.PAGE,
      ...info
    };

    pageTimeTracker.info = data;
    const config = getConfig();
    if (!config.pageTime) {
      send(data);
    }
  }

  trackEvent(info: ITrackerParam = {}) {
    let data: ITrackerData = {
      actionType: ACTION_TYPE.EVENT,
      eventName: 'CLICK',
      ...info
    };
    send(data);
  }

  trackView(dom: HTMLElement, info: ITrackerParam, visSenseConfig: VisSenseConfig = {}) {
    let data: ITrackerData = {
      actionType: ACTION_TYPE.VIEW,
      domId: dom.id,
      domClass: dom.className,
      domTag: dom.tagName,
      domContent: dom.textContent.substr(0, 20),
      domPath: getDomPath(dom),
      ...info
    };

    var visobj = VisSense(dom);
    visobj.onPercentageTimeTestPassed(
      function() {
        send(data);
      },
      {
        percentageLimit: visSenseConfig.percentageLimit || 0.5,
        timeLimit: visSenseConfig.timeLimit || 1000,
        interval: 200
      }
    );
  }

  track(info: ITrackerData = {}) {
    send(info);
  }

  trackLink(linkDom: HTMLLinkElement, info: ITrackerData = {}) {
    linkDom.addEventListener(
      'click',
      function(e) {
        e.preventDefault();
        setTimeout(() => {
          linkDom.click();
        }, 300);
      },
      false
    );
    this.trackDom(linkDom, info);
  }

  trackDom(dom: HTMLLinkElement | HTMLInputElement | HTMLLinkElement, info: ITrackerData = {}) {
    //防止频繁触发
    const _dom: any = dom;
    if (_dom.IS_TRACKED) {
      clearTimeout(_dom.DELAY_TRACK_TIME);
      _dom.DELAY_TRACK_TIME = setTimeout(() => {
        _dom.IS_TRACKED = false;
      }, 1000);
      return;
    }
    _dom.IS_TRACKED = true;
    _dom.DELAY_TRACK_TIME = setTimeout(() => {
      _dom.IS_TRACKED = false;
    }, 1000);

    let trackInfo: ITrackerData = {
      domId: dom.id,
      domClass: dom.className,
      domHref: (dom as HTMLLinkElement).href || '',
      domName: (dom as HTMLInputElement).name || '',
      domTag: dom.tagName,
      domContent: dom.textContent.substr(0, 20),
      domPath: getDomPath(dom)
    };

    let track = dom.getAttribute('data-track');

    if (track && track.search(/^\{[\S\s]*\}$/) >= 0) {
      trackInfo = { ...trackInfo, ...JSON.parse(track) };
    } else {
      trackInfo.trackId = track || '';
    }
    if (info) {
      trackInfo = { ...trackInfo, ...info };
    }
    this.trackEvent(trackInfo);
  }

  trackPerformance() {
    const info = performanceTracker.getRenderTiming();
    if (info.loadPage <= 0) {
      setTimeout(() => {
        this.trackPerformance();
      }, 300);
      return;
    }
    let data: ITrackerData = {
      actionType: ACTION_TYPE.PERFORMANCE,
      ...info
    };
    send(data);
  }
}

let instance = ActionTracker.getInstance();

export default instance;
