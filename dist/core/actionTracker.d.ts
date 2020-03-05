import { ITrackerParam } from './../types/index';
import { ITrackerData, VisSenseConfig } from '../types';
declare class ActionTracker {
    static instance: ActionTracker;
    static getInstance(): ActionTracker;
    trackPage(info?: ITrackerParam): void;
    trackEvent(info?: ITrackerParam): void;
    trackView(dom: HTMLElement, info: ITrackerParam, visSenseConfig?: VisSenseConfig): void;
    track(info?: ITrackerData): void;
    trackLink(linkDom: HTMLLinkElement, info?: ITrackerData): void;
    trackDom(dom: HTMLLinkElement | HTMLInputElement | HTMLLinkElement, info?: ITrackerData): void;
    trackPerformance(): void;
}
declare let instance: ActionTracker;
export default instance;
