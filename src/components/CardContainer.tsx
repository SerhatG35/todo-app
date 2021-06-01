import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import {
  Center,
  IconButton,
  Heading,
  Skeleton,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';
import { MdDragHandle } from 'react-icons/md';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { CgArrowDownO } from 'react-icons/cg';

import { Cards } from 'src/service/axios';
import { updateDatabase } from 'src/service/functions';
import CardComponent from './CardComponent';

import UserContext from 'src/context/userContext';
import { addNewCard, reOrderCards, setCards } from 'src/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';

const CardContainer = () => {
  const [valid, setValid] = useState(true); // if the card has title
  const [loading, setLoading] = useState(false);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const handleColor = useColorModeValue('#505153', '#EBEBEB');

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
                    key={card._id || i}
                    draggableId={card._id ? 'card-' + card._id : 'card-' + i}
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
                        position='relative'
                        key={card._id || i}
                      >
                        <CardComponent
                          category={card.category}
                          key={card._id || i}
                          receivedTitle={card.title}
                          receivedTodos={card.todos}
                          setValid={setValid}
                        />
                        <IconButton
                          zIndex='1000'
                          variant='outline'
                          position='absolute'
                          color={handleColor}
                          fontSize='xl'
                          size='xs'
                          top='1'
                          left='1'
                          aria-label='card handle'
                          {...provided.dragHandleProps}
                          icon={<MdDragHandle />}
                          _focus={{ boxShadow: 'none' }}
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
                w={['100%', '43%', '96']}
                h={['xs', 'md', 'xs']}
                m={['3', '3', '5']}
                rounded='3xl'
              >
                <Heading textAlign='center' size='md' userSelect='none'>
                  Add New Todo Card
                </Heading>
                <Select
                  data-testid='select-cardcategory'
                  ref={categoryRef}
                  color='#000'
                  bg='#3182CE'
                  mt='5'
                  w='%60'
                  textAlign='center'
                  icon={<CgArrowDownO />}
                  _focus={{ boxShadow: 'none' }}
                  name='Select Category'
                >
                  <option defaultChecked hidden defaultValue='' value=''>
                    Select Category
                  </option>
                  <option value='blue 1 normal'>Normal</option>
                  <option value='orange 2 important'>Important</option>
                  <option value='red 3 urgent'>Urgent</option>
                </Select>
                <IconButton
                  data-testid='button-newcard'
                  size='xs'
                  _focus={{ boxShadow: 'none' }}
                  mt='5'
                  colorScheme='blue'
                  fontSize='xl'
                  icon={<GrAdd />}
                  aria-label='add new todo card'
                  onClick={() =>
                    dispatch(addNewCard(cards, valid, categoryRef))
                  }
                />
              </Center>
              {provided.placeholder}
            </Center>
          )}
        </Droppable>
      </DragDropContext>
    </Center>
  );
};

export default CardContainer;
