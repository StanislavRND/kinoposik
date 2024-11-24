import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Media } from '../types/Media';

export const premieresSlice = createApi({
  reducerPath: 'premieresApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getPremieres: builder.query<Media[], void>({
      query: () => 'premieres',
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetPremieresQuery } = premieresSlice;
