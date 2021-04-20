import { IPageInfo } from './pageInfo';
import { IUserInfo } from './user';
import { ITrackerData, ICleintInfo, ILibInfo } from '../types';
export interface ILogDataDataItem extends ITrackerData, IPageInfo {
    trackTime: number;
    startTime?: number;
    id: string;
    trackId?: string;
}
export interface ILogData extends ICleintInfo, IUserInfo, ILibInfo {
    customTime: number;
    items: ILogDataDataItem[];
    version: string;
}
/**
 * 同步发送
 * @param data
 */
export declare function send(data: ITrackerData | ILogDataDataItem): void;
export declare function sendSync(data?: ITrackerData): void;
/**
 * 延迟发送  data不存在则马上发送allData
 * @param data
 */
export declare function sendAsync(data?: ITrackerData): void;
