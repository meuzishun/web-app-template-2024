import {
  closeCLI,
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
} from '../utils';

import { apiTemplate } from '../templates';

/**
 * Generates an API file for the specified feature and updates the index file.
 * @param location - The directory where the API file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name (e.g., 'posts', 'Posts', 'post', 'Post').
 */
export const generateApi = (
  location: string,
  featureNamesDict: FeatureNamesType
) => {
  // Ensure location and featureName are provided
  if (!location || !featureNamesDict) {
    console.error('Usage: generateApi <location> <featureName>');
    process.exit(1);
  }

  const apiContent = apiTemplate(featureNamesDict);

  // Define the full path for the new API file using getFullPath utility
  const filePath = getFullPath(
    location,
    `${featureNamesDict.pluralCamel}Api.ts`
  );

  // Create the file and ensure its directory exists using fileUtils
  createFileWithDirectories(filePath, apiContent);
  console.log(
    `API file for ${featureNamesDict.original} created at ${filePath}`
  );

  // Update the index file in the same directory to include the new API file
  updateIndexFile(location);
  console.log(`Updated index.ts file in ${location}`);
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [, , location, featureName] = process.argv;
  const featureNamesDict = generateFeatureNames(featureName);
  generateApi(location, featureNamesDict);
  closeCLI();
}
