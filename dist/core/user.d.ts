export interface IUserInfo {
    uid?: string | number;
    isLogin: boolean;
}
export interface ISetUserInfo {
    uid?: string | number;
}
export declare function setUserInfo(info: IUserInfo): void;
export declare function getUserInfo(): IUserInfo;
export declare function login(info: ISetUserInfo): void;
export declare function logout(moment?: boolean): void;
