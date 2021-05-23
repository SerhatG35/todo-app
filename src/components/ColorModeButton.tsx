import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const fontColor = useColorModeValue('#EBEBEB', '#ADCAD7');
  const hoverColor = useColorModeValue('#ADCAD7', '#EBEBEB');

  return (
    <IconButton
      sx={{
        '@media screen and (max-width: 768px)': {
          display: 'none',
        },
      }}
      zIndex='1000'
      aria-label='color mode'
      position='absolute'
      right='5'
      top='5'
      size='xs'
      rounded='xl'
      bgColor='#505153'
      color={fontColor}
      fontSize='md'
      _hover={{
        color: hoverColor,
      }}
      _focus={{
        boxShadow: 'none',
      }}
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? <FaMoon /> : <FaSun />}
    </IconButton>
  );
};

export default ColorModeButton;
