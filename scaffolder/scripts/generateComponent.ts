import {
  closeCLI,
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  showHeader,
} from '../utils';

import { componentTemplate } from '../templates';

/**
 * Generates a component file for the specified feature and updates the index file.
 * @param location - The directory where the component file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name (e.g., 'posts', 'Posts', 'post', 'Post').
 */
export const generateComponent = (
  location: string,
  featureNamesDict: FeatureNamesType
) => {
  showHeader('Component Generation');

  // Ensure location and featureName are provided
  if (!location || !featureNamesDict) {
    console.error('Usage: generateComponent <location> <featureName>');
    process.exit(1);
  }

  // Get component content from the template
  const componentContent = componentTemplate(featureNamesDict);

  // Define the full path for the new component file
  const filePath = getFullPath(
    location,
    `${featureNamesDict.PluralPascal}.tsx`
  );

  // Create the component file with directories using fileUtils
  createFileWithDirectories(filePath, componentContent);
  console.log(
    `Component file for ${featureNamesDict.original} created at ${filePath}`
  );

  // Update the index file in the same directory to include the new component
  updateIndexFile(location);
  console.log(`Updated index.ts file in ${location}`);
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [, , location, featureName] = process.argv;
  const featureNamesDict = generateFeatureNames(featureName);
  generateComponent(location, featureNamesDict);
  closeCLI();
}
