import {
  closeCLI,
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  requireNonEmpty,
  askConfirmation,
} from '../utils';

import { apiTemplate } from '../templates';

/**
 * Prompts the user to choose which CRUD operations to include in the API.
 * @returns An object with boolean values indicating which operations to include.
 */
const promptForApiOptions = async (): Promise<{
  includeGetAll: boolean;
  includeGetOne: boolean;
  includeCreate: boolean;
  includeUpdate: boolean;
  includeDelete: boolean;
}> => {
  const includeGetAll = await askConfirmation('Include "Get All" function?');
  const includeGetOne = await askConfirmation(
    'Include "Get One by ID" function?'
  );
  const includeCreate = await askConfirmation('Include "Create" function?');
  const includeUpdate = await askConfirmation('Include "Update" function?');
  const includeDelete = await askConfirmation('Include "Delete" function?');

  return {
    includeGetAll,
    includeGetOne,
    includeCreate,
    includeUpdate,
    includeDelete,
  };
};

/**
 * Generates an API file for the specified feature and updates the index file.
 * @param location - The directory where the API file will be saved.
 * @param featureNamesDict - A dictionary of versions of the feature name.
 * @param apiOptions - The selected CRUD operations to include in the API.
 */
export const generateApi = async (
  location?: string,
  featureNamesDict?: FeatureNamesType,
  apiOptions?: {
    includeGetAll: boolean;
    includeGetOne: boolean;
    includeCreate: boolean;
    includeUpdate: boolean;
    includeDelete: boolean;
  }
) => {
  // Prompt for location if not provided
  if (!location) {
    location = await requireNonEmpty(
      'Enter the location directory for the API file:'
    );
  }

  // Prompt for feature name if featureNamesDict is not provided
  if (!featureNamesDict) {
    const featureName = await requireNonEmpty(
      'Enter the feature name (e.g., "posts"):'
    );
    featureNamesDict = generateFeatureNames(featureName);
  }

  // Prompt for API options if not provided
  if (!apiOptions) {
    apiOptions = await promptForApiOptions();
  }

  // Confirm API file creation
  const confirmApi = await askConfirmation(
    `Generate API for feature '${featureNamesDict.original}' in ${location}?`
  );
  if (!confirmApi) {
    console.log('API generation canceled.');
    closeCLI();
    return;
  }

  // Generate API content from the template
  const apiContent = apiTemplate(featureNamesDict, apiOptions);

  // Define the full path for the new API file
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
  (async () => {
    try {
      // Parse CLI arguments for location and feature name, if provided
      const [, , locationArg, featureNameArg] = process.argv;
      const location = locationArg ? locationArg : undefined;
      const featureNamesDict = featureNameArg
        ? generateFeatureNames(featureNameArg)
        : undefined;

      // Run generateApi with optional prompts for missing arguments
      await generateApi(location, featureNamesDict);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
