import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: (props:any) => ({
    body: {
      color: mode('#505153', '#ADCAD7')(props),
      bg: mode('#EBEBEB', '#1F1F1F')(props),
    },
  }),
};

const theme = extendTheme({
  styles,
});

export default theme;