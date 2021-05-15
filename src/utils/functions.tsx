import { Card, TodoType } from 'global';

import { Dispatch } from 'react';
import { setCards } from 'src/redux/cardsSlice';

import { Auth, Cards } from 'src/service/axios';

import { toaster } from './toaster';

// --- FUNCTIONS FROM CARDCONTAINER ---

export const addNewCard = (
  cards: Card[],
  valid: boolean,
  dispatch: Dispatch<any>
) => {
  if (valid) dispatch(setCards([...cards, { title: undefined, todos: [] }]));
  else toaster('Please fill the title', '', 'warning');
};

// --- FUNCTIONS FROM CARDCOMPONENT ---

export const updateDatabase = async (cards: Card[], loggedUser: any) => {
  const sortedCards = cards.filter((card) => card.title !== undefined);
  await Auth.updateDatabase({
    id: loggedUser.user.id,
    username: loggedUser?.user?.userName,
    cards: sortedCards,
  });
};

export const updateCards = (
  title: string | undefined,
  todos: TodoType[],
  dispatch: Dispatch<any>,
  cards: Card[]
) => {
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

export const completeTodo = (
  e: React.ChangeEvent<HTMLInputElement>,
  completeTodo: TodoType,
  todos: TodoType[],
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
) => {
  const completedChange = [...todos];
  completedChange.forEach((elm, index) => {
    if (elm.todo === completeTodo.todo) {
      const completeTodoUpdate = { ...elm };
      completeTodoUpdate.isCompleted = e.target.checked;
      completedChange[index] = completeTodoUpdate;
    }
  });
  setTodos(completedChange);
};

export const addTitleCard = (
  cards: Card[],
  titleRef: React.RefObject<HTMLInputElement>,
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const titleExists = cards?.find(
    (card) => card.title === titleRef.current?.value
  );
  if (!titleExists) setTitle(titleRef.current?.value);
  else toaster('Title Exists', '', 'warning');
};

export const addTodo = (
  todos: TodoType[],
  todoRef: React.RefObject<HTMLInputElement>,
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
) => {
  const newTodos: TodoType[] = [...todos];
  if (todoRef.current && todoRef.current?.value !== '') {
    const todoExists = todos.find(
      (todo) => todo.todo === todoRef.current?.value
    );
    if (!todoExists) {
      newTodos.push({ todo: todoRef.current?.value, isCompleted: false });
      setTodos(newTodos);
      todoRef.current.value = '';
    } else {
      todoRef.current.value = '';
      toaster('This todo already exist on this card', '', 'warning');
    }
  }
};

export const deleteTodo = (
  deleteTodo: string,
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
  todos: TodoType[]
) => {
  setTodos(() => todos.filter((todo) => todo.todo !== deleteTodo));
};

export const deleteCard = async (cardId: string, dispatch: Dispatch<any>) => {
  const result = await Cards.DELETE(cardId);
  console.log({ result });
  dispatch(setCards(result.data.cards));
};
