export interface IConfig {
    trackKey: string;
    serverUrl: string;
    debugServerUrl: string;
    version: string;
    offlineUrl: string;
    sendType: string;
    delayTime: number;
    autoTrackPage: boolean;
    autoTrackClick: boolean;
    autoInstall: boolean;
    delayLink: boolean;
    delayLinkTime: number;
    deviceIdKey: string;
    beforeGenerateLog: Function | null;
    autoTrackPrefix: string;
}
export declare function getConfig(): IConfig;
export declare function setConfig(data: Partial<IConfig>): void;
