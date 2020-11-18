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
      let element = e.target as HTMLElement & HTMLLinkElement;

      while (element && element.tagName && element.tagName.toUpperCase() !== 'HTML' && element.getAttribute) {
        //是否有埋点属性
        if (
          element.getAttribute('data-track') ||
          (config.autoTrackClick &&
            (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'INPUT') &&
            !element._isWatchTrack)
        ) {
          if (element.tagName === 'A' && element.href && !/referrer\-id=/.test(element.href)) {
            //劫持a链接注入本页面的code
            const { pageId } = getPageInfo();
            if (pageId && typeof pageId === 'string' && /:\/\//.test(element.href)) {
              if (/\?.*=/.test(element.href)) {
                element.href = element.href.replace(/\?/, `?referrer-id=${pageId}&`);
              } else if (/\?/.test(element.href) === false) {
                element.href += `?referrer-id=${pageId}`;
              }
            }

            actionTracker.trackLink(element);
          } else {
            actionTracker.trackDom(element);
          }
        }

        element = element.parentNode as HTMLElement & HTMLLinkElement;
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
