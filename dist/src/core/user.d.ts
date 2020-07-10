export interface IUserInfo {
    uid?: string | number;
    isLogin: boolean;
    utoken?: string;
}
export declare function setUserInfo(info: Partial<IUserInfo>): void;
export declare function getUserInfo(): IUserInfo;
export declare function login(info: Partial<IUserInfo>): void;
export declare function logout(moment?: boolean): void;
