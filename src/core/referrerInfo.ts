import { getQueryVariable } from 'src/utils/util';

interface IReferrerInfo {
  pageCode: string;
  referrerCode: string;
  referrerUrl: string;
  url: string;
  title: string;
  host: string;
  path: string;
  hash: string;
}

interface ISetReferrerInfo {
  pageCode?: string;
  referrerCode?: string;
  referrerUrl?: string;
}
let referrerInfo: IReferrerInfo = {
  pageCode: null,
  referrerCode: getQueryVariable('referrer-code'),
  referrerUrl: document.referrer || '',
  url: location.origin,
  host: location.host,
  path: location.pathname,
  hash: location.hash,
  title: document.title || ''
};

export const setReferrerInfo = (info: ISetReferrerInfo) => {
  referrerInfo = {
    ...referrerInfo,
    ...info,
    url: location.origin,
    host: location.host,
    path: location.pathname,
    hash: location.hash,
    title: document.title || ''
  };
};

export const getReferrerInfo = () => {
  return referrerInfo;
};
