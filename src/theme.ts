import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: (props:any) => ({
    body: {
      color: mode('#505153', '#E9D6AF')(props),
      bg: mode('#D8ECFD', '#1F1F1F')(props),
    },
  }),
};

const theme = extendTheme({
  styles,
});

export default theme;