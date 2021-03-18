import { getPageInfo } from './pageInfo';

import { send, sendAsync } from './send';
import { ACTION_TYPE } from '../constant';
import { getDomPath, getRealPath, hashCode } from '../utils/util';
import { ITrackerData, VisSenseConfig } from '../types';

import durationTime from './durationTime';
import { getConfig } from './config';

import VisSense from './viewTracker';

export type ITrackerParam = { actionType: string } & (ITrackerPageParam | ITrackerEventParam);

export interface ITrackerPageParam {
  custom?: string | { [prop: string]: string | number | boolean };
  trackId?: string;
  score?: number;
  channel?: string;
}

export interface ITrackerViewParam {
  custom?: string | { [prop: string]: string | number | boolean };
  trackId?: string;
  score?: number;
  channel?: string;
}

export interface ITrackerEventParam {
  custom?: string | { [prop: string]: string | number | boolean };
  eventName?: string;
  pageId?: string;
  trackId?: string;
  score?: number;
  channel?: string;
}

export interface ITrackerDomParam {
  trackId: string;
  actionType: string;
  eventName: string;
  domId: string;
  domClass: string;
  domHref: string;
  domName: string;
  domTag: string;
  domContent: string;
  domPath: string;
}

export interface ITrackerDurationParam {
  custom?: string | { [prop: string]: string | number | boolean };
  pageId?: string;
  score?: number;
  channel?: string;
}

/**
 *埋点入口类
 *
 * @class ActionTracker
 */
class ActionTracker {
  static instance: ActionTracker = null;
  static getInstance() {
    if (!ActionTracker.instance) {
      ActionTracker.instance = new ActionTracker();
    }
    return ActionTracker.instance;
  }

  record = {
    pageId: '',
    pageTrackTime: null as number,
    eventId: '',
    eventTrackTime: null as number
  };

  /**
   * 埋点页面,
   * @memberof ActionTracker
   */
  trackPage(info: ITrackerPageParam = {}) {
    let data: ITrackerData = {
      actionType: ACTION_TYPE.PAGE,
      ...info
    };
    if (!data.trackId) {
      data.trackId = `zyjk-${hashCode(getRealPath(window.location.href))}`;
    }

    // 记录最新的页面曝光 用于防止无痕重复埋点 todo
    this.record.pageId = data.trackId;
    this.record.pageTrackTime = Date.now();
    send(data);
  }

  /**
   *
   *事件埋点
   */
  trackEvent(info: ITrackerEventParam = {}) {
    let data: ITrackerData = {
      actionType: ACTION_TYPE.EVENT,
      eventName: 'CLICK',
      ...info
    };
    if (!data.trackId && !data.debug) {
      let code = data.domId || hashCode(data.domTag + data.domPath + data.domContent);
      data.trackId = `zyjk-${hashCode(getRealPath(window.location.href))}-${code}`;
    }
    send(data);
  }

  /**
   * 视窗埋点 暂时不启用
   * @param dom
   * @param info
   * @param visSenseConfig
   */
  trackView(dom: HTMLElement, info: ITrackerViewParam, visSenseConfig: VisSenseConfig = {}) {
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
      function () {
        send(data);
      },
      {
        percentageLimit: visSenseConfig.percentageLimit || 0.5,
        timeLimit: visSenseConfig.timeLimit || 1000,
        interval: 200
      }
    );
  }

  /**
   *通用埋点入口 根据埋点类型调用
   *
   */
  track(info: ITrackerParam) {
    switch (info.actionType) {
      case ACTION_TYPE.EVENT:
        this.trackEvent(info);
        break;
      case ACTION_TYPE.PAGE:
        this.trackPage(info);
        break;
      default:
        break;
    }
    send(info);
  }

  /**
   * a标签埋点 做300毫秒延迟跳转 确保埋点成功 (暂时注销)
   * @param linkDom
   * @param info
   */
  trackLink(linkDom: HTMLLinkElement, info: ITrackerEventParam = {}) {
    // const config = getConfig();
    // if (config.delayLink) {
    //   const delayFn = function (e: MouseEvent) {
    //     e.preventDefault();
    //     linkDom.removeEventListener('click', delayFn, false);
    //     const href = linkDom.getAttribute('href');
    //     if (href && /^https?:\/\//.test(href)) {
    //       setTimeout(() => {
    //         linkDom.click();
    //       }, config.delayLinkTime);
    //     }
    //   };

    //   linkDom.addEventListener('click', delayFn, false);
    //   return;
    // }
    this.trackDom(linkDom, info);
    sendAsync();
  }

  /**
   *埋点dom 做1秒防抖
   *
   * @param {(HTMLLinkElement | HTMLInputElement | HTMLLinkElement)} dom
   * @param {ITrackerData} [info={}]
   * @returns
   * @memberof ActionTracker
   */
  trackDom(dom: HTMLLinkElement | HTMLInputElement | HTMLLinkElement, info: ITrackerEventParam = {}) {
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

    let trackInfo = {
      trackId: '',
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
}

let instance = ActionTracker.getInstance();

export default instance;
