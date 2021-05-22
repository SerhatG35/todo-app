import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, TodoType } from 'global';
import { Cards, Todos } from 'src/service/axios';
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
      const cardTitleExists = newCardState.find((card) => card.title === title);
      if (cardTitleExists) {
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

export const changeTitle =
  (cards: Card[], previousTitle: string, changedTitle: string) =>
  async (dispatch: AppDispatch) => {
    const newCardState = [...cards];
    const cardTitleExists = newCardState.find(
      (card) => card.title === changedTitle
    );
    if (!cardTitleExists) {
      newCardState.forEach((card, index) => {
        if (card.title === previousTitle) {
          const titleUpdate = { ...card };
          titleUpdate.title = changedTitle;
          newCardState[index] = titleUpdate;
        }
      });
      dispatch(setCards(newCardState));
    } else toaster('Title Exists', '', 'warning');
  };

export const addNewCard =
  (
    cards: Card[],
    valid: boolean,
    categoryRef: React.RefObject<HTMLSelectElement>
  ) =>
  async (dispatch: AppDispatch) => {
    if (valid && categoryRef.current?.value) {
      dispatch(
        setCards([
          ...cards,
          {
            title: undefined,
            todos: [],
            category: categoryRef.current.value,
          },
        ])
      );
      categoryRef.current.selectedIndex = 0;
    } else if (!categoryRef.current?.value)
      toaster('Please select a category', '', 'warning');
    else toaster('Please fill the title', '', 'warning');
  };

export const deleteCard = (cardTitle: string) => {
  return async (dispatch: AppDispatch) => {
    const result = await Cards.DELETE(cardTitle);
    dispatch(setCards(result.data.cards));
  };
};

export const reOrderCards =  //drag and drop
  (newCards: Card[]) => async (dispatch: AppDispatch) => {
    dispatch(setCards(newCards));
  };

//clientta sadece cardda değişiklik olduğundan todoyu maplayan array bu değişimin farkında değil
export const deleteTodo = (title: string, todoToDelete: string) => {
  return async (dispatch: AppDispatch) => {
    console.log({ title, todoToDelete });
    const result = await Todos.DELETE(title, todoToDelete);
    dispatch(setCards(result.data.cards));
  };
};
