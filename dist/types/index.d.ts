export interface ITrackerData {
    custom?: string | {
        [prop: string]: string | number | boolean;
    };
    actionType?: string;
    eventName?: string;
    pageId?: string;
    domId?: string;
    domClass?: string;
    domHref?: string;
    domName?: string;
    domTag?: string;
    domContent?: string;
    domPath?: string;
    trackId?: string;
    referrerId?: string;
}
export interface ICleintInfo {
    clientWidth: number;
    clientHeight: number;
    domain: string;
}
export interface ILibInfo {
    libType: string;
    libVersion: string;
}
export interface VisSenseConfig {
    percentageLimit?: number;
    timeLimit?: number;
    interval?: number;
}
export interface EventParam<T> {
    canBubbleArg: boolean;
    cancelableArg: boolean;
    detailArg: T;
}
