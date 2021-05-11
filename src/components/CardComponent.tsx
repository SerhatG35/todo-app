import {
  IconButton,
  Input,
  Heading,
  Flex,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { Card, TodoType } from 'global';

import { useContext, useEffect, useRef, useState } from 'react';

import { AiOutlineCheck, AiFillEdit } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import UserContext from 'src/context/userContext';
import { updateDatabase } from 'src/utils/databaseActions';

type TodoProps = {
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  cards: Card[];
  receivedCards?: Card;
};

const CardComponent = ({
  setValid,
  setCards,
  cards,
  receivedCards,
}: TodoProps) => {
  const loggedUser = useContext(UserContext);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const todoRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const newTodos: TodoType[] = [...todos];
    if (todoRef.current && todoRef.current?.value !== '') {
      const todoExists = todos.find(
        (todo) => todo.todo === todoRef.current?.value
      );
      if (!todoExists) {
        newTodos.push({ todo: todoRef.current?.value, isCompleted: false });
        setTodos(newTodos);
        todoRef.current.value = '';
      } else todoRef.current.value = '';
    }
  };

  const completeTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    completeTodo: TodoType
  ) => {
    const completedChange = [...todos];
    completedChange.forEach((elm) => {
      if (elm.todo === completeTodo.todo) {
        elm.isCompleted = e.target.checked;
      }
    });
    setTodos(completedChange);
  };

  const deleteTodo = (deleteTodo: string) => {
    setTodos(() => todos.filter((todo) => todo.todo !== deleteTodo));
  };

  useEffect(() => {
    if (title) setValid(true);
    else setValid(false);
  }, [title, setValid]);

  useEffect(() => {
    console.log(todos);
    if (todos.length > 0) {
      const newCardState = [...cards];
      newCardState.push({ title: title, todos: todos });
      setCards(newCardState);
      updateDatabase(cards, loggedUser);
    }
  }, [todos]);

  useEffect(() => {
    if (receivedCards) {
      setTitle(receivedCards.title);
      setTodos(receivedCards.todos);
    }
  }, []);

  return (
    <Flex
      p='5'
      w='sm'
      h='xs'
      rounded='3xl'
      ml='10'
      mb='10'
      flexDir='column'
      flexWrap='wrap'
      boxShadow='lg'
    >
      {title ? (
        <>
          <Heading textAlign='center'>{title}</Heading>
          <Flex flexDir='column' flexWrap='wrap'>
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
                        mr='2'
                        borderColor='darkgray'
                        colorScheme='orange'
                        onChange={(e) => completeTodo(e, todo)}
                      />
                      <Text>{todo.todo}</Text>
                    </Flex>
                    <Flex align='center'>
                      <IconButton
                        ml='2'
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none', opacity: '0.4' }}
                        colorScheme='teal'
                        size='xs'
                        fontSize='2xl'
                        icon={<AiFillEdit />}
                        aria-label='edit todo'
                      />
                      <IconButton
                        ml='2'
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none', opacity: '0.4' }}
                        colorScheme='red'
                        size='xs'
                        fontSize='2xl'
                        onClick={() => deleteTodo(todo.todo)}
                        icon={<TiDeleteOutline />}
                        aria-label='delete todo'
                      />
                    </Flex>
                  </Flex>
                );
              })}
          </Flex>
        </>
      ) : (
        <Flex>
          <Input ref={titleRef} placeholder='Add Todo Title' />
          <IconButton
            colorScheme='green'
            ml='3'
            aria-label='add title'
            onClick={() => setTitle(titleRef.current?.value)}
            icon={<AiOutlineCheck />}
          />
        </Flex>
      )}

      {title && todos.length < 5 && (
        <Flex mt='3'>
          <Input ref={todoRef} placeholder='Add Todo' />
          <IconButton
            colorScheme='green'
            onClick={addTodo}
            aria-label='add todo'
            icon={<AiOutlineCheck />}
            ml='3'
          />
        </Flex>
      )}
    </Flex>
  );
};

export default CardComponent;
