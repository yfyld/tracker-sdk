export interface IConfig {
    store: string;
    trackKey: string;
    serverUrl: string;
    watchHistoryAndHash: boolean;
    pageTime: boolean;
    env: string;
    console: boolean;
    projectId: number;
    version: string;
    domain: string;
    sendType: string;
    delayTime: number;
    autoTrackPage: boolean;
    autoTrackClick: boolean;
    autoInstall: boolean;
    delayLink: boolean;
    delayLinkTime: number;
    useServerTime: boolean;
    corssSubdomain: boolean;
    deviceIdKey: string;
    beforeGenerateLog: Function | null;
}
export declare function getConfig(): IConfig;
export declare function setConfig(data: Partial<IConfig>): void;
