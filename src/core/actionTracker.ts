import { getPageInfo } from './pageInfo';

import { send, sendAsync } from './send';
import { ACTION_TYPE } from '../constant';
import { getDomPath, getRealPath, hashCode, setCookie } from '../utils/util';
import { ITrackerData, VisSenseConfig } from '../types';

import durationTime from './durationTime';
import { getConfig } from './config';

import VisSense from './viewTracker';

export type ITrackerParam = { actionType: string } & (ITrackerPageParam | ITrackerEventParam);

export interface IBusinessParam {
  patientId?: string; // 患者id
  doctorId?: string; // 医生id
  skuId?: string; // 商品id
  prescriptionId?: string; // 处方id
  storeId?: string; // 店铺id
  inquiryId?: string; // 问诊id
  orderId?: string; // 订单id
  activityId?: string; // 活动Id
}

export interface ITrackerPageParam extends IBusinessParam {
  custom?: string | { [prop: string]: string | number | boolean };
  trackId?: string;
  score?: number;
  channel?: string;
}

export interface ITrackerViewParam extends IBusinessParam {
  custom?: string | { [prop: string]: string | number | boolean };
  trackId?: string;
  score?: number;
  channel?: string;
}

export interface ITrackerEventParam extends IBusinessParam {
  custom?: string | { [prop: string]: string | number | boolean };
  eventName?: string;
  pageId?: string;
  trackId?: string;
  score?: number;
  channel?: string;
}

export interface ITrackerDebugLogParam {
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

export interface IDomInfo {
  domId?: string;
  domClass?: string;
  domHref?: string;
  domName?: string;
  domTag?: string;
  domContent?: string;
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
  constructor() {
    this.trackEvent = this.trackEvent.bind(this);
    this.trackPage = this.trackPage.bind(this);
    this.trackViewStart = this.trackViewStart.bind(this);
    this.trackView = this.trackView.bind(this);
    this.trackViewEnd = this.trackViewEnd.bind(this);
    this.trackLog = this.trackLog.bind(this);
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
    setTimeout(() => {
      const { offlineUrl, autoTrackPrefix } = getConfig();
      let data: ITrackerData = {
        actionType: ACTION_TYPE.PAGE,
        ...info
      };
      if (!data.trackId) {
        data.trackId = `${autoTrackPrefix}page-${hashCode(getRealPath(window.location.href, offlineUrl))}`;
        data.isAutoTrack = true; // 无痕埋点标记
      } else {
        // 同样记录无痕url
        this.record.pageTrackTime = Date.now();
        this.record.pageId = data.trackId;
        data.autoTrackId = `${autoTrackPrefix}page-${hashCode(getRealPath(window.location.href, offlineUrl))}`;
      }

      // 记录最新的页面曝光 用于防止无痕重复埋点 todo
      // ActionTracker.instance.record.pageId = data.trackId;
      // ActionTracker.instance.record.pageTrackTime = Date.now();
      send(data);
    }, 0);
  }

  /**
   *
   * 事件埋点
   */
  trackEvent(info: ITrackerEventParam = {}) {
    this._trackEvent(info, {});
  }

  /**
   *
   * 事件埋点传dom
   *
   */
  _trackEvent(info: ITrackerEventParam = {}, domInfo: IDomInfo) {
    const { offlineUrl, autoTrackPrefix } = getConfig();

    let data: ITrackerData = {
      actionType: ACTION_TYPE.EVENT,
      eventName: 'CLICK',
      ...info
    };
    if (!data.trackId && !data.debug) {
      let code = hashCode(domInfo?.domId + domInfo?.domClass + domInfo?.domTag);
      data.trackId = `${autoTrackPrefix}event-${hashCode(getRealPath(window.location.href, offlineUrl))}-${code}`;
      data.isAutoTrack = true;
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
    if (dom) {
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
          percentageLimit: visSenseConfig.percentageLimit || 1,
          timeLimit: visSenseConfig.timeLimit || 0,
          interval: 200
        }
      );
    }
  }

  trackViewStart(info: ITrackerViewParam) {
    send({ ...info, actionType: ACTION_TYPE.VIEW });
  }

  trackViewEnd(trackId: string) {
    const log = durationTime.end(trackId);
    if (log && log[0]) {
      send(log[0]);
    }
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
      domPath: getDomPath(dom),
      domContent: dom.textContent.substr(0, 20),
      domHref: (dom as HTMLLinkElement).href || null
    };

    let domInfo: IDomInfo = {
      domId: dom.id,
      domClass: dom.className,
      domHref: (dom as HTMLLinkElement).href || '',
      domName: (dom as HTMLInputElement).name || '',
      domTag: dom.tagName,
      domContent: dom.textContent.substr(0, 20)
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
    this._trackEvent(trackInfo, domInfo);
  }

  /**
   * 前端日志收集
   * @memberof ActionTracker
   */
  trackLog(info: ITrackerDebugLogParam = {}, domInfo: IDomInfo) {
    const { offlineUrl, autoTrackPrefix } = getConfig();

    let data: ITrackerData = {
      actionType: ACTION_TYPE.EVENT,
      eventName: 'CLICK',
      debug: true,
      ...info
    };
    if (!data.trackId && !data.debug) {
      let code = hashCode(domInfo?.domId + domInfo?.domClass + domInfo?.domTag);
      data.trackId = `${autoTrackPrefix}event-${hashCode(getRealPath(window.location.href, offlineUrl))}-${code}`;
      data.isAutoTrack = true;
    }

    send(data);
  }
}

let instance = ActionTracker.getInstance();

export default instance;
