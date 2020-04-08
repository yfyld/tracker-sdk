import { getQueryVariable } from 'src/utils/util';

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
let pageInfo: IPageInfo = {
  pageCode: null,
  referrerCode: getQueryVariable('referrer-code'),
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
};

export const getPageInfo = () => {
  return pageInfo;
};
