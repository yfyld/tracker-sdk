export interface IUserInfo {
    uid?: string;
    isLogin: boolean;
}
export declare function setUserInfo(info: IUserInfo): void;
export declare function getUserInfo(): IUserInfo;
export declare function login(info: IUserInfo): void;
export declare function logout(moment?: boolean): void;
