import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AUTHORIZATION_TOKEN } from '../../constants/localStorage';
import { api } from '../../services/api';
import { noop } from '../../utils/noop';
import { AuthContextType, Authenticate, CreateAccount } from './types';

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

  useEffect(() => {
    const isAuthorized = localStorage.getItem('@next-bank:authorizationToken');
    if (!isAuthorized) return () => {};

    setAuthorized(true);
  }, []);

  const authenticate: Authenticate = async ({ email, password }) => {
    const { data } = await api.post('/users/login', {
      email,
      password,
    });

    localStorage.setItem(AUTHORIZATION_TOKEN, data.token);
    setAuthorized(true);
  };

  const createAccount: CreateAccount = async (userData) => {
    const { data } = await api.post('/users', userData);

    localStorage.setItem(AUTHORIZATION_TOKEN, data.token);
    setAuthorized(true);
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
