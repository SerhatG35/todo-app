import { Center, IconButton, Heading } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

import { useContext, useEffect, useState } from 'react';

import { Auth } from 'src/service/axios';
import { addNewCard, updateDatabase } from 'src/utils/functions';
import CardComponent from './CardComponent';

import UserContext from 'src/context/userContext';
import { useDispatch } from 'react-redux';
import { setCards } from 'src/redux/cardsSlice';
import useCardState from 'src/hooks/useCardState';

const CardContainer = () => {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(true); // if the card has title
  const cards = useCardState();
  const loggedUser = useContext(UserContext);

  const getAllCards = async () => {
    const { cards: receivedCards } = await Auth.getCards();
    if (receivedCards) {
      dispatch(setCards(receivedCards));
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);

  useEffect(() => {
    // updateDatabase(cards, loggedUser);
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
            setValid={setValid}
            cards={cards}
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
          onClick={() => addNewCard(cards, valid, dispatch)}
        />
      </Center>
    </Center>
  );
};

export default CardContainer;
