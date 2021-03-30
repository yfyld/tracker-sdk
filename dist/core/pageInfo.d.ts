export interface IPageInfo {
    pageId?: string;
    referrerId?: string;
    referrerUrl: string;
    sourceEventId?: string;
    url: string;
    title: string;
    host: string;
    path: string;
    hash: string;
}
export declare const getDefaultReferrerId: () => any;
export declare const getDefaultSourceEventId: () => any;
export declare const setPageInfo: (info: Partial<IPageInfo>) => void;
export declare const getPageInfo: () => {
    sourceEventId: any;
    pageId?: string;
    referrerId?: string;
    referrerUrl: string;
    url: string;
    title: string;
    host: string;
    path: string;
    hash: string;
};
