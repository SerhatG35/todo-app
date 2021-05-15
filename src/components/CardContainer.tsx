import { Center, IconButton, Heading } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

import { useCallback, useContext, useEffect, useState } from 'react';

import { Cards } from 'src/service/axios';
import CardComponent from './CardComponent';

import UserContext from 'src/context/userContext';
import { addNewCard, setCards } from 'src/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { updateDatabase } from 'src/service/functions';

const CardContainer = () => {
  const [valid, setValid] = useState(true); // if the card has title

  const loggedUser = useContext(UserContext);

  const cards = useAppSelector((state) => state.cardsSlice.userCards);
  const dispatch = useAppDispatch();

  const getAllCards = useCallback(async () => {
    const { cards: receivedCards } = await Cards.GET();
    if (receivedCards) dispatch(setCards(receivedCards));
  }, []);

  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    console.log(cards);
    updateDatabase(cards, loggedUser?.user);
  }, [cards]);

  return (
    <Center
      py='7'
      px='5'
      w={['100%', '100%', '85%']}
      h='100%'
      d='flex'
      flexWrap='wrap'
    >
      {cards.map((card, i) => {
        return (
          <CardComponent
            key={i}
            receivedTitle={card.title}
            receivedTodos={card.todos}
            receivedId={card._id || ''}
            setValid={setValid}
          />
        );
      })}
      <Center
        d='flex'
        flexDir='column'
        boxShadow='lg'
        w={['100%', '40%', '96']}
        h='xs'
        m={['3', '3', '5']}
        rounded='3xl'
      >
        <Heading textAlign='center' size='md' userSelect='none'>
          Add New Todo Card
        </Heading>
        <IconButton
          size='xs'
          _focus={{ boxShadow: 'none' }}
          mt='5'
          colorScheme='blue'
          fontSize='xl'
          icon={<GrAdd />}
          aria-label='add new todo card'
          onClick={() => {
            dispatch(addNewCard(cards, valid));
          }}
        />
      </Center>
    </Center>
  );
};

export default CardContainer;
