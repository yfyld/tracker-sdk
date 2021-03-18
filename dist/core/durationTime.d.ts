import { IPageInfo } from './pageInfo';
import { IConfig } from './config';
import { ITrackerData } from 'src/types';
interface ILogDataDataItem extends ITrackerData, IPageInfo {
    trackTime: number;
    startTime?: number;
    id: string;
}
declare class DurationTime {
    static instance: DurationTime;
    startTime: number;
    endTime: number;
    config: IConfig;
    timeMap: {
        [prop: string]: any;
    };
    static getInstance(): DurationTime;
    start(info: ILogDataDataItem): void;
    end(trackId?: string): ILogDataDataItem[];
    generateLog(info: ILogDataDataItem): {
        actionType: string;
        durationTime: number;
        id: string;
        trackTime: number;
        startTime?: number;
        custom?: string | {
            [prop: string]: string | number | boolean;
        };
        eventName?: string;
        score?: number;
        pageId?: string;
        domId?: string;
        domClass?: string;
        domHref?: string;
        domName?: string;
        domTag?: string;
        domContent?: string;
        domPath?: string;
        trackId?: string;
        referrerId?: string;
        netType?: string;
        channel?: string;
        debug?: boolean;
        referrerUrl: string;
        url: string;
        title: string;
        host: string;
        path: string;
        hash: string;
    };
}
declare let instance: DurationTime;
export default instance;
