import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Media } from '../types/Media';

export const filmsSlice = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getFilms: builder.query<Media[], { year?: number | null }>({
      query: ({ year }) => {
        const params = new URLSearchParams();
        if (year !== null) params.append('year', String(year)); // Если год есть, добавляем в параметры

        return `films?${params.toString()}`; // Строим URL с фильтрацией по году
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetFilmsQuery } = filmsSlice;
