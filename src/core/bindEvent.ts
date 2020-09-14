import { getPageInfo } from './pageInfo';

import actionTracker from './actionTracker';
import pageTimeTracker from './pageTimeTracker';
import { getConfig, setConfig, IConfig } from './config';
import { sendAsync } from './send';
import hijackHistoryEvent from '../utils/hijackHistoryEvent';
import { getFlag, setFlag } from '../utils/util';

const install = function (conf?: Partial<IConfig>) {
  if (getFlag('install')) return;
  setFlag('install');
  if (conf) {
    setConfig(conf);
  }
  const config = getConfig();

  //注入history事件
  hijackHistoryEvent();

  //自动埋页面
  if (config.autoTrackPage) {
    actionTracker.trackPage();
  }

  // if (config.performance) {
  //   actionTracker.trackPerformance();
  // }

  // 页面时间start
  // if (config.pageTime && !pageTimeTracker.info.trackId) {
  //   pageTimeTracker.start();
  // }

  function routeChange() {
    pageTimeTracker.change();
    if (config.autoTrackPage) {
      actionTracker.trackPage();
    }
  }

  // 单页面应用routerchange
  if (config.watchHistoryAndHash) {
    if (typeof window.onpopstate === 'undefined') {
      window.addEventListener('hashchange', routeChange);
    }
    window.addEventListener('historyPushState', routeChange);
    window.addEventListener('historyPopstate', routeChange);
  }

  // onbeforeunload 和 onunload 都触发发送

  const onLeave = (() => {
    let sended = false;
    return () => {
      if (sended) {
        return;
      }
      if (config.pageTime) {
        pageTimeTracker.end();
      }
      sendAsync();
      sended = true;
    };
  })();

  window.addEventListener('beforeunload', onLeave);
  window.addEventListener('unload', onLeave);

  //dom 属性埋点
  type NewMouseEvent = MouseEvent & {
    path: HTMLLinkElement[] & HTMLInputElement[];
  };
  document.addEventListener(
    'click',
    (e: NewMouseEvent) => {
      const path = (e as NewMouseEvent).path;
      const element = e.target as HTMLElement & HTMLLinkElement;

      if (typeof e.path === 'undefined' || !e.isTrusted) {
        return;
      }

      for (let target of e.path) {
        if (target.tagName === 'BODY') {
          break;
        }

        //是否有埋点属性
        if (
          target.getAttribute('data-track') ||
          (config.autoTrackClick &&
            (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT') &&
            !target._isWatchTrack)
        ) {
          if (element.tagName === 'A' && element.href && !/referrer\-id=/.test(element.href)) {
            //劫持a链接注入本页面的code
            const { pageId } = getPageInfo();
            if (pageId && typeof pageId === 'string') {
              if (/\?.*=/.test(element.href)) {
                element.href = element.href.replace(/\?/, `?referrer-id=${pageId}&`);
              } else if (/\?/.test(element.href) === false) {
                element.href += `?referrer-id=${pageId}`;
              } else if (/^#/.test(element.href) === false) {
                element.href = element.href.replace(/\?/, `?referrer-id=${pageId}`);
              }
            }
            e.preventDefault();
            actionTracker.trackLink(target);
          } else {
            actionTracker.trackDom(target);
          }
        }
      }
    },
    false
  );
};

//自动install
window.addEventListener('load', () => {
  const config = getConfig();
  if (config.autoInstall) {
    install();
  }
});

export default install;
