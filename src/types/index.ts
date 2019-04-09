export interface TrackerData{
  actionType?:string,
  eventName?:string,
  url?:string,
  host?:string,
  path?:string,
  hash?:string,
  pageId?:string,
  domId?:string,
  domClass?:string,
  domHref?:string,
  domName?:string,
  domTag?:string,
  domContent?:string,
  domPath?:string,
  trackId?:string
}

export interface Config{
  pageTime?:boolean,  
  env?:string,
  console?:boolean,
  projectId?:string,
  token?:string,
  version?:string,
  domain?:string,
  sendType?:string,  
  delayTime?:number,  
  autoTrakerPage?:boolean,
  autoTrakerClick?:boolean,
  autoInstall?:boolean,
  delayLink?:boolean,
  delayLinkTime?:number,
  useServerTime?:boolean,
  corssSubdomain?:boolean, 
  analyseScript?:string,
  identify?:string
}



export interface UserInfo{
  userId?:string
}

export interface EventParam<T>{
  canBubbleArg: boolean
  cancelableArg: boolean
  detailArg: T
}