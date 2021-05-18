import { Center, IconButton, Heading, Flex, Skeleton } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

import { useCallback, useContext, useEffect, useState } from 'react';

import { Cards } from 'src/service/axios';
import CardComponent from './CardComponent';

import UserContext from 'src/context/userContext';
import { addNewCard, reOrderCards, setCards } from 'src/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { updateDatabase } from 'src/service/functions';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

const CardContainer = () => {
  const [valid, setValid] = useState(true); // if the card has title
  const [loading, setLoading] = useState(false);

  const loggedUser = useContext(UserContext);

  const cards = useAppSelector((state) => state.cardsSlice.userCards);
  const dispatch = useAppDispatch();

  const getAllCards = useCallback(async () => {
    setLoading(true);
    const { cards: receivedCards } = await Cards.GET();
    if (receivedCards) dispatch(setCards(receivedCards));
    setLoading(false);
  }, []);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (result.destination)
      items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reOrderCards(items));
  };

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);
  useEffect(() => {
    console.log(cards);
    updateDatabase(cards, loggedUser?.user);
  }, [cards]);

  return (
    <Center
      py='7'
      px='3'
      w={['100%', '100%', '85%']}
      h='100%'
      d='flex'
      flexWrap='wrap'
      overflowX='hidden'
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='cards' direction='horizontal'>
          {(provided) => (
            <Center
              flexWrap='wrap'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((card, i) => {
                return (
                  <Draggable
                    key={card._id}
                    draggableId={'card-' + card._id}
                    index={i}
                  >
                    {(provided) => (
                      <Skeleton
                        startColor='#ADCAD7'
                        endColor='#EBEBEB'
                        rounded='3xl'
                        isLoaded={!loading}
                        w={['100%', '43%', '96']}
                        m={['3', '3', '5']}
                        h={['xs', 'md', 'xs']}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <CardComponent
                          cardDragHandle={provided.dragHandleProps}
                          receivedTitle={card.title}
                          receivedTodos={card.todos}
                          setValid={setValid}
                        />
                      </Skeleton>
                    )}
                  </Draggable>
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
          )}
        </Droppable>
      </DragDropContext>
    </Center>
  );
};

export default CardContainer;
