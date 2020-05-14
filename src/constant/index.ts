//日志收集接口
export const SERVER_URL = `${
  window.location.protocol === 'https:' ? 'https:' : 'http:'
}//frontlo-collection.91jkys.com/log.gif`; //'http://test.qa.91jkys.com:9342/log.gif';

export const CUSTOM_TOKEN_KEY = 'TRACKER_IDENTIFY';

export const SEND_TYPE = {
  SYNC: 'SYNC',
  ASYNC: 'ASYNC',
  UNLOAD: 'UNLOAD'
};

export const ENVIRONMENT = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
};

export const ACTION_TYPE = {
  EVENT: 'EVENT',
  PAGE: 'PAGE',
  VIEW: 'VIEW',
  DURATION: 'DURATION'
};

export const DATA_KEY = {
  trackId: 'trackId'
};

export const SAFETY_KEY = [
  'custom',
  'actionType',
  'eventName',
  'pageId',
  'domId',
  'domClass',
  'domHref',
  'domName',
  'domTag',
  'domContent',
  'domPath',
  'trackId',
  'referrerId',
  'score',
  'startTime',
  'endTime',
  'durationTime',
  'channel',
  'netType'
];
