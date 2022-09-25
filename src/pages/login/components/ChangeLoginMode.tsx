import { Divider, Highlight, Text } from '@chakra-ui/react';
import { theme } from '../../../theme';
import { LoginMode } from './LoginContainer';

type ChangeLoginModeProps = { mode: LoginMode; onClick: () => void };
const stringsByLoginModeMap = {
  signin: {
    text: "Don't have a NextBank account? ",
    cta: 'Sign Up.',
  },
  signup: {
    text: 'Already have a NextBank account? ',
    cta: 'Sign In.',
  },
};
export const ChangeLoginMode = ({ mode, onClick }: ChangeLoginModeProps) => {
  const strings = stringsByLoginModeMap[mode];
  return (
    <>
      <Divider />
      <Text>
        <Highlight query={['NextBank']} styles={{ fontWeight: 'bold' }}>
          {strings.text}
        </Highlight>
        <a
          onClick={onClick}
          style={{
            cursor: 'pointer',
            color: theme.colors.primary,
            textDecoration: 'underline',
          }}
        >
          {strings.cta}
        </a>
      </Text>
    </>
  );
};
