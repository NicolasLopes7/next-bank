import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { AiFillLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Flex } from '../primitives/Flex';
import { useAuth } from '../../contexts/auth';
import { theme } from '../../theme';
import { ChangeLoginMode } from './ChangeLoginMode';
import validator from 'validator';

type SignUpProps = { changeMode: () => void };
export const SignUp = ({ changeMode }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { createAccount } = useAuth();

  const toast = useToast();

  const toastErrorTemplate = () => {
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

    if (!validator.isEmail(email)) {
      setError('Not valid email');
      toastErrorTemplate();
      throw error;
    }

    if (password !== confirmPassword) {
      setError('Your passwords are different');
      toastErrorTemplate();
      throw error;
    }

    try {
      setLoading(true);
      await createAccount({ email, password, name });
    } catch (error) {
      setError(
        (error as AxiosError<{ message: string }>)?.response?.data?.message!
      );
      toastErrorTemplate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={8}>
        <Heading mb={2}>Sign Up!</Heading>
        <Text>Welcome to our bank</Text>
      </Box>

      <Flex style={{ gap: 8 }} mb={2}>
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <AiOutlineUser />
          </InputLeftElement>
          <Input
            required
            type="email"
            placeholder="Enter Your Name"
            fontSize="md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
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

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <AiFillLock />
          </InputLeftElement>
          <Input
            required
            type="password"
            placeholder="Confirm Your Password"
            fontSize="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>

        <Button
          size="lg"
          color={theme.colors.primary}
          width="full"
          onClick={handleAuthenticate}
          type="submit"
        >
          {isLoading ? <CircularProgress /> : 'Sign Up'}
        </Button>
      </Flex>

      <ChangeLoginMode mode={'signup'} onClick={changeMode} />
    </Box>
  );
};
