import {
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  closeCLI,
  requireNonEmpty,
  askConfirmation,
  askForDirectory,
  showHeader,
} from '../utils';

import { sliceTemplate } from '../templates/sliceTemplate';

/**
 * Generates a Redux slice file for the specified feature and updates the index file.
 * @param location - The directory where the slice file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name (e.g., 'posts', 'Posts', 'post', 'Post').
 */
export const generateSlice = async (
  location?: string,
  featureNamesDict?: FeatureNamesType
) => {
  showHeader('Slice Generation');

  // Prompt for location if not provided
  if (!location) {
    location = await askForDirectory(
      'Enter the location directory for the slice definition:'
    );
  }

  // Prompt for feature name if featureNamesDict is not provided
  if (!featureNamesDict) {
    const featureName = await requireNonEmpty(
      'Enter the feature name (e.g., "posts"):'
    );
    featureNamesDict = generateFeatureNames(featureName);
  }

  // Confirm filename
  let filename = `${featureNamesDict.pluralCamel}Slice.ts`;

  const filenameConfirmed = await askConfirmation(
    `Should the filename be ${filename}?`
  );

  if (!filenameConfirmed) {
    filename = await requireNonEmpty('Enter a new filename:');
  }

  // Confirm name property of slice
  let sliceNameProp = `${featureNamesDict.pluralCamel}`;

  const sliceNamePropConfirmed = await askConfirmation(
    `Should the name prop of the slice be ${sliceNameProp}`
  );

  if (!sliceNamePropConfirmed) {
    sliceNameProp = await requireNonEmpty('Enter a new name prop for slice:');
  }

  // Get slice content from the template
  const sliceContent = sliceTemplate(sliceNameProp, featureNamesDict);

  // Define the full path for the new slice file
  const filePath = getFullPath(location, filename);

  // Print generated template
  console.log(sliceContent);

  // Confirm slice creation
  const confirmSlice = await askConfirmation(
    `Generate a slice for feature '${featureNamesDict.original}' in ${location}?`
  );

  if (!confirmSlice) {
    console.log('Slice generation canceled.');
    closeCLI();
    return;
  }

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
      // Parse CLI arguments for location and feature name, if provided
      const [, , locationArg, featureNameArg] = process.argv;
      const location = locationArg ? locationArg : undefined;
      const featureNamesDict = featureNameArg
        ? generateFeatureNames(featureNameArg)
        : undefined;

      // Run generateSlice with optional prompts for missing arguments
      await generateSlice(location, featureNamesDict);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
