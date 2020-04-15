import { IPageInfo } from './pageInfo';
import { IUserInfo } from './user';
import { ITrackerData, ICleintInfo, ILibInfo } from '../types';
export interface ILogDataDataItem extends ITrackerData, IPageInfo {
    trackTime: number;
    id: string;
}
export interface ILogData extends ICleintInfo, IUserInfo, ILibInfo {
    items: ILogDataDataItem[];
    projectId: string;
    version: string;
}
/**
 * 同步发送
 * @param data
 */
export declare function send(data: ITrackerData): void;
export declare function sendSync(data: ITrackerData): void;
/**
 * 延迟发送
 * @param data
 */
export declare function sendAsync(data?: ITrackerData): void;
