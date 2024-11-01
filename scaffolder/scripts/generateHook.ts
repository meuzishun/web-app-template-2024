import {
  createFileWithDirectories,
  getFullPath,
  FeatureNamesType,
  generateFeatureNames,
  updateIndexFile,
  closeCLI,
} from '../utils';

import { hookTemplate } from '../templates/hookTemplate';

/**
 * Generates a hook file for the specified feature and updates the index file.
 * @param location - The directory where the hook file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name (e.g., 'posts', 'Posts', 'post', 'Post').
 */
export const generateHook = (
  location: string,
  featureNamesDict: FeatureNamesType
) => {
  // Ensure location and featureName are provided
  if (!location || !featureNamesDict) {
    console.error('Usage: generateHook <location> <featureName>');
    process.exit(1);
  }

  // Get hook content from the template
  const hookContent = hookTemplate(featureNamesDict);

  // Define the full path for the new hook file
  const filePath = getFullPath(
    location,
    `use${featureNamesDict.PluralPascal}.ts`
  );

  // Create the hook file with directories using fileUtils
  createFileWithDirectories(filePath, hookContent);
  console.log(
    `Hook file for ${featureNamesDict.original} created at ${filePath}`
  );

  // Update the index file in the same directory to include the new hook
  updateIndexFile(location);
  console.log(`Updated index.ts file in ${location}`);
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [, , location, featureName] = process.argv;
  const featureNamesDict = generateFeatureNames(featureName);
  generateHook(location, featureNamesDict);
  closeCLI();
}
