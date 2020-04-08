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

  static getInstance() {
    if (!PageTimeTracker.instance) {
      PageTimeTracker.instance = new PageTimeTracker();
    }
    return PageTimeTracker.instance;
  }

  start() {
    this.startTime = Date.now();
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

  resetStart() {
    this.invalidEndTime = this.invalidStartTime = this.startTime = Date.now();
  }

  end() {
    this.endTime = Date.now();
    let data = {
      actionType: ACTION_TYPE.PAGE,
      startTime: this.startTime,
      endTime: this.endTime,
      durationTime: this.endTime - this.startTime - this.totalInvalidTime,
      ...this.info
    };
    if (this.config.autoTrackPage || this.info.trackId) {
      send(data);
    }
  }

  change() {
    this.invalidEndTime = this.invalidStartTime = this.endTime = Date.now();
    let data = {
      actionType: ACTION_TYPE.PAGE,
      startTime: this.startTime,
      endTime: this.endTime,
      trackId: this.info.trackId,
      durationTime: this.endTime - this.startTime - this.totalInvalidTime,
      ...this.info
    };
    if (this.config.autoTrackPage || this.info.trackId) {
      send(data);
      this.info = {};
    }
    this.startTime = this.endTime;
  }
}

let instance = PageTimeTracker.getInstance();
export default instance;
