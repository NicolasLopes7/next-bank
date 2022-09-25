import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { noop } from '../../utils/noop';

const DEFAULT_STATE = {
  isAuthorized: false,
  authenticate: noop,
};

type AuthContextType = { isAuthorized: boolean; authenticate: () => void };
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

  const authenticate = () => {
    setAuthorized(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const state = useContext(AuthContext);

  return state;
};
