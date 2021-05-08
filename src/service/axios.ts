import axios, { AxiosRequestConfig } from 'axios';

import { User } from 'global';

const PROD_API = 'http://54.236.229.160:6500/api/';
const LOCAL_API = 'http://localhost:4000/';

const API = axios.create({
  baseURL: LOCAL_API,
});

type loginTypes = {
  auth: {
    username: string;
    password: string;
  };
};

export const Auth = {
  login: async (params: loginTypes) => {
    const { data } = await API.post<User>('/login', { ...params });

    localStorage.setItem('login', JSON.stringify(data));
    API.interceptors.request.use((config) => injectToken(config, data?.token));
    window.dispatchEvent(new Event('storage'));
    return data;
  },
};

export const injectToken = (
  config: AxiosRequestConfig,
  token: string | undefined
) => {
  try {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw new Error(error);
  }
};

export default API;
