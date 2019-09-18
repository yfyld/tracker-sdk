import { PerformanceTime } from '../types';
declare class PerformanceTracker {
    static instance: PerformanceTracker;
    static getInstance(): PerformanceTracker;
    performance: Performance;
    getRenderTiming(): PerformanceTime;
}
declare let instance: PerformanceTracker;
export default instance;
