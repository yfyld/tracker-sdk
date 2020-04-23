import { getPageInfo } from './pageInfo';
import { ITrackerPageParam } from './actionTracker';
import { send } from './send';
import { ACTION_TYPE } from '../constant';
import { getConfig, IConfig } from './config';
import { ITrackerData } from '../types';
import { actionTracker } from 'src/internal';
class PageTimeTracker {
  static instance: PageTimeTracker = null;
  startTime = Date.now();
  endTime = Date.now();
  // invalidStartTime = Date.now();
  // invalidEndTime = Date.now();
  // totalInvalidTime = 0;
  config: IConfig = null;
  info: ITrackerData = null;

  isStart = false;

  static getInstance() {
    if (!PageTimeTracker.instance) {
      PageTimeTracker.instance = new PageTimeTracker();
    }
    return PageTimeTracker.instance;
  }

  start(data?: ITrackerPageParam) {
    if (data) {
      this.info = data;
    }
    if (this.isStart) {
      this.startTime = Date.now();
      return;
    }
    this.isStart = true;
    this.config = getConfig();
    window.addEventListener('visibilitychange', () => {
      var isHidden = document.hidden;
      if (isHidden) {
        this.end();
      } else {
        this.start();
      }
    });
  }

  end() {
    if (!this.info) {
      return;
    }
    this.endTime = Date.now();
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
    if (this.config.autoTrackPage || this.info) {
      const durationTime = this.endTime - this.startTime;
      if (durationTime < 100) {
        // 手动发后100豪秒内不能自动change
        return;
      }
      let data = {
        startTime: this.startTime,
        durationTime,
        ...this.info,
        actionType: ACTION_TYPE.DURATION,
        trackId: ''
      };

      send(data);
      this.info = null;
    }
  }
}

let instance = PageTimeTracker.getInstance();
export default instance;
