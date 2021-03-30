/// <reference types="ts-toolbelt" />
declare const before: import("Function/Curry").Curry<(head: string | Object | Function, head: Function) => (...args: any) => any>;
declare const after: import("Function/Curry").Curry<(head: string | Object | Function, head: Function) => (...args: any) => Promise<any>>;
export { before, after };
