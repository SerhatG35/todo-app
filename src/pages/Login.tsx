import { useState } from 'react';
import { useHistory, Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'src/constants/YupSchema';

import {
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Heading,
  InputLeftElement,
  Text,
  Link,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { BiShow, BiHide, BiUser, BiLock } from 'react-icons/bi';
import { Auth } from 'src/service/axios';
import { toaster } from 'src/utils/toaster';
import { ROUTES } from 'src/constants/routes';
import useRedirectLoggedInUser from 'src/hooks/useRedirectLoggedInUser';

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const history = useHistory();
  useRedirectLoggedInUser();
  const backgroundColor = useColorModeValue('#505153', '#ADCAD7');
  const loginWrapperBgColor = useColorModeValue('#F2F2F2', '#212322');

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const data = await Auth.LOGIN({
        auth: {
          username: values.username,
          password: values.password,
        },
      });
      if (data) {
        history.push(ROUTES.DASHBOARD);
        toaster('Success', `Welcome ${data.userName}`, 'success');
      }
    } catch (error) {
      toaster('Success', error.response.data, 'error');
      setIsLoading(false);
    }
  };

  return (
    <Center
      w={['85%', '55%', '45%', '35%', '25%']}
      d='flex'
      h={['60%', '45%', '40%']}
      flexDir='column'
    >
      <Heading mb='2rem' fontFamily='Poppins' data-testid='login-text'>
        Login
      </Heading>
      <Center
        flexDir='column'
        justifyContent='space-around'
        rounded='3xl'
        boxShadow='xl'
        p='1.5em 3em'
        w='100%'
        h='100%'
        bg={loginWrapperBgColor}
      >
        <FormControl
          isInvalid={!!errors?.username?.message}
          errortext={errors?.username?.message}
          isRequired
        >
          <InputGroup size='md'>
            <InputLeftElement fontSize='xl' children={<BiUser />} />
            <Input
              data-testid='input-username'
              {...register('username')}
              name='username'
              type='username'
              fontWeight='300'
              placeholder='Enter Username'
              rounded='xl'
              borderColor={backgroundColor}
              boxShadow='sm'
            />
          </InputGroup>
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors?.password?.message}
          errortext={errors?.password?.message}
          isRequired
        >
          <InputGroup size='md'>
            <InputLeftElement fontSize='xl' children={<BiLock />} />
            <Input
              data-testid='input-password'
              {...register('password')}
              pr='3.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter Password'
              borderColor={backgroundColor}
              colorScheme='purple'
              fontWeight='300'
              rounded='xl'
              boxShadow='sm'
            />
            <InputRightElement width='3.5rem'>
              <Button
                size='xs'
                fontSize='xl'
                onClick={() => setShow(!show)}
                _focus={{
                  boxShadow: 'none',
                }}
                bgColor='transparent'
              >
                {show ? <BiHide /> : <BiShow />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          data-testid='button-login'
          isLoading={isLoading}
          loadingText='Logging in'
          type='submit'
          w='100%'
          size='md'
          fontSize='md'
          aria-label='login'
          _focus={{
            boxShadow: 'none',
          }}
          onClick={handleSubmit(onSubmit)}
          fontWeight='500'
          colorScheme='green'
          rounded='xl'
          disabled={!!errors.username || !!errors.password}
        >
          Sign in
        </Button>
        <Center mt='1rem'>
          <Text mr='0.5rem'>Not a member ?</Text>
          <Link
            as={ReactLink}
            to='/signup'
            _focus={{
              boxShadow: 'none',
            }}
            color='green.600'
          >
            Sign Up
          </Link>
        </Center>
      </Center>
    </Center>
  );
};

export default Login;
