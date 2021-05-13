import { Center, Flex, IconButton, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { GrAdd } from 'react-icons/gr';
import { Auth } from 'src/service/axios';
import { addNewCard, updateDatabase } from 'src/utils/functions';
import { useDispatch } from 'react-redux';
import { setCards } from 'src/redux/cardsSlice';
import useCardState from 'src/hooks/useCardState';
import CardComponent from './CardComponent';
import UserContext from 'src/context/userContext';

const CardContainer = () => {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(true); // if the card has title
  const cards = useCardState();
  const loggedUser = useContext(UserContext);

  const getAllCards = async () => {
    const { cards: receivedCards } = await Auth.getCards();
    console.log(receivedCards);
    if (receivedCards) {
      dispatch(setCards(receivedCards));
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    console.log(cards);
    updateDatabase(cards, loggedUser);
  }, [cards]);

  return (
    <Flex py='10' px='5' w='85%' h='100%' d='flex' flexWrap='wrap'>
      {cards.map((card, i) => {
        return (
          <CardComponent
            key={i}
            receivedTitle={card.title}
            receivedTodos={card.todos}
            setValid={setValid}
            cards={cards}
          />
        );
      })}
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
          size='sm'
          _focus={{ boxShadow: 'none' }}
          mt='5'
          colorScheme='blue'
          fontSize='2xl'
          icon={<GrAdd />}
          aria-label='add new todo card'
          onClick={() => addNewCard(cards, valid, dispatch)}
        />
      </Center>
    </Flex>
  );
};

export default CardContainer;
