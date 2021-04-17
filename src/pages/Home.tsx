import {
  Avatar,
  Button,
  Center,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const fontColor = useColorModeValue("#D8ECFD", "#E9D6AF");
  const hoverColor = useColorModeValue("#E9D6AF", "#D8ECFD");
  return (
    <>
      <Flex flexDir="column" w="20%" h="100%" position="relative">
        <Center mt="2rem" d="flex" justifyContent="space-evenly">
          <Avatar size="xl" userSelect="none" />
          <Heading>{localStorage.getItem("username")}</Heading>
        </Center>
        <Button
          position="absolute"
          left="5"
          bottom="5"
          bgColor="#505153"
          fontWeight="500"
          rounded="xl"
          color={fontColor}
          _hover={{ color: hoverColor }}
          onClick={() => {
            localStorage.removeItem("login");
            localStorage.removeItem("username");
            history.push("/");
          }}
        >
          Logout
        </Button>
      </Flex>
      <Center w="80%" h="100%"></Center>
    </>
  );
};

export default Home;
