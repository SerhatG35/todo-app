import axios, { AxiosRequestConfig } from 'axios';

import {
  databaseType,
  loginTypes,
  registerTypes,
  UpdateTypes,
  User,
} from 'global';

const PROD_API = 'https://my-todo-app-backend.herokuapp.com/';
const LOCAL_API = 'http://localhost:4000/';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? LOCAL_API : PROD_API,
});

export const Auth = {
  LOGIN: async (params: loginTypes) => {
    const { data } = await API.post<User>('/login', { ...params });
    API.interceptors.request.use((config) => injectToken(config, data?.token));
    localStorage.setItem('login', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
    return data;
  },
  REGISTER: async (params: registerTypes) => {
    const result = await API.post('/register', { ...params });
    return result;
  },
};

export const Cards = {
  DELETE: async (title: string) => {
    const data = await API.delete(`/cards/${title}`);
    return data;
  },
  UPDATE: async (params: UpdateTypes) => {
    const data = await API.post('/cards', { ...params });
    return data;
  },
  GET: async () => {
    const login: User = JSON.parse(localStorage.getItem('login') || '{}');
    API.interceptors.request.use((config) => injectToken(config, login?.token));
    const { data } = await API.get<databaseType>('/cards');
    return data;
  },
};

// export const Todos = {
//   DELETE: async (title: string, todo: string) => {
//     const data = await API.delete(`/todos/${title}/${todo}`);
//     return data;
//   },
// };

const injectToken = (config: AxiosRequestConfig, token: string | undefined) => {
  try {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch (error) {
    throw new Error(error);
  }
};

export default API;
