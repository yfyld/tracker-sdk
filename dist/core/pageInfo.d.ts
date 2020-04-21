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
interface ISetPageInfo {
    pageId?: string;
    referrerId?: string;
    referrerUrl?: string;
}
export declare const setPageInfo: (info: ISetPageInfo) => void;
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
export {};
