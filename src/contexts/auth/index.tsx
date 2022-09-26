import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  AUTHORIZATION_TOKEN,
  REFRESH_TOKEN,
} from '../../constants/localStorage';
import { api, CommonHeaderProps } from '../../services/api';
import { noop } from '../../utils/noop';
import {
  AuthContextType,
  Authenticate,
  AuthorizeProps,
  CreateAccount,
  CreateUserHTTPResponse,
  LoginHTTPResponse,
} from './types';

const DEFAULT_STATE = {
  isAuthorized: false,
  authenticate: noop as unknown as Authenticate,
  createAccount: noop as unknown as CreateAccount,
};

export const AuthContext = createContext<AuthContextType>(DEFAULT_STATE);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isAuthorized, setAuthorized] = useState<boolean>(
    DEFAULT_STATE.isAuthorized
  );

  const authorize = ({ acessToken, refreshToken }: AuthorizeProps) => {
    localStorage.setItem(AUTHORIZATION_TOKEN, acessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    api.defaults.headers = {
      ...api.defaults.headers,
      authorization: acessToken,
    } as CommonHeaderProps;
    setAuthorized(true);
  };

  useEffect(() => {
    const isAuthorized = localStorage.getItem(AUTHORIZATION_TOKEN);
    if (!isAuthorized) return () => {};

    setAuthorized(true);
  }, []);

  const authenticate: Authenticate = async ({ email, password }) => {
    const { data } = await api.post<LoginHTTPResponse>('/users/login', {
      email,
      password,
    });

    authorize({
      acessToken: data.acessToken,
      refreshToken: data.refreshToken,
    });
  };

  const createAccount: CreateAccount = async (userData) => {
    const { data } = await api.post<CreateUserHTTPResponse>('/users', userData);

    authorize({
      acessToken: data.acessToken,
      refreshToken: data.refreshToken,
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, authenticate, createAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const state = useContext(AuthContext);

  return state;
};
