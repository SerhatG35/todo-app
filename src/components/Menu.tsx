import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

const Menu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('login');
    window.dispatchEvent(new Event('storage'));
    history.push('/');
  };

  return (
    <ChakraMenu isLazy={true} closeOnSelect={false}>
      <MenuButton
        sx={{
          '@media screen and (min-width: 768px)': {
            display: 'none',
          },
        }}
        position='absolute'
        top='4'
        right='4'
        size='sm'
        as={IconButton}
        aria-label='menu button'
        fontSize='x-large'
        icon={<AiOutlineUnorderedList />}
        _focus={{ boxShadow: 'none' }}
      />
      <MenuList>
        <MenuItem
          textAlign='center'
          aria-label='color mode'
          icon={
            colorMode === 'light' ? (
              <FaSun size='16px' />
            ) : (
              <FaMoon size='16px' />
            )
          }
          onClick={toggleColorMode}
        >
          {colorMode.toUpperCase() + ' MODE'}
        </MenuItem>
        <MenuItem
          textAlign='center'
          aria-label='logout'
          icon={<IoLogOutOutline size='22px' />}
          onClick={logout}
        >
          LOGOUT
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};

export default Menu;
