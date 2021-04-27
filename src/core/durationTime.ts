import { IPageInfo } from './pageInfo';

import { ACTION_TYPE } from '../constant';
import { IConfig } from './config';

import { ITrackerData } from 'src/types';
import { getUUID } from 'src/utils/util';

interface ILogDataDataItem extends ITrackerData, IPageInfo {
  trackTime: number;
  startTime?: number;
  id: string;
  trackId?: string;
}
class DurationTime {
  static instance: DurationTime = null;
  startTime = Date.now();
  endTime = Date.now();
  config: IConfig = null;
  timeMap: { [prop: string]: any } = {};

  static getInstance() {
    if (!DurationTime.instance) {
      DurationTime.instance = new DurationTime();
    }
    return DurationTime.instance;
  }

  start(info: ILogDataDataItem) {
    if (!info.trackId || this.timeMap[info.trackId]) {
      return;
    }
    this.timeMap[info.trackId] = {
      startTime: Date.now(),
      ...info
    };
  }

  end(trackId?: string) {
    let logs: ILogDataDataItem[] = [];
    if (trackId) {
      if (this.timeMap[trackId]) {
        logs.push(this.generateLog(this.timeMap[trackId]));
      }

      return logs;
    }

    for (let trackId in this.timeMap) {
      if (!this.timeMap[trackId]) {
        continue;
      }
      logs.push(this.generateLog(this.timeMap[trackId]));
      this.timeMap[trackId] = null;
    }

    return logs;
  }

  generateLog(info: ILogDataDataItem) {
    const log = {
      ...info,
      actionType: info.actionType === ACTION_TYPE.PAGE ? ACTION_TYPE.DURATION : ACTION_TYPE.VIEW_DURATION,
      durationTime: Date.now() - info.startTime,
      trackTime: Date.now(),
      masterId: info.id,
      trackId: '',
      pageId: info.actionType === ACTION_TYPE.PAGE ? info.trackId : info.pageId,
      id: getUUID()
    };
    localStorage.setItem(
      'referrer_id',
      JSON.stringify({
        date: Date.now(),
        id: log.pageId
      })
    );
    return log;
  }
}

let instance = DurationTime.getInstance();
export default instance;
