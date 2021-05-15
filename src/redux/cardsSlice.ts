import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, TodoType } from 'global';
import { Cards } from 'src/service/axios';
import { toaster } from 'src/utils/toaster';
import { AppDispatch } from './store';

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

export const updateCards = (
  cards: Card[],
  title: string | undefined,
  todos: TodoType[]
) => {
  return async (dispatch: AppDispatch) => {
    if (title) {
      const newCardState = [...cards];
      const cardExists = newCardState.find((card) => card.title === title);
      if (cardExists) {
        newCardState.forEach((card, index) => {
          if (card.title === title) {
            const todoToUpdate = { ...card };
            todoToUpdate.todos = todos;
            newCardState[index] = todoToUpdate;
          }
        });
        dispatch(setCards(newCardState));
      } else {
        newCardState.forEach((card, index) => {
          if (card.title === undefined) {
            const cardToUpdate = { ...card };
            cardToUpdate.title = title;
            cardToUpdate.todos = todos;
            newCardState[index] = cardToUpdate;
          }
        });
        dispatch(setCards(newCardState));
      }
    }
  };
};

export const addNewCard =
  (cards: Card[], valid: boolean) => async (dispatch: AppDispatch) => {
    console.log({ cards: cards, valid: valid });
    if (valid) dispatch(setCards([...cards, { title: undefined, todos: [] }]));
    else toaster('Please fill the title', '', 'warning');
  };

export const deleteCard = (cardId: string) => {
  return async (dispatch: AppDispatch) => {
    const result = await Cards.DELETE(cardId);
    dispatch(setCards(result.data.cards));
  };
};
