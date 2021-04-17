import {
  Center,
  Input,
  Button,
  FormControl,
  FormLabel,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();

  const backgroundColor = useColorModeValue("#505153", "#E9D6AF");
  const fontColor = useColorModeValue("#D8ECFD", "#E9D6AF");
  const hoverColor = useColorModeValue("#E9D6AF", "#D8ECFD");

  const completeSignUp = () => {
    console.log("signup complete");
  };

  return (
    <Center d="flex" w="100%" h="100%" flexDir="column">
      <Heading mb=".75em">Sign Up</Heading>
      <Center
        w="25%"
        h="60%"
        d="flex"
        flexDir="column"
        justifyContent="space-between"
        border="1px solid"
        p="1.5em 2em"
        rounded="3xl"
      >
        <FormControl id="first-name">
          <FormLabel>First Name</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="name"
            rounded="xl"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="email"
            rounded="xl"
          />
        </FormControl>
        <FormControl id="user-name" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="user-name"
            rounded="xl"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="password"
            rounded="xl"
          />
        </FormControl>
        <FormControl id="password-confirm" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="password"
            rounded="xl"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          alignSelf="flex-end"
          rounded="xl"
          fontWeight="300"
          onClick={completeSignUp}
          _focus={{ boxShadow: "none" }}
        >
          Complete
        </Button>
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
        onClick={() => history.push("/")}
        _focus={{ boxShadow: "none" }}
      >
        Back
      </Button>
    </Center>
  );
};

export default SignUp;
