import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Add other slices here as needed
  },
});

// Export store and types for use with TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
