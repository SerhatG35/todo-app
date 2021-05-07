import { Center, Flex, IconButton, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Todo from "./Todo";

import { GrAdd } from "react-icons/gr";
import { Card } from "global";
import axios from "axios";
import { useContext } from "react";
import UserContext from "src/context/userContext";

const HomeRight = () => {
  const loggedUser = useContext(UserContext);
  const toast = useToast();
  const [cardJsx, setCardJsx] = useState<JSX.Element[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [valid, setValid] = useState(true); // if the card has title

  const addNewTodo = () => {
    const updateCards: JSX.Element[] = [...cardJsx];
    if (valid) {
      updateCards.unshift(
        <Todo
          cards={cards}
          setCards={setCards}
          setValid={setValid}
          key={updateCards.length}
        />
      );
      setCardJsx(updateCards);
    } else {
      toast({
        title: "Please fill the title",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const updateDatabase = async () => {
    const { data } = await axios.post(
      "http://localhost:4000/todos",
      {
        id: loggedUser?.user?.id,
        username: loggedUser?.user?.userName,
        cards: cards,
      },
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("login") || "{}").token,
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {
    cards.forEach((card) => {
      if (card.title) return updateDatabase();
    });
    console.log(cards);
  }, [cards]);

  return (
    <Flex py="10" px="5" w="85%" h="100%" d="flex" flexWrap="wrap">
      {cardJsx}
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
        <Heading textAlign="center" size="md" userSelect="none">
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
