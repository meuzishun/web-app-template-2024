import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function camelToPascal(camelCaseString) {
  return camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);
}

// Example usage
console.log(camelToPascal('myCamelCaseString')); // Output: MyCamelCaseString

// Get the feature name from the command line arguments
const featureName = process.argv[2];
const FeatureName = camelToPascal(featureName);

if (!featureName) {
  console.error('Please provide a feature name!');
  process.exit(1);
}

const baseDir = path.join(__dirname, 'src', 'features', featureName);

// Directory structure
const directories = ['components', 'hooks', 'api', 'slices', 'types'];

// Template for a basic component
const componentTemplate = `
import React from 'react';

interface ${FeatureName}Props {
  // Add prop types here
}

const ${FeatureName}Component: React.FC<${FeatureName}Props> = () => {
  return <div>${FeatureName} works!</div>;
};

export default ${FeatureName}Component;

`;

// Template for slice (example with Redux slice)
const sliceTemplate = `
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Add initial state here
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

// Create directories
directories.forEach((dir) => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Create files with template content
const files = [
  {
    path: `components/${FeatureName}Component.tsx`,
    content: componentTemplate,
  },
  {
    path: `slices/${featureName}Slice.ts`,
    content: sliceTemplate,
  },
];

files.forEach((file) => {
  const filePath = path.join(baseDir, file.path);
  fs.writeFileSync(filePath, file.content);
  console.log(`Created file: ${filePath}`);
});

console.log(`Feature '${featureName}' created successfully.`);
