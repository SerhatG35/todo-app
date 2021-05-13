import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './cardsSlice';

export const store = configureStore({
  reducer: {
    cardsSlice: cardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
