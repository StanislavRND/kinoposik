import { configureStore } from '@reduxjs/toolkit';
import { premieresSlice } from './premieres';
import { filmsSlice } from './films';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [premieresSlice.reducerPath]: premieresSlice.reducer,
			[filmsSlice.reducerPath]: filmsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(premieresSlice.middleware).concat(filmsSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
