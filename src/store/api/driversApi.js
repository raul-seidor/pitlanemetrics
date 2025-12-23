import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * RTK Query API for Open F1 drivers data
 * 
 * Simple API slice for demonstration purposes - only handles drivers endpoint
 */
export const driversApi = createApi({
  reducerPath: 'driversApi',
  
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openf1.org/v1/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  
  // Define cache tags for automatic invalidation
  tagTypes: ['Drivers'],
  
  endpoints: (builder) => ({
    
    /**
     * Get drivers information from Open F1 API
     */
    getDrivers: builder.query({
      query: (queryParams = {}) => ({
        url: 'drivers',
        params: queryParams,
      }),
      providesTags: ['Drivers'],
      // Cache for 5 minutes (driver info doesn't change often during a session)
      keepUnusedDataFor: 300,
      // Transform the response to ensure it's always an array
      transformResponse: (response) => {
        return Array.isArray(response) ? response : [response];
      },
    }),
    
  }),
});

// Export hooks for components to use
export const {
  useGetDriversQuery,
  useLazyGetDriversQuery,
} = driversApi;