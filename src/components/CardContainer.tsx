import { Center, Flex, IconButton, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { GrAdd } from 'react-icons/gr';
import { Card } from 'global';
import { Auth } from 'src/service/axios';
import {
  addNewCard,
  databaseCardsToState,
  updateDatabase,
} from 'src/utils/databaseActions';
import UserContext from 'src/context/userContext';

const CardContainer = () => {
  const loggedUser = useContext(UserContext);
  const [cardJsx, setCardJsx] = useState<JSX.Element[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [receivedUserCards, setReceivedUserCards] = useState<Card[]>([]);
  const [valid, setValid] = useState(true); // if the card has title

  const getAllCards = async () => {
    const { cards: receivedCards } = await Auth.getCards();
    if (receivedCards) setReceivedUserCards(receivedCards);
  };

  useEffect(() => {
    // if (cards[0]?.title) updateDatabase(cards, loggedUser);
    console.log(cards);
  }, [cards]);

  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    databaseCardsToState({
      cardJsx,
      receivedUserCards,
      cards,
      setCards,
      setValid,
      setCardJsx,
    });
  }, [receivedUserCards]);

  return (
    <Flex py='10' px='5' w='85%' h='100%' d='flex' flexWrap='wrap'>
      {cardJsx}
      <Center
        d='flex'
        flexDir='column'
        boxShadow='lg'
        w='sm'
        h='xs'
        rounded='3xl'
        ml='10'
        mb='10'
      >
        <Heading textAlign='center' size='md' userSelect='none'>
          Add New Todo Card
        </Heading>
        <IconButton
          _focus={{ boxShadow: 'none' }}
          mt='5'
          colorScheme='blue'
          fontSize='3xl'
          icon={<GrAdd />}
          aria-label='add new todo card'
          onClick={() =>
            addNewCard({
              valid,
              cardJsx,
              cards,
              setCards,
              setValid,
              setCardJsx,
            })
          }
        />
      </Center>
    </Flex>
  );
};

export default CardContainer;
