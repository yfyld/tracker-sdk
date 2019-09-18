import { EventParam } from '../types';
declare function MyCustomEvent<T>(event: string, params: EventParam<T>): CustomEvent<T>;
declare namespace MyCustomEvent {
    var prototype: any;
}
export default MyCustomEvent;
