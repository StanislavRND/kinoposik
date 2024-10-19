import { configureStore } from '@reduxjs/toolkit';
import { premieresSlice } from './premieres';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [premieresSlice.reducerPath]: premieresSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(premieresSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
