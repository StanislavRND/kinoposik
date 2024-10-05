

import { Media } from '@/types/Media';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const premieresSlice = createApi({
  reducerPath: 'premieresApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getPremieres: builder.query<Media[], void>({
      query: () => 'premier',
    }),
  }),
});

export const { useGetPremieresQuery } = premieresSlice;