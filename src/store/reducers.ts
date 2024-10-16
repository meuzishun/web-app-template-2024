import { combineReducers } from '@reduxjs/toolkit';

import counterSlice from '~/slices/counterSlice';

export const reducers = combineReducers({
  counterSlice: counterSlice.reducer,
});
