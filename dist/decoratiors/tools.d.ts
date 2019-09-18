/// <reference types="lodash" />
declare const before: import("lodash").CurriedFunction2<string | Object | Function, Function, (...args: any) => any>;
declare const after: import("lodash").CurriedFunction2<string | Object | Function, Function, (...args: any) => Promise<any>>;
export { before, after };
