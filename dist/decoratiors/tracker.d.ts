declare const tracker: (partical: any) => (target: string | Object | Function, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export default tracker;
