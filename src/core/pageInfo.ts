import { getQueryVariable } from 'src/utils/util';

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
let pageInfo: IPageInfo = {
  pageId: null,
  referrerId: getQueryVariable('referrer-id'),
  referrerUrl: document.referrer || '',
  url: location.origin,
  host: location.host,
  path: location.pathname,
  hash: location.hash,
  title: document.title || ''
};

export const setPageInfo = (info: ISetPageInfo) => {
  pageInfo = {
    ...pageInfo,
    ...info,
    url: location.origin,
    host: location.host,
    path: location.pathname,
    hash: location.hash,
    title: document.title || ''
  };
  (window as any).aaa = pageInfo;
};

export const getPageInfo = () => {
  return { ...pageInfo };
};
