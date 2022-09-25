import { Box } from '@chakra-ui/react';
import { CSSProperties, PropsWithChildren } from 'react';

type FlexProps = PropsWithChildren<{ style?: CSSProperties }>;
export const Flex = ({ style, children }: FlexProps) => {
  return (
    <Box
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        ...style,
      }}
    >
      {children}
    </Box>
  );
};
