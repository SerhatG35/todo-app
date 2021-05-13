import axios, { AxiosRequestConfig } from 'axios';

import { databaseType, loginTypes, registerTypes, User } from 'global';

const PROD_API = 'https://my-todo-app-backend.herokuapp.com/';
const LOCAL_API = 'http://localhost:4000/';

const API = axios.create({
  baseURL: PROD_API,
});

export const Auth = {
  login: async (params: loginTypes) => {
    const { data } = await API.post<User>('/login', { ...params });
    API.interceptors.request.use((config) => injectToken(config, data?.token));
    localStorage.setItem('login', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
    return data;
  },
  register: async (params: registerTypes) => {
    const result = await API.post('/register', { ...params });
    return result;
  },
  getCards: async () => {
    const login: User = JSON.parse(localStorage.getItem('login') || '{}');
    API.interceptors.request.use((config) => injectToken(config, login?.token));
    const { data } = await API.get<databaseType>('/todos');
    return data;
  },
  updateDatabase: async (params: databaseType) => {
    const data = await API.post('/todos', { ...params });
    return data;
  },
};

const injectToken = (config: AxiosRequestConfig, token: string | undefined) => {
  try {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch (error) {
    throw new Error(error);
  }
};

export default API;
