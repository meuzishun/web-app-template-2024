import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function camelToPascal(camelCaseString) {
  return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
}

function singularize(word) {
  return word.endsWith('s') ? word.slice(0, -1) : word;
}

const featureName = process.argv[2];
const FeatureName = camelToPascal(featureName);
const singularFeatureName = singularize(featureName);
const SingularFeatureName = singularize(FeatureName);

if (!featureName) {
  console.error('Please provide a feature name!');
  process.exit(1);
}

const baseDir = path.join(__dirname, 'src', 'features', featureName);

const directories = ['components', 'hooks', 'api', 'slices', 'types'];

// Template for a basic component
const componentTemplate = `import React from 'react';

interface ${FeatureName}Props {
  // Add prop types here
}

const ${FeatureName}Component: React.FC<${FeatureName}Props> = () => {
  return <div>${FeatureName} works!</div>;
};

export default ${FeatureName}Component;
`;

// Template for slice (using relevant type)
const sliceTemplate = `import { createSlice } from '@reduxjs/toolkit';
import type { ${FeatureName}State } from '../types';

const initialState: ${FeatureName}State = {
  // Add initial state here
  ${featureName}: [],
};

const ${featureName}Slice = createSlice({
  name: '${featureName}',
  initialState,
  reducers: {
    // Add reducers here
  },
});

export const { /* Add actions here */ } = ${featureName}Slice.actions;

export default ${featureName}Slice;
`;

// Template for API functions
const apiTemplate = `import { axiosInstance } from '~/api';
import type { ${SingularFeatureName}Type } from '../types';

const url = '/${featureName}';

export const fetch${FeatureName} = async (): Promise<${SingularFeatureName}Type[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const create${SingularFeatureName} = async (new${SingularFeatureName}: Omit<${SingularFeatureName}Type, 'id'>) => {
  const response = await axiosInstance.post(url, new${SingularFeatureName});
  return response.data;
};

export const update${SingularFeatureName} = async (updated${SingularFeatureName}: ${SingularFeatureName}Type) => {
  const response = await axiosInstance.put(\`\${url}/\${updated${SingularFeatureName}.id}\`, updated${SingularFeatureName});
  return response.data;
};

export const delete${SingularFeatureName} = async (id: number) => {
  await axiosInstance.delete(\`\${url}/\${id}\`);
};
`;

// Template for an empty hook
const hookTemplate = `export const use${FeatureName} = () => {
  return {};
};
`;

// Template for types file
const typesTemplate = `export interface ${SingularFeatureName}Type {
  id: number;
  // Add fields here
}

export interface ${FeatureName}State {
  ${featureName}: ${SingularFeatureName}Type[];
}
`;

// Sub-directory index templates
const componentsIndexTemplate = `export { default as ${FeatureName}Component } from './${FeatureName}Component';
`;

const apiIndexTemplate = `export * from './${featureName}Api';
`;

const hooksIndexTemplate = `export * from './use${FeatureName}';
`;

const slicesIndexTemplate = `export { default as ${featureName}Slice } from './${featureName}Slice';
`;

const typesIndexTemplate = `export * from './${singularFeatureName}Types';
`;

// Feature-level index template
const featureIndexTemplate = `export * from './types';
export * from './api';
export * from './slices';
export * from './hooks';
export * from './components';
`;

// Create directories and populate index.ts files inside each directory
directories.forEach((dir) => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }

  // Dynamically choose index content based on the directory
  let indexContent = '';
  switch (dir) {
    case 'components':
      indexContent = componentsIndexTemplate;
      break;
    case 'api':
      indexContent = apiIndexTemplate;
      break;
    case 'hooks':
      indexContent = hooksIndexTemplate;
      break;
    case 'slices':
      indexContent = slicesIndexTemplate;
      break;
    case 'types':
      indexContent = typesIndexTemplate;
      break;
    default:
      break;
  }

  // Write the index.ts file with the generated content
  const indexPath = path.join(dirPath, 'index.ts');
  fs.writeFileSync(indexPath, indexContent); // Write the appropriate content
  console.log(`Created index file: ${indexPath}`);
});

// Create feature-level files with template content
const files = [
  {
    path: `components/${FeatureName}Component.tsx`,
    content: componentTemplate,
  },
  {
    path: `slices/${featureName}Slice.ts`,
    content: sliceTemplate,
  },
  {
    path: `api/${featureName}Api.ts`,
    content: apiTemplate,
  },
  {
    path: `hooks/use${FeatureName}.ts`,
    content: hookTemplate,
  },
  {
    path: `types/${singularFeatureName}Types.ts`,
    content: typesTemplate,
  },
  {
    path: `index.ts`, // Feature-level index.ts
    content: featureIndexTemplate,
  },
];

// Write all the template files to their respective paths
files.forEach((file) => {
  const filePath = path.join(baseDir, file.path);
  fs.writeFileSync(filePath, file.content);
  console.log(`Created file: ${filePath}`);
});

console.log(`Feature '${featureName}' created successfully.`);
