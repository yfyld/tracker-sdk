/// <reference types="node" />
/**
 *判断promise
 *
 * @export
 * @param {*} f
 * @returns
 */
export declare function isThenable(f: any): boolean;
/**
 *获取url参数 兼容微信支付 window.location.search改成window.location.href
 *
 * @export
 * @param {string} variable
 * @returns
 */
export declare function getQueryVariable(variable: string): string;
/**
 *获取cookie
 *
 * @export
 * @param {string} name
 * @returns
 */
export declare function getCookie(name: string): string;
/**
 *设置cookie
 *
 * @export
 * @param {string} name
 * @param {string} value
 * @param {number} [expires=99999999999999]
 * @param {string} [path='/']
 * @param {string} [domain]
 */
export declare function setCookie(name: string, value: string, expires?: number, path?: string, domain?: string): void;
/**
 *
 *
 * @export
 * @param {*} binding
 * @returns
 */
export declare function notChanged(binding: any): boolean;
/**
 * if the binding value is empty
 */
export declare function isEmpty(binding: any): boolean;
export declare function setFlag(key: string, value?: boolean): void;
export declare function getFlag(key: string): any;
export declare function getUUID(): string;
/**
 *获取dom path
 *
 * @export
 * @param {HTMLElement} dom
 * @returns
 */
export declare function getDomPath(dom: HTMLElement): string;
export declare function noop(): void;
export declare function isString(value: any): boolean;
export declare function getLocationHref(): string;
export declare function oneOf(one: any, all: any[]): boolean;
export declare function getGlobal(): (Window & typeof globalThis) | NodeJS.Global;
export declare function isArray(o: any): boolean;
export declare function isObject(o: any): boolean;
export declare const inMin: boolean;
export declare const inWechat: boolean;
