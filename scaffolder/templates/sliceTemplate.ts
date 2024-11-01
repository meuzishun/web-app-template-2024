import { FeatureNamesType } from '../utils';

export const sliceTemplate = (featureNamesDict: FeatureNamesType): string => {
  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ${featureNamesDict.PluralPascal}State } from '../types';

const initialState: ${featureNamesDict.PluralPascal}State = {
  // Define initial state structure here
  ${featureNamesDict.pluralCamel}: [],
};

const ${featureNamesDict.pluralCamel}Slice = createSlice({
  name: '${featureNamesDict.pluralCamel}',
  initialState,
  reducers: {
    // Define reducers here
    exampleReducer: (state, action: PayloadAction<any>) => {
      // Example reducer logic here
    },
  },
});

// Export actions as named exports
export const { exampleReducer } = ${featureNamesDict.pluralCamel}Slice.actions;

// Export reducer as default export
export default ${featureNamesDict.pluralCamel}Slice.reducer;
`;
};
