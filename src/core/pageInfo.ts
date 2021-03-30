import { getCookie, getQueryVariable } from 'src/utils/util';

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

export const getDefaultReferrerId = () => {
  let referrerId = getQueryVariable('referrer_id');
  if (referrerId) {
    return referrerId;
  } else {
    try {
      const referrerData = JSON.parse(localStorage.getItem('referrer_id'));
      if (referrerData.date + 5000 > Date.now()) {
        return referrerData.id;
      }
    } catch (e) {
      return null;
    }

    localStorage.removeItem('referrer_id');
  }
};

export const getDefaultSourceEventId = () => {
  let sourceEventId = getQueryVariable('source_event_id');
  if (sourceEventId) {
    return sourceEventId;
  } else {
    try {
      const sourceEventData = JSON.parse(localStorage.getItem('source_event_id'));
      if (sourceEventData.date + 5000 > Date.now() && sourceEventData.pageId !== pageInfo.pageId) {
        return sourceEventData.id;
      }
    } catch (e) {
      return null;
    }

    localStorage.removeItem('source_event_id');
  }
};

let pageInfo: IPageInfo = {
  pageId: null,
  referrerId: getDefaultReferrerId(),
  sourceEventId: null,
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
    url: location.href,
    host: location.host,
    path: location.pathname,
    hash: location.hash,
    title: document.title || '',
    ...info
  };
};

export const getPageInfo = () => {
  return { ...pageInfo, sourceEventId: getDefaultSourceEventId() };
};
