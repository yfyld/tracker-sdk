import { getQueryVariable } from 'src/utils/util';

export interface IBusinessExtension {
  seKeywords: string;
  bizId: string;
}

let businessExtension: IBusinessExtension = {
  seKeywords: getQueryVariable('seKeywords'),
  bizId: getQueryVariable('bizId')
};

export const getBusinessExtension = () => {
  return { ...businessExtension };
};

export const setBuinessExtension = (extension: Partial<IBusinessExtension>) => {
  businessExtension = { ...businessExtension, ...extension };
};
