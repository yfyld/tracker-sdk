import { UserInfo } from '../types';
export declare function setUserInfo(info: UserInfo): void;
export declare function getUserInfo(): UserInfo;
export declare function login(info: UserInfo): void;
export declare function logout(moment?: boolean): void;
export declare function getIdentify(): void;
export declare function changeIdentify(): void;
