import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
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
  const { authenticate } = useAuth();
  const strings = stringsMapByMode[mode];

  const handleChangeLoginMode = () => {
    if (mode === 'signin') {
      setMode('signup');
      return;
    }
    setMode('signin');
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
          <Input type="email" placeholder="Enter Your Email" fontSize="md" />
        </InputGroup>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <AiFillLock />
          </InputLeftElement>
          <Input
            type="password"
            placeholder="Enter Your Password"
            fontSize="md"
          />
        </InputGroup>

        <Button
          size="lg"
          color={theme.colors.primary}
          width="full"
          onClick={authenticate}
        >
          {strings.title}
        </Button>
      </Flex>

      <ChangeLoginMode mode={mode} onClick={handleChangeLoginMode} />
    </Flex>
  );
};
