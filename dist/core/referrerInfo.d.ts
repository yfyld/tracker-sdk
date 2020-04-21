interface IReferrerInfo {
  pageCode: string;
  referrerId: string;
  referrerUrl: string;
  url: string;
  title: string;
  host: string;
  path: string;
  hash: string;
}
interface ISetReferrerInfo {
  pageCode?: string;
  referrerId?: string;
  referrerUrl?: string;
}
export declare const setReferrerInfo: (info: ISetReferrerInfo) => void;
export declare const getReferrerInfo: () => IReferrerInfo;
export {};
