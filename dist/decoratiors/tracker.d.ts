declare const tracker: (partical: any) => (target: Function | Object | string, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export default tracker;
