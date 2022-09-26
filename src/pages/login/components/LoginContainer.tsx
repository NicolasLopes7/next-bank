import { useState } from 'react';
import { Flex } from '../../../components/primitives/Flex';
import { theme } from '../../../theme';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export type LoginMode = 'signin' | 'signup';

export const LoginContainer = () => {
  const [mode, setMode] = useState<LoginMode>('signin');

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
      {mode === 'signin' ? (
        <SignIn changeMode={() => setMode('signup')} />
      ) : (
        <SignUp changeMode={() => setMode('signin')} />
      )}
    </Flex>
  );
};
