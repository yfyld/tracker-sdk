import { ITrackerPageParam } from './actionTracker';
import { send } from './send';
import { ACTION_TYPE } from '../constant';
import { getConfig, IConfig } from './config';
import { ITrackerData } from '../types';
class PageTimeTracker {
  static instance: PageTimeTracker = null;
  startTime = Date.now();
  endTime = Date.now();
  invalidStartTime = Date.now();
  invalidEndTime = Date.now();
  totalInvalidTime = 0;
  config: IConfig = null;
  info: ITrackerData = {};

  isStart = false;

  static getInstance() {
    if (!PageTimeTracker.instance) {
      PageTimeTracker.instance = new PageTimeTracker();
    }
    return PageTimeTracker.instance;
  }

  start(data?: ITrackerPageParam) {
    if (this.info.trackId) {
      this.end();
    }
    if (data) {
      this.info = data;
    }
    if (this.isStart) {
      this.invalidEndTime = this.invalidStartTime = this.startTime = Date.now();
      return;
    }
    this.isStart = true;
    this.config = getConfig();
    window.addEventListener('visibilitychange', () => {
      var isHidden = document.hidden;
      if (isHidden) {
        this.invalidStartTime = Date.now();
      } else {
        this.invalidEndTime = Date.now();
        this.totalInvalidTime += this.invalidEndTime - this.invalidStartTime;
      }
    });
  }

  end() {
    this.invalidEndTime = this.invalidStartTime = this.endTime = Date.now();
    this.toSend();
  }

  /**
   * url change 触发
   */
  change() {
    this.end();
    this.start();
  }

  toSend() {
    if (this.config.autoTrackPage || this.info.trackId) {
      const durationTime = this.endTime - this.startTime - this.totalInvalidTime;
      if (durationTime < 100 && this.info.trackId) {
        // 手动发后100豪秒内不能自动change
        return;
      }
      let data = {
        actionType: ACTION_TYPE.PAGE,
        startTime: this.startTime,
        endTime: this.endTime,
        trackId: this.info.trackId,
        durationTime,
        ...this.info
      };
      send(data);
      this.info = {};
    }
  }
}

let instance = PageTimeTracker.getInstance();
export default instance;
