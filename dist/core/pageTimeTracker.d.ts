import { ITrackerPageParam } from './actionTracker';
import { IConfig } from './config';
import { ITrackerData } from '../types';
declare class PageTimeTracker {
    static instance: PageTimeTracker;
    startTime: number;
    endTime: number;
    config: IConfig;
    info: ITrackerData;
    isStart: boolean;
    static getInstance(): PageTimeTracker;
    start(data?: ITrackerPageParam): void;
    end(): void;
    /**
     * url change 触发
     */
    change(): void;
    toSend(): void;
}
declare let instance: PageTimeTracker;
export default instance;
