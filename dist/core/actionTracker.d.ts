import { ITrackerParam } from './../types/index';
import { ITrackerData, VisSenseConfig } from '../types';
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
    trackPage(info?: ITrackerParam): void;
    /**
     *
     *事件埋点
     * @param {ITrackerParam} [info={}]
     * @memberof ActionTracker
     */
    trackEvent(info?: ITrackerParam): void;
    /**
     * 视窗埋点 暂时不启用
     * @param dom
     * @param info
     * @param visSenseConfig
     */
    trackView(dom: HTMLElement, info: ITrackerParam, visSenseConfig?: VisSenseConfig): void;
    /**
     *通用埋点入口 埋点类型自行控制
     *
     * @param {ITrackerData} [info={}]
     * @memberof ActionTracker
     */
    track(info?: ITrackerData): void;
    /**
     * a标签埋点 做300毫秒延迟跳转 确保埋点成功
     * @param linkDom
     * @param info
     */
    trackLink(linkDom: HTMLLinkElement, info?: ITrackerData): void;
    /**
     *埋点dom 做1秒防抖
     *
     * @param {(HTMLLinkElement | HTMLInputElement | HTMLLinkElement)} dom
     * @param {ITrackerData} [info={}]
     * @returns
     * @memberof ActionTracker
     */
    trackDom(dom: HTMLLinkElement | HTMLInputElement | HTMLLinkElement, info?: ITrackerData): void;
    /**
     * 不启用
     */
    trackPerformance(): void;
}
declare let instance: ActionTracker;
export default instance;
