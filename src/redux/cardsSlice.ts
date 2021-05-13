import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from 'global';

interface cardsSliceInitial {
  userCards: Card[];
}

const initialState: cardsSliceInitial = {
  userCards: [],
};

export const cardsSlice = createSlice({
  name: 'userCards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.userCards = action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
