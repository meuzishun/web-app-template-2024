import {
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  closeCLI,
} from '../utils';

import { sliceTemplate } from '../templates/sliceTemplate';

/**
 * Generates a Redux slice file for the specified feature and updates the index file.
 * @param location - The directory where the slice file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name (e.g., 'posts', 'Posts', 'post', 'Post').
 */
export const generateSlice = (
  location: string,
  featureNamesDict: FeatureNamesType
) => {
  // Ensure location and featureName are provided
  if (!location || !featureNamesDict) {
    console.error('Usage: generateSlice <location> <featureName>');
    process.exit(1);
  }

  // Get slice content from the template
  const sliceContent = sliceTemplate(featureNamesDict);

  // Define the full path for the new slice file
  const filePath = getFullPath(
    location,
    `${featureNamesDict.pluralCamel}Slice.ts`
  );

  // Create the slice file with directories using fileUtils
  createFileWithDirectories(filePath, sliceContent);
  console.log(
    `Slice file for ${featureNamesDict.original} created at ${filePath}`
  );

  // Update the index file in the same directory to include the new slice
  updateIndexFile(location);
  console.log(`Updated index.ts file in ${location}`);
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [, , location, featureName] = process.argv;
  const featureNamesDict = generateFeatureNames(featureName);
  generateSlice(location, featureNamesDict);
  closeCLI();
}
