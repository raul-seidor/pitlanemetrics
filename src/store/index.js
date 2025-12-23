import { configureStore } from '@reduxjs/toolkit';
import { driversApi } from './api/driversApi';

/**
 * Configure the Redux store with RTK Query for drivers demo
 * 
 * @returns {Object} The configured Redux store
 */
export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer
    [driversApi.reducerPath]: driversApi.reducer,
  },
  // Add the RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for RTK Query
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(driversApi.middleware),
  
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});