import {
  IconButton,
  Input,
  Flex,
  Checkbox,
  Center,
  Editable,
  EditablePreview,
  EditableInput,
  Tag,
  TagLabel,
  TagRightIcon,
} from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { BsTrash, BsCardChecklist } from 'react-icons/bs';

import { TodoType } from 'global';

import { useEffect, useRef, useState } from 'react';

import { changeTitle, deleteCard, updateCards } from 'src/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import {
  addTodo,
  completeTodo,
  addTitleCard,
  changeTodo,
  deleteTodo,
} from 'src/service/functions';

type TodoProps = {
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  receivedTitle?: string | undefined;
  receivedTodos?: TodoType[];
  category: string;
};

const CardComponent = ({
  setValid,
  receivedTitle,
  receivedTodos,
  category,
}: TodoProps) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const todoRef = useRef<HTMLInputElement>(null);

  const cards = useAppSelector((state) => state.cardsSlice.userCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateCards(cards, title, todos));
  }, [todos, title]);

  useEffect(() => {
    if (receivedTitle && receivedTodos) {
      setTitle(receivedTitle);
      setTodos(receivedTodos);
    }
  }, [receivedTitle, receivedTodos]);

  useEffect(() => {
    if (title) setValid(true);
    else setValid(false);
  }, [title, setValid]);

  return (
    <Flex
      p='5'
      pt='1'
      w='100%'
      h={['xs', 'md', 'xs']}
      rounded='3xl'
      flexDir='column'
      flexWrap='wrap'
      boxShadow='lg'
      position='relative'
      overflow='hidden'
    >
      {title ? (
        <>
          <Editable
            w='90%'
            h='10'
            alignSelf='center'
            fontSize={['md', 'xl', '2xl']}
            textAlign='center'
            defaultValue={title}
          >
            <EditablePreview p='0' overflowWrap='anywhere' />
            <EditableInput
              onBlur={(e) =>
                dispatch(changeTitle(cards, title, e.target.value))
              }
              onKeyDown={(e) => {
                if (e.key === ('Enter' || 'NumpadEnter')) {
                  dispatch(changeTitle(cards, title, e.currentTarget.value));
                }
              }}
              placeholder='Add Todo Title'
            />
          </Editable>
          <Flex fontSize={['xs', 'sm', 'lg']} flexDir='column' flexWrap='wrap'>
            {todos &&
              todos.map((todo, index) => {
                return (
                  <Flex
                    key={index + 100}
                    justify='space-between'
                    align='center'
                    mt='5'
                  >
                    <Flex align='center'>
                      <Checkbox
                        isChecked={todo.isCompleted}
                        mr='2'
                        borderColor='darkgray'
                        colorScheme='orange'
                        onChange={(e) => completeTodo(e, todo, todos, setTodos)}
                      />
                      <Editable defaultValue={todo.todo}>
                        <EditablePreview
                          overflowWrap='anywhere'
                          fontSize={['sm']}
                          textDecoration={
                            todo.isCompleted ? 'line-through' : 'none'
                          }
                        />
                        <EditableInput
                          onBlur={(e) =>
                            changeTodo(todos, index, setTodos, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === ('Enter' || 'NumpadEnter')) {
                              changeTodo(
                                todos,
                                index,
                                setTodos,
                                e.currentTarget.value
                              );
                            }
                          }}
                          placeholder='Add Todo Title'
                        />
                      </Editable>
                    </Flex>
                    <Center>
                      <IconButton
                        variant='outline'
                        ml='2'
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none', opacity: '0.4' }}
                        colorScheme='red'
                        size='xs'
                        fontSize='2xl'
                        onClick={() => deleteTodo(todo.todo, setTodos, todos)}
                        icon={<TiDeleteOutline />}
                        aria-label='delete todo'
                      />
                    </Center>
                  </Flex>
                );
              })}
          </Flex>
          <IconButton
            variant='outline'
            _focus={{ boxShadow: 'none' }}
            colorScheme='red'
            fontSize='xl'
            size='xs'
            icon={<BsTrash />}
            position='absolute'
            top='2'
            right='2'
            aria-label='delete card'
            onClick={() => dispatch(deleteCard(title))}
          />

          <Tag
            letterSpacing='widest'
            userSelect='none'
            position='absolute'
            w="full"
            pl="5"
            rounded="none"
            left='0'
            bottom='0'
            colorScheme={category.split(' ')[0]}
            size='sm'
            fontSize='xx-small'
          >
            <TagLabel>{category.split(' ')[2].toUpperCase()}</TagLabel>
            <TagRightIcon fontSize='lg' as={BsCardChecklist} />
          </Tag>
        </>
      ) : (
        <Flex>
          <Input
            onKeyDown={(e) => {
              if (e.key === ('Enter' || 'NumpadEnter'))
                addTitleCard(cards, titleRef, setTitle);
            }}
            size='sm'
            ref={titleRef}
            placeholder='Add Todo Title'
          />
          <IconButton
            size='sm'
            colorScheme='green'
            ml='3'
            aria-label='add title'
            onClick={() => {
              addTitleCard(cards, titleRef, setTitle);
            }}
            icon={<AiOutlineCheck />}
          />
        </Flex>
      )}

      {title && todos.length < 5 && (
        <Center mt='3'>
          <Input
            size='sm'
            onKeyDown={(e) => {
              if (e.key === ('Enter' || 'NumpadEnter'))
                addTodo(todos, todoRef, setTodos);
            }}
            ref={todoRef}
            placeholder='Add Todo'
          />
          <IconButton
            _focus={{ boxShadow: 'none' }}
            fontSize='xl'
            size='sm'
            colorScheme='green'
            onClick={() => addTodo(todos, todoRef, setTodos)}
            aria-label='add todo'
            icon={<AiOutlineCheck />}
            ml='3'
          />
        </Center>
      )}
    </Flex>
  );
};

export default CardComponent;
