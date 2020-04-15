import { VisSenseConfig } from '../types';
export declare type ITrackerParam = {
    actionType: string;
} & (ITrackerPageParam | ITrackerEventParam);
export interface ITrackerPageParam {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
    trackId?: string;
    score?: number;
}
export interface ITrackerViewParam {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
    trackId?: string;
    score?: number;
}
export interface ITrackerEventParam {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
    eventName?: string;
    pageId?: string;
    trackId?: string;
    score?: number;
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
/**
 *埋点入口类
 *
 * @class ActionTracker
 */
declare class ActionTracker {
    static instance: ActionTracker;
    static getInstance(): ActionTracker;
    /**
     * 埋点页面,如果需要埋页面时间重置时间 发送放pageChange发
     * @memberof ActionTracker
     */
    trackPage(info?: ITrackerPageParam): void;
    /**
     *
     *事件埋点
     */
    trackEvent(info?: ITrackerEventParam): void;
    /**
     * 视窗埋点 暂时不启用
     * @param dom
     * @param info
     * @param visSenseConfig
     */
    trackView(dom: HTMLElement, info: ITrackerViewParam, visSenseConfig?: VisSenseConfig): void;
    /**
     *通用埋点入口 埋点类型自行控制
     *
     */
    track(info: ITrackerParam): void;
    /**
     * a标签埋点 做300毫秒延迟跳转 确保埋点成功
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
}
declare let instance: ActionTracker;
export default instance;
