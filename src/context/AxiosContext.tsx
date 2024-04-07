import React, {createContext, useState, FC} from 'react';
import axios, {AxiosInstance} from 'axios';

type Props = {
  children?: React.ReactNode
};

interface AxiosContextType {
  publicAxios: AxiosInstance;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  token: any;
}
  
const AxiosContext = createContext<AxiosContextType>({} as AxiosContextType);
const { Provider } = AxiosContext;

const AxiosProvider: FC<Props> = ({children}: any) => {
  const [token, setToken] = useState<string>("");

  const publicAxios = axios.create({
    baseURL: 'http://localhost:8080',
  });

  publicAxios.interceptors.request.use(
    config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        publicAxios,
        setToken,
        token
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
