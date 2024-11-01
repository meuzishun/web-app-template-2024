import { FeatureNamesType } from '../utils';

export const typesTemplate = (featureNamesDict: FeatureNamesType): string => {
  return `export interface ${featureNamesDict.SingularPascal}Type {
  id: number;
  // Add fields here
}

export interface ${featureNamesDict.PluralPascal}State {
  ${featureNamesDict.pluralCamel}: ${featureNamesDict.SingularPascal}Type[];
}
`;
};
