// import { FeatureNamesType } from '../utils';

// export const typesTemplate = (
//   featureNamesDict: FeatureNamesType,
//   typeProperties: string
// ): string => {
//   const { SingularPascal, PluralPascal } = featureNamesDict;

//   return `export interface ${SingularPascal}Type {
//   ${typeProperties}
//   // Add more fields here
// }

// export interface ${PluralPascal}State {
//   ${featureNamesDict.pluralCamel}: ${SingularPascal}Type[];
// }
// `;
// };

import { FeatureNamesType } from '../utils';

export const typesTemplate = (
  featureNamesDict: FeatureNamesType,
  typeProperties: string,
  includeStateInterface: boolean,
  stateProperties: string
): string => {
  const { SingularPascal, PluralPascal, pluralCamel } = featureNamesDict;

  // Base interface
  let template = `export interface ${SingularPascal}Type {
  ${typeProperties}
  // Add more fields here
}
`;

  // Conditional inclusion of the state interface
  if (includeStateInterface) {
    template += `
export interface ${PluralPascal}State {
  ${stateProperties || `${pluralCamel}: ${SingularPascal}Type[];`}
}
`;
  }

  return template;
};
