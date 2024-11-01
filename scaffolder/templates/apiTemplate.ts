import { FeatureNamesType } from '../utils';

export const apiTemplate = (featureNamesDict: FeatureNamesType): string => {
  return `import { axiosInstance } from '~/api';
import type { ${featureNamesDict.SingularPascal}Type } from '../types';

const url = '/${featureNamesDict.pluralCamel}';

export const fetch${featureNamesDict.PluralPascal} = async (): Promise<${featureNamesDict.SingularPascal}Type[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const create${featureNamesDict.SingularPascal} = async (new${featureNamesDict.SingularPascal}: Omit<${featureNamesDict.SingularPascal}Type, 'id'>) => {
  const response = await axiosInstance.post(url, new${featureNamesDict.SingularPascal});
  return response.data;
};

export const update${featureNamesDict.SingularPascal} = async (updated${featureNamesDict.SingularPascal}: ${featureNamesDict.SingularPascal}Type) => {
  const response = await axiosInstance.put(\`\${url}/\${updated${featureNamesDict.SingularPascal}.id}\`, updated${featureNamesDict.SingularPascal});
  return response.data;
};

export const delete${featureNamesDict.SingularPascal} = async (id: number) => {
  await axiosInstance.delete(\`\${url}/\${id}\`);
};
`;
};
