import { Card, TodoType, User } from 'global';
import { toaster } from 'src/utils/toaster';
import { Cards } from './axios';

export const updateDatabase = async (
  cards: Card[],
  loggedUser: User | undefined
) => {
  const sortedCards = cards.filter((card) => card.title !== undefined);
  await Cards.UPDATE({
    id: loggedUser?.id || '',
    username: loggedUser?.userName || '',
    cards: sortedCards,
  });
};

export const deleteTodo = (
  deleteTodo: string,
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
  todos: TodoType[]
) => {
  setTodos(() => todos.filter((todo) => todo.todo !== deleteTodo));
};

export const addTodo = (
  todos: TodoType[],
  todoRef: React.RefObject<HTMLInputElement>,
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
) => {
  const newTodos: TodoType[] = [...todos];
  if (todoRef.current && todoRef.current?.value !== '') {
    if (todoRef.current?.value.length > 40) {
      todoRef.current.value = '';
      return toaster('', 'Maximum 40 character is allowed', 'warning');
    }

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

export const changeTodo = (
  todos: TodoType[],
  index: number,
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
  changedTodo: string
) => {
  const newTodos = [...todos];
  newTodos.forEach((changeTodo, i) => {
    if (i === index) {
      const updatedTodo = { ...changeTodo };
      updatedTodo.todo = changedTodo;
      newTodos[i] = updatedTodo;
    }
  });
  setTodos(newTodos);
};

export const addTitleCard = (
  cards: Card[],
  titleRef: React.RefObject<HTMLInputElement>,
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const enteredTitle = titleRef.current?.value;
  if (titleRef.current && titleRef.current?.value !== '') {
    if (titleRef.current.value.length > 30) {
      titleRef.current.value = '';
      return toaster('', 'Maximum 30 character is allowed', 'warning');
    }
    const titleExists = cards?.find((card) => card.title === enteredTitle);
    if (!titleExists) setTitle(titleRef.current?.value);
    else toaster('Title Exists', '', 'warning');
  }
};
