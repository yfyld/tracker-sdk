export interface IBusinessExtension {
    seKeywords: string;
    bizId: string;
}
export declare const getBusinessExtension: () => {
    seKeywords: string;
    bizId: string;
};
export declare const setBuinessExtension: (extension: Partial<IBusinessExtension>) => void;
