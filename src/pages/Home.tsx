import { Flex } from '@chakra-ui/react';

import CardContainer from 'src/components/CardContainer';
import Profile from 'src/components/Profile';

const Home = () => {
  return (
    <Flex flexDir={['column', 'column', 'row']} h='100%' w='100%'>
      <Profile />
      <CardContainer />
    </Flex>
  );
};

export default Home;
