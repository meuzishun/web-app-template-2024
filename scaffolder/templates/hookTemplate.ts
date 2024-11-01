import { FeatureNamesType } from '../utils';

export const hookTemplate = (featureNamesDict: FeatureNamesType): string => {
  return `export const use${featureNamesDict.PluralPascal} = () => {
  return {};
};
`;
};
