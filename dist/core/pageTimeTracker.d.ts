import { IConfig, ITrackerData } from '../types';
declare class PageTimeTracker {
    static instance: PageTimeTracker;
    startTime: number;
    endTime: number;
    invalidStartTime: number;
    invalidEndTime: number;
    totalInvalidTime: number;
    config: IConfig;
    info: ITrackerData;
    static getInstance(): PageTimeTracker;
    start(): void;
    resetStart(): void;
    end(): void;
    change(): void;
}
declare let instance: PageTimeTracker;
export default instance;
