import { FeatureNamesType } from '../utils';

export const componentTemplate = (
  featureNamesDict: FeatureNamesType
): string => {
  return `import React from 'react';
import type { ${featureNamesDict.SingularPascal}Type } from '../types';

interface ${featureNamesDict.SingularPascal}Props {
  title?: string;
  ${featureNamesDict.singularCamel}: ${featureNamesDict.SingularPascal}Type[];
  // Add more prop types here
}

const ${featureNamesDict.PluralPascal}: React.FC<${featureNamesDict.SingularPascal}Props> = ({ title, ${featureNamesDict.singularCamel} }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      <p>${featureNamesDict.SingularPascal} works!</p>
      {${featureNamesDict.singularCamel}.map((${featureNamesDict.singularCamel}) => <div key={${featureNamesDict.singularCamel}.id}>${featureNamesDict.singularCamel}</div>)}
    </div>
  );
};

export default ${featureNamesDict.PluralPascal};
`;
};
