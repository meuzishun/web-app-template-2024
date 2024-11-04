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
    const propName = await requireNonEmpty(
      'Add a field for interface (e.g., "id"):'
    );
    const propType = await requireNonEmpty(
      `Enter property type for ${propName} (e.g., "string", "number", "boolean", etc.):`
    );

    properties.push(`${propName}: ${propType};`);

    addMore = await askConfirmation('Would you like to add another field?');
  }

  return properties.join('\n  ');
};

/**
 * Prompts the user to configure the state interface, if desired.
 * @returns The properties for the state interface as a string, or an empty string if omitted.
 */
const promptForStateInterface = async (): Promise<[boolean, string]> => {
  const includeStateInterface = await askConfirmation(
    'Would you like to include a state interface for this feature?'
  );

  let stateProperties = '';

  if (includeStateInterface) {
    console.log('Configuring state interface properties...');
    stateProperties = await promptForTypeProperties();
  }

  return [includeStateInterface, stateProperties];
};

/**
 * Generates a type definition file for the specified feature and updates the index file.
 * If location or featureNamesDict is missing, prompts the user for the missing information.
 * @param location - The directory where the type file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name.
 * @param typeProperties - The properties to include in the type definition.
 */
export const generateType = async (
  location?: string,
  featureNamesDict?: FeatureNamesType,
  typeProperties?: string
) => {
  // Prompt for location if not provided
  if (!location) {
    location = await requireNonEmpty(
      'Enter the location directory for the type definition:'
    );
  }

  // Prompt for feature name if featureNamesDict is not provided
  if (!featureNamesDict) {
    const featureName = await requireNonEmpty(
      'Enter the feature name (e.g., "posts"):'
    );
    featureNamesDict = generateFeatureNames(featureName);
  }

  // Confirm or prompt for type properties if not provided
  if (!typeProperties) {
    typeProperties = await promptForTypeProperties();
  }

  // Ask the user about including and customizing the state interface
  const [includeStateInterface, stateProperties] =
    await promptForStateInterface();

  // Confirm type file creation
  const confirmType = await askConfirmation(
    `Generate type definitions for feature '${featureNamesDict.original}' in ${location}?`
  );
  if (!confirmType) {
    console.log('Type generation canceled.');
    closeCLI();
    return;
  }

  // Get type content from the template
  const typeContent = typesTemplate(
    featureNamesDict,
    typeProperties,
    includeStateInterface,
    stateProperties
  );

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
  (async () => {
    try {
      // Parse CLI arguments for location and feature name, if provided
      const [, , locationArg, featureNameArg] = process.argv;
      const location = locationArg ? locationArg : undefined;
      const featureNamesDict = featureNameArg
        ? generateFeatureNames(featureNameArg)
        : undefined;

      // Run generateType with optional prompts for missing arguments
      await generateType(location, featureNamesDict);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
