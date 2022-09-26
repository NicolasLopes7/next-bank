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
import { AiFillLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Flex } from '../../../components/primitives/Flex';
import { useAuth } from '../../../contexts/auth';
import { theme } from '../../../theme';
import { ChangeLoginMode } from './ChangeLoginMode';

type SignUpProps = { changeMode: () => void };
export const SignUp = ({ changeMode }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { createAccount } = useAuth();

  const handleAuthenticate = async () => {
    setError('');

    try {
      setLoading(true);
      await createAccount({ email, password, name });
    } catch (error) {
      setError(
        (error as AxiosError<{ message: string }>)?.response?.data?.message!
      );
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

      <Flex style={{ gap: 8 }}>
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
      {<Text color="red.500">{error}</Text>}

      <ChangeLoginMode mode={'signup'} onClick={changeMode} />
    </Box>
  );
};
