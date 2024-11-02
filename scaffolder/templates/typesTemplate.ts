import { FeatureNamesType } from '../utils';

export const typesTemplate = (
  featureNamesDict: FeatureNamesType,
  typeProperties: string
): string => {
  const { SingularPascal, PluralPascal } = featureNamesDict;

  return `export interface ${SingularPascal}Type {
  ${typeProperties}
}

export interface ${PluralPascal}State {
  ${featureNamesDict.pluralCamel}: ${SingularPascal}Type[];
}
`;
};
