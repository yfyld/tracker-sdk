declare class Analyse {
    static instance: Analyse;
    static getInstance(): Analyse;
    style: string;
    data: {
        page: {
            url: string;
            pageId: string;
            count: number;
        }[];
        event: {
            url: string;
            name: string;
            pageId: string;
            trackId: string;
            domPath: string;
            domId: string;
            count: number;
            id: number;
        }[];
    };
    elements: {};
    wrapper: HTMLElement;
    page: HTMLElement;
    console: HTMLElement;
    install(): void;
    bind(fn: any): void;
    analysePage(): void;
    analyseEvent(): void;
}
declare let instance: Analyse;
export default instance;
