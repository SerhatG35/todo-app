import {
  IconButton,
  Input,
  Heading,
  Flex,
  Text,
  Checkbox,
  Center,
} from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { BsTrash } from 'react-icons/bs';

import { Card, TodoType } from 'global';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  addTitleCard,
  addTodo,
  completeTodo,
  deleteCard,
  deleteTodo,
  updateCards,
} from 'src/utils/functions';
import TodoEdit from './TodoEdit';

type TodoProps = {
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  receivedTitle?: string | undefined;
  receivedId: string;
  receivedTodos?: TodoType[];
  cards: Card[];
};

const CardComponent = ({
  setValid,
  receivedTitle,
  receivedTodos,
  receivedId,
  cards,
}: TodoProps) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const todoRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    updateCards(title, todos, dispatch, cards);
  }, [todos, title]);

  useEffect(() => {
    if (receivedTitle && receivedTodos) {
      setTitle(receivedTitle);
      setTodos(receivedTodos);
    }
  }, []);

  useEffect(() => {
    if (title) setValid(true);
    else setValid(false);
  }, [title, setValid]);

  return (
    <Flex
      p="5"
      w={['100%', '40%', '96']}
      h="xs"
      rounded="3xl"
      m={['3', '3', '5']}
      flexDir="column"
      flexWrap="wrap"
      boxShadow="lg"
      position="relative"
    >
      {title ? (
        <>
          <Heading fontSize={['md', 'xl', '3xl']} textAlign="center">
            {title}
          </Heading>
          <Flex fontSize={['xs', 'sm', 'lg']} flexDir="column" flexWrap="wrap">
            {todos &&
              todos.map((todo, index) => {
                return (
                  <Flex
                    key={index + 100}
                    justify="space-between"
                    align="center"
                    mt="5"
                  >
                    <Flex align="center">
                      <Checkbox
                        isChecked={todo.isCompleted}
                        mr="2"
                        borderColor="darkgray"
                        colorScheme="orange"
                        onChange={(e) => completeTodo(e, todo, todos, setTodos)}
                      />
                      <Text
                        textDecoration={
                          todo.isCompleted ? 'line-through' : 'none'
                        }
                      >
                        {todo.todo}
                      </Text>
                    </Flex>
                    <Center>
                      <TodoEdit
                        todo={todo.todo}
                        todos={todos}
                        index={index}
                        setTodos={setTodos}
                      />
                      <IconButton
                        variant="outline"
                        ml="2"
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none', opacity: '0.4' }}
                        colorScheme="red"
                        size="xs"
                        fontSize="2xl"
                        onClick={() => deleteTodo(todo.todo, setTodos, todos)}
                        icon={<TiDeleteOutline />}
                        aria-label="delete todo"
                      />
                    </Center>
                  </Flex>
                );
              })}
          </Flex>
          <IconButton
            variant="outline"
            _focus={{ boxShadow: 'none' }}
            colorScheme="red"
            fontSize="xl"
            size="xs"
            icon={<BsTrash />}
            position="absolute"
            top="2"
            right="2"
            aria-label="delete card"
            onClick={() => deleteCard(receivedId, dispatch)}
          />
        </>
      ) : (
        <Flex>
          <Input size="sm" ref={titleRef} placeholder="Add Todo Title" />
          <IconButton
            size="sm"
            colorScheme="green"
            ml="3"
            aria-label="add title"
            onClick={() => {
              addTitleCard(cards, titleRef, setTitle);
            }}
            icon={<AiOutlineCheck />}
          />
        </Flex>
      )}

      {title && todos.length < 5 && (
        <Center mt="3">
          <Input size="sm" ref={todoRef} placeholder="Add Todo" />
          <IconButton
            _focus={{ boxShadow: 'none' }}
            fontSize="xl"
            size="sm"
            colorScheme="green"
            onClick={() => addTodo(todos, todoRef, setTodos)}
            aria-label="add todo"
            icon={<AiOutlineCheck />}
            ml="3"
          />
        </Center>
      )}
    </Flex>
  );
};

export default CardComponent;
