export interface IConfig {
    serverUrl: string;
    watchHistoryAndHash: boolean;
    pageTime: boolean;
    env: string;
    console: boolean;
    projectId: string;
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
    analyseScript: string;
    performance: boolean;
    utokenKey: string;
}
export interface ISetConfigParam {
    watchHistoryAndHash?: boolean;
    pageTime?: boolean;
    env?: string;
    console?: boolean;
    projectId?: string;
    token?: string;
    version?: string;
    domain?: string;
    sendType?: string;
    delayTime?: number;
    autoTrackPage?: boolean;
    autoTrackClick?: boolean;
    autoInstall?: boolean;
    delayLink?: boolean;
    delayLinkTime?: number;
    useServerTime?: boolean;
    corssSubdomain?: boolean;
    analyseScript?: string;
    identify?: string;
    performance?: boolean;
}
export declare function getConfig(): IConfig;
export declare function setConfig(data: ISetConfigParam): void;
