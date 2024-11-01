import {
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  closeCLI,
} from '../utils';

import { typesTemplate } from '../templates/typesTemplate';

/**
 * Generates a type definition file for the specified feature and updates the index file.
 * @param location - The directory where the type file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name (e.g., 'posts', 'Posts', 'post', 'Post').
 */
export const generateType = (
  location: string,
  featureNamesDict: FeatureNamesType
) => {
  // Ensure location and featureName are provided
  if (!location || !featureNamesDict) {
    console.error('Usage: generateType <location> <featureName>');
    process.exit(1);
  }

  // Get type content from the template
  const typeContent = typesTemplate(featureNamesDict);

  // Define the full path for the new type file
  const filePath = getFullPath(
    location,
    `${featureNamesDict.singularCamel}Types.ts`
  );

  // Create the type file with directories using fileUtils
  createFileWithDirectories(filePath, typeContent);
  console.log(
    `Type file for ${featureNamesDict.original} created at ${filePath}`
  );

  // Update the index file in the same directory to include the new type file
  updateIndexFile(location);
  console.log(`Updated index.ts file in ${location}`);
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [, , location, featureName] = process.argv;
  const featureNamesDict = generateFeatureNames(featureName);
  generateType(location, featureNamesDict);
  closeCLI();
}
