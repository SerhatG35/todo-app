import {
  Flex,
  Button,
  Center,
  Avatar,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import UserContext from 'src/context/userContext';
import Menu from './Menu';
import OrderButton from './OrderButton';

const Profile = () => {
  const loggedUser = useContext(UserContext);
  const history = useHistory();
  const fontColor = useColorModeValue('#EBEBEB', '#ADCAD7');
  const hoverColor = useColorModeValue('#ADCAD7', '#EBEBEB');
  const profileBgColor = useColorModeValue('#F2F2F2', '#212322');

  const logout = () => {
    localStorage.removeItem('login');
    window.dispatchEvent(new Event('storage'));
    history.push('/');
  };

  return (
    <Flex
      flexDir={['column']}
      w={['100%', '100%', '15%']}
      h={['20%', '20%', '100%']}
      position='relative'
      boxShadow='lg'
      bg={profileBgColor}
    >
      <Center
        mt={['0.5em', '0.5em', '2rem']}
        d='flex'
        justifyContent='space-evenly'
        flexDir='column'
      >
        <Avatar size='lg' userSelect='none' />
        <Heading
          textAlign='center'
          fontSize={['xl', '2xl', '3xl']}
          data-testid='loggedin-username'
        >
          {loggedUser?.user?.userName}
        </Heading>
        <OrderButton />
      </Center>
      <Menu />
      <Button
        sx={{
          '@media screen and (max-width: 768px)': {
            display: 'none',
          },
        }}
        size='xs'
        zIndex='10'
        fontSize='sm'
        position='absolute'
        left={['3', '5', '5']}
        bottom={['3', '5', '5']}
        top={['3', '5', 'unset']}
        bgColor='#505153'
        fontWeight='500'
        rounded='xl'
        color={fontColor}
        _hover={{ color: hoverColor }}
        onClick={logout}
        data-testid='button-logout'
      >
        Logout
      </Button>
    </Flex>
  );
};

export default Profile;
