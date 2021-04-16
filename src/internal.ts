import tracker from './decoratiors/tracker';
import actionTracker from './core/actionTracker';

import { getConfig, setConfig } from './core/config';
import { sendAsync, send, sendSync } from './core/send';
import { after, before } from './decoratiors/tools';
import vTrackView from './directives/trackView';
import vTrackEvent from './directives/trackEvent';
import vTrackPage from './directives/trackPage';
import install from './core/bindEvent';
import { login, logout } from './core/user';

const trackDom = actionTracker.trackDom;
const trackPage = actionTracker.trackPage;
const trackEvent = actionTracker.trackEvent;
const trackViewStart = actionTracker.trackViewStart;
const trackViewEnd = actionTracker.trackViewEnd;
const trackView = actionTracker.trackView;
const trackLink = actionTracker.trackLink;
const track = actionTracker.track;

export {
  //装饰器
  before,
  after,
  tracker,
  //指令
  vTrackView,
  vTrackEvent,
  vTrackPage,
  //
  install,
  //tracker
  actionTracker,
  trackDom,
  trackPage,
  trackEvent,
  trackViewStart,
  trackView,
  trackViewEnd,
  trackLink,
  track,
  //config
  setConfig,
  getConfig,
  //send
  sendAsync,
  send,
  sendSync,
  //user
  login,
  logout
};
