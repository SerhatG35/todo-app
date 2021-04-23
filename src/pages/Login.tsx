import { useState } from "react";
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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "src/constants/YupSchema";

import { BiShow, BiHide, BiUser, BiLock } from "react-icons/bi";

import axios from "axios";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const history = useHistory();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (values: LoginFormInputs) => {
    // const request = await axios.post(
    //   `http://localhost:4000/user/${values.username}`,
    //   {
    //     auth: {
    //       username: values.username,
    //       password: values.password,
    //     },
    //   }
    // );
    const response = await axios.get(
      `http://localhost:4000/user/${values.username}`
    );
    console.log(response.status);
    if (response.status === 200) {
      localStorage.setItem("login", JSON.stringify(true));
      history.push("/dashboard");
      toast({
        title: "Success",
        description: `Welcome ${values.username}`,
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

  const backgroundColor = useColorModeValue("#505153", "#E9D6AF");

  return (
    <Center w="25%" d="flex" h="40%" flexDir="column">
      <Heading mb="2rem" fontFamily="Poppins">
        Login
      </Heading>
      <Center
        flexDir="column"
        justifyContent="space-around"
        rounded="3xl"
        boxShadow="xl"
        p="1.5em 3em"
        w="100%"
        h="100%"
      >
        <FormControl
          isInvalid={!!errors?.username?.message}
          errortext={errors?.username?.message}
          isRequired
        >
          <InputGroup size="md">
            <InputLeftElement fontSize="xl" children={<BiUser />} />
            <Input
              {...register("username")}
              name="username"
              type="username"
              fontWeight="300"
              placeholder="Enter Username"
              rounded="xl"
              borderColor={backgroundColor}
              boxShadow="sm"
            />
          </InputGroup>
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors?.password?.message}
          errortext={errors?.password?.message}
          isRequired
        >
          <InputGroup size="md">
            <InputLeftElement fontSize="xl" children={<BiLock />} />
            <Input
              {...register("password")}
              pr="3.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              borderColor={backgroundColor}
              colorScheme="purple"
              fontWeight="300"
              rounded="xl"
              boxShadow="sm"
            />
            <InputRightElement width="3.5rem">
              <Button
                size="xs"
                fontSize="xl"
                onClick={() => setShow(!show)}
                _focus={{
                  boxShadow: "none",
                }}
                bgColor="transparent"
              >
                {show ? <BiHide /> : <BiShow />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          w="100%"
          size="md"
          fontSize="md"
          aria-label="login"
          _focus={{
            boxShadow: "none",
          }}
          onClick={handleSubmit(onSubmit)}
          fontWeight="500"
          colorScheme="green"
          rounded="xl"
          disabled={!!errors.username || !!errors.password}
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
