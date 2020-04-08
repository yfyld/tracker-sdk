export interface IPageInfo {
    pageCode: string;
    referrerCode: string;
    referrerUrl: string;
    url: string;
    title: string;
    host: string;
    path: string;
    hash: string;
}
interface ISetPageInfo {
    pageCode?: string;
    referrerCode?: string;
    referrerUrl?: string;
}
export declare const setPageInfo: (info: ISetPageInfo) => void;
export declare const getPageInfo: () => IPageInfo;
export {};
