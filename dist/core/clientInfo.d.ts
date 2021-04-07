export interface IClientInfo {
    clientWidth: number;
    clientHeight: number;
    radio: number;
    domain: string;
    appId: string;
    appVersion: string;
    appType: string;
    marketId?: string;
    sessionId: string;
    channel?: string;
    deviceId?: string;
}
export declare const setClientInfo: (info: Partial<IClientInfo>) => void;
export declare const getClientInfo: () => {
    clientWidth: number;
    clientHeight: number;
    radio: number;
    domain: string;
    appId: string;
    appVersion: string;
    appType: string;
    marketId?: string;
    sessionId: string;
    channel?: string;
    deviceId?: string;
};
