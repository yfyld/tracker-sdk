import { ISetConfigParam } from './../types/index';
import actionTracker from './actionTracker';
import pageTimeTracker from './pageTimeTracker';
import { getConfig, setConfig } from './config';
import { sendAsync } from './send';
import hijackHistoryEvent from '../utils/hijackHistoryEvent';
import { getFlag, setFlag } from '../utils/util';

function routeChange() {
  pageTimeTracker.change();
}

const install = function(conf?: ISetConfigParam) {
  if (getFlag('install')) return;
  setFlag('install');

  //注入history事件
  hijackHistoryEvent();

  if (conf) {
    setConfig(conf);
  }

  const config = getConfig();

  // if (config.analyseScript) {
  //   let trackerToken = window.name.match(/\{"trackerToken":.*\}/);
  //   if (trackerToken) {
  //     const oHead = document.getElementsByTagName('head').item(0);
  //     const oScript = document.createElement('script');
  //     oScript.type = 'text/javascript';
  //     oScript.src = config.analyseScript;
  //     oHead.appendChild(oScript);
  //   }
  //   const oHead = document.getElementsByTagName('head').item(0);
  //   const oScript = document.createElement('script');
  //   oScript.type = 'text/javascript';
  //   oScript.src = config.analyseScript;
  //   oHead.appendChild(oScript);
  // }

  if (config.autoTrackPage) {
    actionTracker.trackPage();
  }

  if (config.performance) {
    actionTracker.trackPerformance();
  }

  if (config.pageTime) {
    pageTimeTracker.start();
  }

  //单页面应用
  if (config.watchHistoryAndHash) {
    if (typeof window.onpopstate === 'undefined') {
      window.addEventListener('hashchange', routeChange);
    }
    window.addEventListener('historyPushState', routeChange);
    window.addEventListener('historyPopstate', routeChange);
  }

  // onbeforeunload 和 onunload 都触发发送
  let sended = false;
  function onLeave() {
    if (sended) {
      return;
    }
    if (config.pageTime) {
      pageTimeTracker.end();
    }
    sendAsync();
    sended = true;
  }
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
        if (target.tagName === 'BODY' || !target.dataset) {
          break;
        }

        //是否有埋点属性
        if (
          target.getAttribute('data-track') ||
          (config.autoTrackClick &&
            (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT') &&
            !target._isWatchTrack)
        ) {
          //劫持a链接注入本页面的code
          if (element.tagName === 'A' && element.href) {
            if (/\?.*=/.test(element.href)) {
              element.href = element.href.replace(/\?/, '?aaaaaa=1&');
            } else if (/\?/.test(element.href) === false) {
              element.href += '?aaaaaaa=1';
            } else {
              element.href = element.href.replace(/\?/, '?aaaaaa=1');
            }

            //延迟跳转 加大上报成功率
            if (config.delayLink) {
              e.preventDefault();
              setTimeout(() => {
                actionTracker.trackDom(target);
                element.click();
              }, config.delayLinkTime);
            }
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
