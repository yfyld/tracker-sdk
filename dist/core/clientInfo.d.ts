export interface IClientInfo {
    clientWidth: number;
    clientHeight: number;
    radio: number;
    domain: string;
    appId: string;
    appVersion: string;
    appType: string;
    marketid?: string;
    sessionId: string;
    channel?: string;
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
    marketid?: string;
    sessionId: string;
    channel?: string;
};
