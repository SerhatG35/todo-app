import {
  Center,
  Input,
  Button,
  FormControl,
  FormLabel,
  useColorModeValue,
  Heading,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';
import { signUpSchema } from 'src/constants/YupSchema';
import { Auth } from 'src/service/axios';
import { toaster } from 'src/utils/toaster';

type SignUpFormInputs = {
  firstname: string;
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpSchema),
  });

  const backgroundColor = useColorModeValue('#505153', '#ADCAD7');
  const fontColor = useColorModeValue('#EBEBEB', '#ADCAD7');
  const hoverColor = useColorModeValue('#ADCAD7', '#EBEBEB');

  const onSubmit = async (values: SignUpFormInputs) => {
    setIsLoading(true);
    try {
      const data = await Auth.register({
        firstname: values.firstname,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (data) {
        toaster('Success', 'New account created.', 'success');
        history.push(ROUTES.LOGIN);
      }
    } catch (error) {
      toaster('Error', error.response.data, 'error');
    }
    setIsLoading(false);
  };

  return (
    <>
      <Center d='flex' w='100%' h='100%' flexDir='column'>
        <Heading mb='.75em'>Sign Up</Heading>
        <Center
          w={['85%', '55%', '45%', '35%', '25%']}
          h={['70%', '65%', '60%']}
          d='flex'
          flexDir='column'
          justifyContent='space-between'
          boxShadow='xl'
          p='1.5em 2em'
          rounded='3xl'
        >
          <FormControl id='first-name'>
            <FormLabel>First Name</FormLabel>
            <Input
              border='1px solid'
              borderColor={backgroundColor}
              type='name'
              rounded='xl'
              {...register('firstname')}
            />
          </FormControl>
          <FormControl
            isInvalid={!!errors?.email?.message}
            errortext={errors?.email?.message}
            isRequired
          >
            <FormLabel>Email address</FormLabel>
            <Input
              border='1px solid'
              borderColor={backgroundColor}
              type='email'
              rounded='xl'
              {...register('email')}
            />
            <FormErrorMessage fontSize={['xs', 'sm']}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.username?.message}
            errortext={errors?.username?.message}
            isRequired
          >
            <FormLabel>Username</FormLabel>
            <Input
              border='1px solid'
              borderColor={backgroundColor}
              type='username'
              rounded='xl'
              {...register('username')}
            />
            <FormErrorMessage fontSize={['xs', 'sm']}>
              {errors.username?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.password?.message}
            errortext={errors?.password?.message}
            isRequired
          >
            <FormLabel>Password</FormLabel>
            <Input
              border='1px solid'
              borderColor={backgroundColor}
              type='password'
              rounded='xl'
              {...register('password')}
            />
            <FormErrorMessage fontSize={['xs', 'sm']}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.confirmpassword?.message}
            errortext={errors?.confirmpassword?.message}
            isRequired
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
              border='1px solid'
              borderColor={backgroundColor}
              type='password'
              rounded='xl'
              {...register('confirmpassword')}
            />
            <FormErrorMessage fontSize={['xs', 'sm']}>
              {errors.confirmpassword?.message}
            </FormErrorMessage>
          </FormControl>
        </Center>
        <Button
          isLoading={isLoading}
          loadingText='Submitting'
          mt='2'
          type='submit'
          colorScheme='blue'
          rounded='xl'
          fontWeight='300'
          onClick={handleSubmit(onSubmit)}
          _focus={{ boxShadow: 'none' }}
        >
          Complete
        </Button>
      </Center>
      <Button
        size='sm'
        position='absolute'
        left='5'
        bottom='5'
        bgColor='#505153'
        fontWeight='500'
        rounded='xl'
        color={fontColor}
        _hover={{ color: hoverColor }}
        onClick={() => history.push('/')}
        _focus={{ boxShadow: 'none' }}
      >
        Back
      </Button>
    </>
  );
};

export default SignUp;
