import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { env } from "@/env";
const TIMEOUT = 1 * 60 * 1000;

axios.defaults.timeout = TIMEOUT;

axios.defaults.baseURL = env.NEXT_PUBLIC_SERVER_API_URL;

const setupAxiosInterceptors = (onUnauthenticated:()=> void) => {
  const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    return config;
  };
  const onResponseError = (err: AxiosError) => {
    const status = err.status ?? (err.response ? err.response.status : 0);
    if (status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use((response)=> response, onResponseError);
};

export default setupAxiosInterceptors;
