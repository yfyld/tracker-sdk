export declare function isThenable(f: any): boolean;
export declare function getCookie(name: string): string;
export declare function setCookie(name: string, value: string, expires?: number, path?: string, domain?: string): void;
export declare function notChanged(binding: any): boolean;
/**
 * if the binding value is empty
 */
export declare function isEmpty(binding: any): boolean;
export declare function setFlag(key: string, value?: boolean): void;
export declare function getFlag(key: string): any;
export declare function getUUID(): string;
export declare function getDomPath(dom: HTMLElement): string;
export declare function noop(): void;
export declare function isString(value: any): boolean;
export declare function getLocationHref(): string;
export declare function oneOf(one: any, all: any[]): boolean;
