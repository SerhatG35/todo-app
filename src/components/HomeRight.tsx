import { Center, Flex, IconButton, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";

import Todo from "./Todo";

import { GrAdd } from "react-icons/gr";

const HomeRight = () => {
  const toast = useToast();
  const [totalTodos, setTotalTodos] = useState<JSX.Element[]>([]);
  const [valid, setValid] = useState(true);

  const addNewTodo = () => {
    const currentTodos: JSX.Element[] = [...totalTodos];
    if (valid) {
      currentTodos.unshift(
        <Todo setValid={setValid} key={currentTodos.length} />
      );
      setTotalTodos(currentTodos);
    } else {
      toast({
        title: "Please fill the title",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex py="10" px="5" w="85%" h="100%" d="flex" flexWrap="wrap">
      {totalTodos}
      <Center
        d="flex"
        flexDir="column"
        boxShadow="lg"
        w="sm"
        h="xs"
        rounded="3xl"
        ml="10"
        mb="10"
      >
        <Heading size="md" userSelect="none">
          Add New Todo Card
        </Heading>
        <IconButton
          _focus={{ boxShadow: "none" }}
          mt="5"
          colorScheme="blue"
          fontSize="3xl"
          icon={<GrAdd />}
          aria-label="add new todo card"
          onClick={addNewTodo}
        />
      </Center>
    </Flex>
  );
};

export default HomeRight;
