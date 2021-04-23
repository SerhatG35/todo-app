import {
  Center,
  Input,
  Button,
  FormControl,
  FormLabel,
  useColorModeValue,
  Heading,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signUpSchema } from "src/constants/YupSchema";

type SignUpFormInputs = {
  firstname: string;
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
};

const SignUp = () => {
  const history = useHistory();
  const toast = useToast();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpSchema),
  });

  const backgroundColor = useColorModeValue("#505153", "#E9D6AF");
  const fontColor = useColorModeValue("#EBEBEB", "#E9D6AF");
  const hoverColor = useColorModeValue("#E9D6AF", "#EBEBEB");

  const onSubmit = async (values: SignUpFormInputs) => {
    console.log(values);
    axios.post(" http://localhost:4000/user", {
      firstname: values.firstname,
      username: values.username,
      email: values.email,
      password: values.password,
    });
    toast({
      title: "Success",
      description: "New account successfully created.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    history.push("/");
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
        boxShadow="xl"
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
            {...register("firstname")}
          />
        </FormControl>
        <FormControl
          isInvalid={!!errors?.email?.message}
          errortext={errors?.email?.message}
          isRequired
        >
          <FormLabel>Email address</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="email"
            rounded="xl"
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors?.username?.message}
          errortext={errors?.username?.message}
          isRequired
        >
          <FormLabel>Username</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="username"
            rounded="xl"
            {...register("username")}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors?.password?.message}
          errortext={errors?.password?.message}
          isRequired
        >
          <FormLabel>Password</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="password"
            rounded="xl"
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors?.confirmpassword?.message}
          errortext={errors?.confirmpassword?.message}
          isRequired
        >
          <FormLabel>Confirm Password</FormLabel>
          <Input
            border="1px solid"
            borderColor={backgroundColor}
            type="password"
            rounded="xl"
            {...register("confirmpassword")}
          />
          <FormErrorMessage>{errors.confirmpassword?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          alignSelf="flex-end"
          rounded="xl"
          fontWeight="300"
          onClick={handleSubmit(onSubmit)}
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
