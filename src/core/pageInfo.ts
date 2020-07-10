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

let pageInfo: IPageInfo = {
  pageId: null,
  referrerId: getQueryVariable('referrer-id'),
  referrerUrl: document.referrer || '',
  url: location.href,
  host: location.host,
  path: location.pathname,
  hash: location.hash,
  title: document.title || ''
};

export const setPageInfo = (info: Partial<IPageInfo>) => {
  pageInfo = {
    ...pageInfo,
    ...info,
    url: location.href,
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
