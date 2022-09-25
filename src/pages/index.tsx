import type { NextPage } from 'next';
import { useAuth } from '../contexts/auth';
import LoginPage from './login';

const Home: NextPage = () => {
  const { isAuthorized } = useAuth();

  if (!isAuthorized) return <LoginPage />;

  return <span>you are authenticated :D</span>;
};

export default Home;
