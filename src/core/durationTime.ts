import { getPageInfo, IPageInfo } from './pageInfo';
import { ITrackerPageParam } from './actionTracker';
import { send } from './send';
import { ACTION_TYPE } from '../constant';
import { getConfig, IConfig } from './config';

import { actionTracker } from 'src/internal';
import { ITrackerData } from 'src/types';
import { getUUID } from 'src/utils/util';

interface ILogDataDataItem extends ITrackerData, IPageInfo {
  trackTime: number;
  startTime?: number;
  id: string;
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

      this.timeMap[trackId] = null;
      logs.push(this.generateLog(this.timeMap[trackId]));
    }

    return logs;
  }

  generateLog(info: ILogDataDataItem) {
    const log = {
      ...info,
      actionType: 'DURATION',
      durationTime: Date.now() - info.startTime,
      id: getUUID()
    };
    return log;
  }
}

let instance = DurationTime.getInstance();
export default instance;
