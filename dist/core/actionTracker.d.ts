import { VisSenseConfig } from '../types';
export declare type ITrackerParam = {
    actionType: string;
} & (ITrackerPageParam | ITrackerEventParam);
export interface IBusinessParam {
    patientId?: string;
    doctorId?: string;
    skuId?: string;
    prescriptionId?: string;
    storeId?: string;
    inquiryId?: string;
    orderId?: string;
    activityId?: string;
}
export interface ITrackerPageParam extends IBusinessParam {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
    trackId?: string;
    score?: number;
    channel?: string;
}
export interface ITrackerViewParam extends IBusinessParam {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
    trackId?: string;
    score?: number;
    channel?: string;
}
export interface ITrackerEventParam extends IBusinessParam {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
    eventName?: string;
    pageId?: string;
    trackId?: string;
    score?: number;
    channel?: string;
}
export interface ITrackerDebugLogParam {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
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
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
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
declare class ActionTracker {
    static instance: ActionTracker;
    static getInstance(): ActionTracker;
    constructor();
    record: {
        pageId: string;
        pageTrackTime: number;
        eventId: string;
        eventTrackTime: number;
    };
    /**
     * 埋点页面,
     * @memberof ActionTracker
     */
    trackPage(info?: ITrackerPageParam): void;
    /**
     *
     * 事件埋点
     */
    trackEvent(info?: ITrackerEventParam): void;
    /**
     *
     * 事件埋点传dom
     *
     */
    _trackEvent(info: ITrackerEventParam, domInfo: IDomInfo): void;
    /**
     * 视窗埋点 暂时不启用
     * @param dom
     * @param info
     * @param visSenseConfig
     */
    trackView(dom: HTMLElement, info: ITrackerViewParam, visSenseConfig?: VisSenseConfig): void;
    trackViewStart(info: ITrackerViewParam): void;
    trackViewEnd(trackId: string): void;
    /**
     *通用埋点入口 根据埋点类型调用
     *
     */
    track(info: ITrackerParam): void;
    /**
     * a标签埋点 做300毫秒延迟跳转 确保埋点成功 (暂时注销)
     * @param linkDom
     * @param info
     */
    trackLink(linkDom: HTMLLinkElement, info?: ITrackerEventParam): void;
    /**
     *埋点dom 做1秒防抖
     *
     * @param {(HTMLLinkElement | HTMLInputElement | HTMLLinkElement)} dom
     * @param {ITrackerData} [info={}]
     * @returns
     * @memberof ActionTracker
     */
    trackDom(dom: HTMLLinkElement | HTMLInputElement | HTMLLinkElement, info?: ITrackerEventParam): void;
    /**
     * 前端日志收集
     * @memberof ActionTracker
     */
    trackLog(info: ITrackerDebugLogParam, domInfo: IDomInfo): void;
}
declare let instance: ActionTracker;
export default instance;
