import {
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  closeCLI,
  requireNonEmpty,
  askConfirmation,
  showHeader,
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
  showHeader('Slice Generation');

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
  (async () => {
    try {
      // Prompt for location if not provided
      let location = process.argv[2];
      if (!location) {
        location = await requireNonEmpty(
          'Enter the location directory for the slice:'
        );
      }

      // Prompt for feature name if not provided
      let featureName = process.argv[3];
      if (!featureName) {
        featureName = await requireNonEmpty(
          'Enter the feature name (e.g., "posts"):'
        );
      }

      const featureNamesDict = generateFeatureNames(featureName);

      // Confirm slice creation
      const confirmSlice = await askConfirmation(
        `Generate a slice for feature '${featureNamesDict.original}' in ${location}?`
      );
      if (!confirmSlice) {
        console.log('Slice generation canceled.');
        closeCLI();
        return;
      }

      // Generate the slice if confirmed
      generateSlice(location, featureNamesDict);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
