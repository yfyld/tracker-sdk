export interface TrackerData {
  actionType?: string
  eventName?: string
  url?: string
  host?: string
  path?: string
  hash?: string
  pageId?: string
  domId?: string
  domClass?: string
  domHref?: string
  domName?: string
  domTag?: string
  domContent?: string
  domPath?: string
  trackId?: string
}

export interface Config {
  watchHistoryAndHash?: boolean
  pageTime?: boolean
  env?: string
  console?: boolean
  projectId?: string
  token?: string
  version?: string
  domain?: string
  sendType?: string
  delayTime?: number
  autoTrackPage?: boolean
  autoTrackClick?: boolean
  autoInstall?: boolean
  delayLink?: boolean
  delayLinkTime?: number
  useServerTime?: boolean
  corssSubdomain?: boolean
  analyseScript?: string
  identify?: string
  performance?: boolean
}

export interface VisSenseConfig {
  percentageLimit?: number
  timeLimit?: number
  interval?: number
}
export interface UserInfo {
  userId?: string
  identify?: string
}

export interface EventParam<T> {
  canBubbleArg: boolean
  cancelableArg: boolean
  detailArg: T
}

export interface PerformanceTime {
  loadPage: number
  domReady: number
  redirect: number
  lookupDomain: number
  ttfb: number
  request: number
  loadEvent: number
  appcache: number
  unloadEvent: number
  connect: number
}

export interface PerformanceEntryFilterOptions {
  name: string
  entryType: string
  initiatorType: string
}
