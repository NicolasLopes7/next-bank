import { Box, BoxProps } from '@chakra-ui/react';
import { CSSProperties, PropsWithChildren } from 'react';

type FlexProps = PropsWithChildren<{ style?: CSSProperties }> & BoxProps;
export const Flex = ({ style, children, ...props }: FlexProps) => {
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
      {...props}
    >
      {children}
    </Box>
  );
};
