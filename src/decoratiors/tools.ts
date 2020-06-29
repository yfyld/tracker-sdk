import { ITrackerParam } from './../core/actionTracker';
import { isThenable } from '../utils/util';

import actionTracker, { ITrackerEventParam } from '../core/actionTracker';
import curryN from 'ramda/src/curryN';

const before = curryN(
  2,
  (trackFn: Function | string | Object, fn: Function) =>
    function (...args: any) {
      if (typeof trackFn === 'function') {
        try {
          let result = trackFn.apply(this, args);
          if (typeof result === 'object') {
            actionTracker.track(result);
          }
        } catch (e) {
          console.error(e);
        }
      } else if (typeof trackFn === 'object') {
        actionTracker.track(trackFn as ITrackerParam);
      } else if (typeof trackFn === 'string') {
        const data = {
          trackId: trackFn
        };
        actionTracker.track(data as ITrackerParam);
      }
      const evalF = function () {
        setTimeout(() => {
          fn.apply(this, args);
        }, 300);
      };
      return evalF.apply(this);
    }
);

const after = curryN(
  2,
  (trackFn: Function | string | Object, fn: Function) =>
    function (...args: any) {
      const r: Promise<any> = fn.apply(this, args);

      const evalF = () => {
        if (typeof trackFn === 'function') {
          try {
            let result = trackFn.apply(this, args);
            if (typeof result === 'object') {
              actionTracker.track(result);
            }
          } catch (e) {
            console.error(e);
          }
        } else if (typeof trackFn === 'object') {
          actionTracker.track(trackFn as ITrackerParam);
        } else if (typeof trackFn === 'string') {
          const data = {
            trackId: trackFn
          };
          actionTracker.track(data as ITrackerParam);
        }
      };

      if (isThenable(r)) {
        return r.then((rr) => {
          evalF();
          return rr;
        });
      }

      evalF();
      return r;
    }
);

export { before, after };
