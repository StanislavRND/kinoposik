import { Media } from '@/types/Media';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const filmsSlice = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getFilms: builder.query<Media[], void>({
      query: () => 'films',
    }),
  }),
});

export const { useGetFilmsQuery } = filmsSlice;
