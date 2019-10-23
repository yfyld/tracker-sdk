import { isThenable } from '../utils/util';
import isFunction from 'lodash-es/isFunction';
import curryN from 'lodash/fp/curryN';

import actionTracker from '../core/actionTracker';

const before = curryN(
  2,
  (trackFn: Function | string | Object, fn: Function) =>
    function(...args: any) {
      if (isFunction(trackFn)) {
        try {
          let result = trackFn.apply(this, args);
          if (typeof result === 'object') {
            actionTracker.track(result);
          }
        } catch (e) {
          console.error(e);
        }
      } else if (typeof trackFn === 'object') {
        actionTracker.track(trackFn);
      } else if (typeof trackFn === 'string') {
        const data = {
          trackId: trackFn
        };
        actionTracker.track(data);
      }

      return fn.apply(this, args);
    }
);

const after = curryN(
  2,
  (trackFn: Function | string | Object, fn: Function) =>
    function(...args: any) {
      const r: Promise<any> = fn.apply(this, args);

      const evalF = () => {
        if (isFunction(trackFn)) {
          try {
            let result = trackFn.apply(this, args);
            if (typeof result === 'object') {
              actionTracker.track(result);
            }
          } catch (e) {
            console.error(e);
          }
        } else if (typeof trackFn === 'object') {
          actionTracker.track(trackFn);
        } else if (typeof trackFn === 'string') {
          const data = {
            trackId: trackFn
          };
          actionTracker.track(data);
        }
      };

      if (isThenable(r)) {
        return r.then(rr => {
          evalF();
          return rr;
        });
      }

      evalF();
      return r;
    }
);

export { before, after };

// export const composeWith = curry((convergeFn, ops) => {
//   if (isFunction (ops)) {
//     ops = [ops]
//   }
//
//   if (!isFunction(convergeFn) ||!isArray(ops) ) {
//     return console.error('args type incorrect, expect convergeFn is function and ops is array')
//   }
//
//   const compose = reduce((acc, i) => {
//     if (!acc) {
//       return acc || i
//     }
//     return i.call(null, acc)
//   }, null)
//
//
//   return curryN(1, (fn, target) => function (...args) {
//     const memoizeFn = memoize(fn)
//     const _r = convergeFn(
//       compose(ops)
//         .apply(this, [memoizeFn])
//         .apply(this, args)
//     ).apply(this, args)
//     return memoizeFn.apply(this, args)
//   })
// })
// export const createCounter = () => {
//   let scopeCounter = 0
//   return fn => function (...args) {
//     fn.apply(this, args)
//     scopeCounter = scopeCounter + 1
//     return scopeCounter
//   }
// }
// export const time = fn => function (...args) {
//     const begin = +Date.now()
//     const result = fn.apply(this, args)
//     if (isThenable(result)) {
//         return result.then(() => +Date.now() - begin)
//     }
//     return +Date.now() - begin
// }
//
// export const evolve = curry(evols => fn => function (...args) {
//   const self = this
//   const memoizeFn = memoize(fn)
//   return mapValues((value) => {
//     return value(memoizeFn).apply(self, args)
//   }, evols)
// })
//
// export const identity = curry(fn => function (...args) {
//   return fn.apply(this, args)
// })
//
// export const nop = () => {}
//
// export const once = _once
