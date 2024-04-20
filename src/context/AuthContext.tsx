import React, {createContext, useState, FC} from 'react';
// import * as Keychain from 'react-native-keychain';

type Props = {
  children?: React.ReactNode
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null,
  authenticated: boolean | null;
}

export interface AuthContextType {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const {Provider} = AuthContext;

const AuthProvider: FC<Props> = ({children}: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    //await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};
