import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { theme } from '../theme';

export const LoginLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        backgroundColor: theme.colors.background,
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
};
