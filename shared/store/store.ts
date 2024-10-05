import { configureStore } from '@reduxjs/toolkit';
import { filmsSlice } from './films';
import { premieresSlice } from './premieres';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [filmsSlice.reducerPath]: filmsSlice.reducer,
      [premieresSlice.reducerPath]: premieresSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filmsSlice.middleware).concat(premieresSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
