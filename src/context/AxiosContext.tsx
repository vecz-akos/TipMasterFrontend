import React, {createContext, useContext, useState, FC} from 'react';
import axios, {AxiosInstance} from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
// import * as Keychain from 'react-native-keychain';
import { AuthContext, AuthContextType } from './AuthContext';

type Props = {
  children?: React.ReactNode
};

interface AxiosContextType {
  publicAxios: AxiosInstance;
  authAxios: AxiosInstance;
}
  
const AxiosContext = createContext<AxiosContextType>({} as AxiosContextType);
const { Provider } = AxiosContext;

const AxiosProvider: FC<Props> = ({children}: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;

  const publicAxios = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const authAxios = axios.create({
    baseURL: 'http://localhost:8080',
  }); 

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = (failedRequest: any) => {
    const data = {
      token: authContext.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: 'http://localhost:8080/auth/refresh-token',
    };

    return axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        // await Keychain.setGenericPassword(
        //   'token',
        //   JSON.stringify({
        //     accessToken: tokenRefreshResponse.data.accessToken,
        //     refreshToken: authContext.authState.refreshToken,
        //   }),
        // );

        return Promise.resolve();
      })
      .catch(e => {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});


  return (
    <Provider
      value={{
        authAxios,
        publicAxios
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
