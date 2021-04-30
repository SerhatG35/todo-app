import {
  Flex,
  Button,
  Center,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

const HomeLeft = () => {
  const history = useHistory();

  const fontColor = useColorModeValue("#EBEBEB", "#90CDF4");
  const hoverColor = useColorModeValue("#90CDF4", "#EBEBEB");

  return (
    <>
      <Flex flexDir="column" w="15%" h="100%" position="relative">
        <Center mt="2rem" d="flex" justifyContent="space-evenly">
          <Avatar size="xl" userSelect="none" />
        </Center>
        <Button
          size="sm"
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
    </>
  );
};

export default HomeLeft;
