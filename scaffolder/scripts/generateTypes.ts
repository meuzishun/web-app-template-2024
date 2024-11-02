import {
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  closeCLI,
  requireNonEmpty,
  askConfirmation,
} from '../utils';

import { typesTemplate } from '../templates/typesTemplate';

/**
 * Prompts the user for type properties and their types.
 * @returns An array of type properties as strings, e.g., `id: number; name: string;`
 */
const promptForTypeProperties = async (): Promise<string> => {
  const properties: string[] = [];
  let addMore = true;

  while (addMore) {
    const propName = await requireNonEmpty('Enter property name (e.g., "id"):');
    const propType = await requireNonEmpty(
      'Enter property type (e.g., "string", "number", "boolean", etc.):'
    );

    properties.push(`${propName}: ${propType};`);

    addMore = await askConfirmation('Would you like to add another property?');
  }

  return properties.join('\n  ');
};

/**
 * Generates a type definition file for the specified feature and updates the index file.
 * @param location - The directory where the type file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name.
 * @param typeProperties - The properties to include in the type definition.
 */
export const generateType = (
  location: string,
  featureNamesDict: FeatureNamesType,
  typeProperties: string
) => {
  if (!location || !featureNamesDict) {
    console.error('Usage: generateType <location> <featureName>');
    process.exit(1);
  }

  const typeContent = typesTemplate(featureNamesDict, typeProperties);

  const filePath = getFullPath(
    location,
    `${featureNamesDict.singularCamel}Types.ts`
  );
  createFileWithDirectories(filePath, typeContent);
  console.log(
    `Type file for ${featureNamesDict.original} created at ${filePath}`
  );

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
          'Enter the location directory for the type definition:'
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

      // Confirm type file creation
      const confirmType = await askConfirmation(
        `Generate type definitions for feature '${featureNamesDict.original}' in ${location}?`
      );
      if (!confirmType) {
        console.log('Type generation canceled.');
        closeCLI();
        return;
      }

      // Prompt user for type properties
      const typeProperties = await promptForTypeProperties();

      // Generate the type file if confirmed
      generateType(location, featureNamesDict, typeProperties);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
