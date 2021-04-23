import { IconButton, Input, Heading, Flex, Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import { AiOutlineCheck, AiFillEdit } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

type TodoProps = {
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const Todo = ({ setValid }: TodoProps) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [todos, setTodos] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const todoRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const newTodos: string[] = [...todos];
    if (todoRef.current && todoRef.current?.value !== "") {
      newTodos.push(todoRef.current?.value);
      setTodos(newTodos);
      todoRef.current.value = "";
    }
  };

  const deleteTodo = () => {};

  useEffect(() => {
    if (title) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [title]);

  return (
    <Flex
      p="5"
      w="sm"
      h="xs"
      rounded="3xl"
      ml="10"
      mb="10"
      flexDir="column"
      flexWrap="wrap"
      boxShadow="lg"
    >
      {title ? (
        <>
          <Heading textAlign="center">{title}</Heading>
          <Flex flexDir="column" flexWrap="wrap">
            {todos &&
              todos.map((todo, index) => {
                return (
                  <Flex
                    key={index + 100}
                    justify="space-between"
                    align="center"
                    _hover={{ bgColor: "#CBD5E0" }}
                    mt="5"
                  >
                    <Text>{todo}</Text>
                    <Flex align="center">
                      <IconButton
                        ml="2"
                        _focus={{ boxShadow: "none" }}
                        _hover={{ backgroundColor: "none", opacity: "0.4" }}
                        colorScheme="teal"
                        size="xs"
                        fontSize="2xl"
                        icon={<AiFillEdit />}
                        aria-label="edit todo"
                      />
                      <IconButton
                        ml="2"
                        _focus={{ boxShadow: "none" }}
                        _hover={{ backgroundColor: "none", opacity: "0.4" }}
                        colorScheme="red"
                        size="xs"
                        fontSize="2xl"
                        onClick={deleteTodo}
                        icon={<TiDeleteOutline />}
                        aria-label="delete todo"
                      />
                    </Flex>
                  </Flex>
                );
              })}
          </Flex>
        </>
      ) : (
        <Flex>
          <Input ref={titleRef} placeholder="Add Todo Title" />
          <IconButton
            colorScheme="green"
            ml="3"
            aria-label="add title"
            onClick={() => setTitle(titleRef.current?.value)}
            icon={<AiOutlineCheck />}
          />
        </Flex>
      )}

      {title && todos.length < 5 && (
        <Flex mt="3">
          <Input ref={todoRef} placeholder="Add Todo" />
          <IconButton
            colorScheme="green"
            onClick={addTodo}
            aria-label="add todo"
            icon={<AiOutlineCheck />}
            ml="3"
          />
        </Flex>
      )}
    </Flex>
  );
};

export default Todo;
