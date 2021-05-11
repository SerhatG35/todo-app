import {
  Flex,
  Button,
  Center,
  Avatar,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();

  const fontColor = useColorModeValue('#EBEBEB', '#ADCAD7');
  const hoverColor = useColorModeValue('#ADCAD7', '#EBEBEB');

  return (
    <>
      <Flex flexDir='column' w='15%' h='100%' position='relative'>
        <Center
          mt='2rem'
          d='flex'
          justifyContent='space-evenly'
          flexDir='column'
        >
          <Avatar size='xl' userSelect='none' />
          <Heading>
            {JSON.parse(localStorage.getItem('login') || '{}').userName}
          </Heading>
        </Center>
        <Button
          size='sm'
          position='absolute'
          left='5'
          bottom='5'
          bgColor='#505153'
          fontWeight='500'
          rounded='xl'
          color={fontColor}
          _hover={{ color: hoverColor }}
          onClick={() => {
            localStorage.removeItem('login');
            window.dispatchEvent(new Event('storage'));
            history.push('/');
          }}
        >
          Logout
        </Button>
      </Flex>
    </>
  );
};

export default Profile;
