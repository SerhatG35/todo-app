export type User = {
  id: string;
  token: string;
  userName: string;
} | null;

export type TodoType = {
  todo: string;
  isCompleted: boolean;
};

export type Card = {
  _id?: string;
  title: string | undefined;
  todos: TodoType[];
};

export type loginTypes = {
  auth: {
    username: string;
    password: string;
  };
};

export type registerTypes = {
  firstname: string;
  username: string;
  email: string;
  password: string;
};

export type databaseType = {
  id: string;
  username: string;
  cards: Card[];
};

export type UpdateTypes = {
  id: string;
  username: string;
  cards: Card[];
};
