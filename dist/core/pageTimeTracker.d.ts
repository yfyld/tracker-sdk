import { Config, TrackerData } from '../types';
declare class PageTimeTracker {
    static instance: PageTimeTracker;
    startTime: number;
    endTime: number;
    invalidStartTime: number;
    invalidEndTime: number;
    totalInvalidTime: number;
    config: Config;
    info: TrackerData;
    static getInstance(): PageTimeTracker;
    start(): void;
    end(): void;
    change(): void;
}
declare let instance: PageTimeTracker;
export default instance;
