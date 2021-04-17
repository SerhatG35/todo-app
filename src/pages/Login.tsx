import { useRef, useState } from "react";
import { useHistory, Link as ReactLink } from "react-router-dom";

import {
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Heading,
  useToast,
  InputLeftElement,
  Text,
  Link,
} from "@chakra-ui/react";

import { BiShow, BiHide, BiUser, BiLock } from "react-icons/bi";

const Login = () => {
  const history = useHistory();
  const toast = useToast();

  const [show, setShow] = useState(false);

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClick = () => setShow(!show);

  const handleLogin = () => {
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    if (userName === "serhat" && password === "123serhat") {
      localStorage.setItem("username", userName);
      localStorage.setItem("login", JSON.stringify(true));
      history.push("/dashboard");
      toast({
        title: "Success",
        description: `Welcome ${userName}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      localStorage.setItem("login", JSON.stringify(false));
      toast({
        title: "Failed",
        description: "Failed to signin. Check your username and password",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const backgroundColor = useColorModeValue("#505153", "#E9D6AF");

  return (
    <Center w="25%" d="flex" h="40%" flexDir="column">
      <Heading mb="2rem" fontFamily="Poppins">
        Login
      </Heading>
      <Center
        flexDir="column"
        justifyContent="space-around"
        border="1px solid"
        rounded="3xl"
        boxShadow="md"
        p="1.5em 3em"
        w="100%"
        h="100%"
      >
        <InputGroup size="md">
          <InputLeftElement fontSize="xl" children={<BiUser />} />
          <Input
            ref={userNameRef}
            fontWeight="300"
            placeholder="Enter Username"
            onKeyPress={handleKeyPress}
            rounded="xl"
            borderColor={backgroundColor}
            boxShadow="sm"
          />
        </InputGroup>
        <InputGroup size="md">
          <InputLeftElement fontSize="xl" children={<BiLock />} />
          <Input
            ref={passwordRef}
            pr="3.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            borderColor={backgroundColor}
            colorScheme="purple"
            fontWeight="300"
            onKeyPress={handleKeyPress}
            rounded="xl"
            boxShadow="sm"
          />
          <InputRightElement width="3.5rem">
            <Button
              size="xs"
              fontSize="xl"
              onClick={handleClick}
              _focus={{
                boxShadow: "none",
              }}
              bgColor="transparent"
            >
              {show ? <BiHide /> : <BiShow />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          w="100%"
          size="md"
          fontSize="md"
          aria-label="login"
          _focus={{
            boxShadow: "none",
          }}
          onClick={handleLogin}
          fontWeight="500"
          colorScheme="green"
          rounded="xl"
        >
          Sign in
        </Button>
        <Center mt="1rem">
          <Text mr="0.5rem">Not a member ?</Text>
          <Link
            as={ReactLink}
            to="/signup"
            _focus={{
              boxShadow: "none",
            }}
            color="purple"
          >
            Sign Up
          </Link>
        </Center>
      </Center>
    </Center>
  );
};

export default Login;
