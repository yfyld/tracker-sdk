import vissense  from "vissense";
import { VisSenseConfig } from '@/types';
const VisSense = vissense(window);
const VisSenseUtils = VisSense.Utils;
const createInnerMonitor = function (outerMonitor:any, callback:Function, config:VisSenseConfig) {
  let timeElapsed = 0;
  let timeStarted:any = null;
  let timeLimit = config.timeLimit;
  let percentageLimit = config.percentageLimit;
  let interval = config.interval;

  return VisSense.VisMon.Builder(outerMonitor.visobj())
    .strategy(new VisSense.VisMon.Strategy.PollingStrategy({interval: interval}))
    .on('update', function (monitor:any) {
      let percentage = monitor.state().percentage;
      if (percentage < percentageLimit) {
        timeStarted = null;
      } else {
        let now = VisSenseUtils.now();
        timeStarted = timeStarted || now;
        timeElapsed = now - timeStarted;
      }

      if (timeElapsed >= timeLimit) {
        monitor.stop();
        outerMonitor.stop();
        callback(monitor);
      }
    })
    .on('stop', function () {
      timeStarted = null;
    }).build();
};

const onPercentageTimeTestPassed = function (visobj:any, callback:Function, config:VisSenseConfig) {
  const _config = VisSenseUtils.defaults(config, {
    percentageLimit: 1,
    timeLimit: 1000,
    interval: 100,
    strategy: undefined
  });

  // monitor is considered hidden if it is 1% below the percentage limit
  let hiddenLimit = Math.max(_config.percentageLimit - 0.001, 0);

  let innerMonitor:any = null;

  let outerMonitor = VisSense.VisMon.Builder(new VisSense(visobj.element(), {
    hidden: hiddenLimit,
    referenceWindow: visobj.referenceWindow()
  }))
    .set('strategy', _config.strategy)
    .on('visible', function (monitor:any) {
      if (innerMonitor === null) {
        innerMonitor = createInnerMonitor(monitor, callback, _config);
      }
      innerMonitor.start();
    })
    .on('hidden', function () {
      if (innerMonitor !== null) {
        innerMonitor.stop();
      }
    })
    .on('stop', function () {
      if (innerMonitor !== null) {
        innerMonitor.stop();
      }
    })
    .build();

  outerMonitor.start();

  return function () {
    outerMonitor.stop();
    innerMonitor = null;
  };
};

VisSense.fn.onPercentageTimeTestPassed = function (callback:Function, config:VisSenseConfig) {
  onPercentageTimeTestPassed(this, callback, config);
};

export default VisSense;