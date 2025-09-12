

import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import mapDataReducer from './mapDataSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    mapData: mapDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
