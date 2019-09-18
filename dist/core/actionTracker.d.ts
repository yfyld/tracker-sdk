import { TrackerData, VisSenseConfig } from '../types';
declare class ActionTracker {
    static instance: ActionTracker;
    static getInstance(): ActionTracker;
    trackPage(info?: TrackerData): void;
    trackEvent(info?: TrackerData): void;
    trackView(dom: HTMLElement, info?: TrackerData & VisSenseConfig): void;
    track(info?: TrackerData): void;
    trackLink(linkDom: HTMLLinkElement, info?: TrackerData): void;
    trackDom(dom: HTMLLinkElement & HTMLInputElement, info?: TrackerData): void;
    trackPerformance(): void;
}
declare let instance: ActionTracker;
export default instance;
