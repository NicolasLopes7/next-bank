import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import {
  AiFillLock,
  AiOutlineMail,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { Flex } from '../primitives/Flex';
import { useAuth } from '../../contexts/auth';
import { theme } from '../../theme';
import { ChangeLoginMode } from './ChangeLoginMode';

type SignInProps = { changeMode: () => void };
export const SignIn = ({ changeMode }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState('password');
  const { authenticate } = useAuth();

  const toast = useToast();

  const preventDuplicateToast = () => {
    const id = 'uniqueToast';
    if (!toast.isActive(id)) {
      toast({
        id,
        title: 'Error',
        description: error,
        duration: 3000,
        isClosable: true,
        status: 'error',
        position: 'top-right',
      });
    }
  };

  const handleAuthenticate = async () => {
    setError('');
    if (!email || !password) {
      setError('Empty Email/Password');
      return;
    }
    try {
      setLoading(true);
      await authenticate({ email, password });
    } catch (error) {
      setError(
        (error as AxiosError<{ message: string }>)?.response?.data?.message!
      );
      preventDuplicateToast();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={8}>
        <Heading mb={2}>Sign In</Heading>
        <Text>Welcome Back!</Text>
      </Box>

      <Flex style={{ gap: 8 }} mb={2}>
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
          <InputRightElement
            onClick={() => {
              if (visible === 'password') {
                setVisible('string');
              } else {
                setVisible('password');
              }
            }}
          >
            {visible === 'string' ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </InputRightElement>
          <Input
            required
            type={visible}
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
          {isLoading ? <CircularProgress /> : 'Sign In'}
        </Button>
      </Flex>

      <ChangeLoginMode mode={'signin'} onClick={changeMode} />
    </Box>
  );
};
