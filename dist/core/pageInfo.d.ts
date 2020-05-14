export interface IPageInfo {
    pageId?: string;
    referrerId?: string;
    referrerUrl: string;
    url: string;
    title: string;
    host: string;
    path: string;
    hash: string;
}
export declare const setPageInfo: (info: Partial<IPageInfo>) => void;
export declare const getPageInfo: () => {
    pageId?: string;
    referrerId?: string;
    referrerUrl: string;
    url: string;
    title: string;
    host: string;
    path: string;
    hash: string;
};
