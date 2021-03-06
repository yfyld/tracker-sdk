import { getCookie, getQueryVariable, getUUID } from 'src/utils/util';

export interface ISessionInfo {
  sessionId: string;
  channel?: string;
  marketid?: string;

  se_keywords?: string;
  pre_se_keywords?: string;
}

let sessionInfo: ISessionInfo = {
  sessionId: getUUID(),
  channel: getQueryVariable('channel') || getCookie('TELESCOPE_CHANNEL'),
  appId: '',
  appType: 'H5'
};

export const setSessionInfo = (info: Partial<ISessionInfo>) => {
  sessionInfo = {
    ...sessionInfo,
    ...info
  };
};

export const getSessionInfo = () => {
  return { ...sessionInfo };
};
