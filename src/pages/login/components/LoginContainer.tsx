import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Flex } from '../../../components/primitives/Flex';
import { useAuth } from '../../../contexts/auth';
import { theme } from '../../../theme';
import { ChangeLoginMode } from './ChangeLoginMode';

export type LoginMode = 'signin' | 'signup';

const stringsMapByMode = {
  signin: {
    title: 'Sign in',
    description: 'Welcome Back!',
  },
  signup: {
    title: 'Create Account',
    description: 'Welcome to our bank!',
  },
};

export const LoginContainer = () => {
  const [mode, setMode] = useState<LoginMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { authenticate } = useAuth();
  const strings = stringsMapByMode[mode];

  const handleChangeLoginMode = () => {
    if (mode === 'signin') {
      setMode('signup');
      return;
    }
    setMode('signin');
  };

  const handleAuthenticate = async () => {
    setError('');
    if (!email || !password) {
      setError('Empty Email/Password');
      return;
    }
    if (mode === 'signin') {
      try {
        setLoading(true);
        await authenticate({ email, password });
      } catch (error) {
        setError(
          (error as AxiosError<{ message: string }>)?.response?.data?.message!
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Flex
      style={{
        gap: 22,
        padding: '40px 60px',
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        boxShadow: '0 6px 25px rgba(173,187,201,.16)',
        textAlign: 'center',
        height: '458px',
      }}
    >
      <Box>
        <Heading mb={2}>{strings.title}</Heading>
        <Text>{strings.description}</Text>
      </Box>

      <Flex style={{ gap: 8 }}>
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <AiOutlineMail />
          </InputLeftElement>
          <Input
            required
            type="email"
            placeholder="Enter Your Email"
            fontSize="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <AiFillLock />
          </InputLeftElement>
          <Input
            required
            type="password"
            placeholder="Enter Your Password"
            fontSize="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <Button
          size="lg"
          color={theme.colors.primary}
          width="full"
          onClick={handleAuthenticate}
          type="submit"
        >
          {isLoading ? <CircularProgress /> : strings.title}
        </Button>
      </Flex>
      {<Text color="red.500">{error}</Text>}

      <ChangeLoginMode mode={mode} onClick={handleChangeLoginMode} />
    </Flex>
  );
};
