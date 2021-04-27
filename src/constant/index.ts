//日志收集接口
export const SERVER_URL = `${
  window.location.protocol === 'http:' ? 'http:' : 'https:'
}//frontlo-collection.91jkys.com/log.gif`; //'http://test.qa.91jkys.com:9342/log.gif';

export const DEBUG_SERVER_URL = `${
  window.location.protocol === 'http:' ? 'http:' : 'https:'
}//frontlo-collection.91jkys.com/f2e/log.gif`;

export const CUSTOM_TOKEN_KEY = 'TRYCATCH_TOKEN';

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
  DURATION: 'DURATION',
  VIEW_DURATION: 'VIEW_DURATION'
};

export const DATA_KEY = {
  trackId: 'trackId'
};

export const SAFETY_KEY = [
  'version',
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
  'netType',
  'debug',
  'seKeywords',
  'bizId',
  'isAutoTrack',
  'autoTrackId',
  //
  'contentId',
  'patientId',
  'doctorId',
  'skuId',
  'prescriptionId',
  'storeId',
  'inquiryId',
  'orderId',
  'activityId'
];
