import { Switch } from '@chakra-ui/react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';
import Login from 'src/pages/Login';
import SignUp from 'src/pages/SignUp';

const SignUpPage = () => {
  return render(
    <MemoryRouter>
      <Switch>
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.SIGNUP} component={SignUp} />
      </Switch>
    </MemoryRouter>
  );
};

test('SignUp page loaded properly', async () => {
  await act(async () => {
    SignUpPage();
    const registerLink = screen.getByRole('link', { name: 'Sign Up' });
    fireEvent.click(registerLink);
    const signUpText = screen.getByText('Sign Up');
    expect(signUpText).toBeInTheDocument();
  });
});

test('Trying to register with unfilled form', async () => {
  await act(async () => {
    SignUpPage();
    const registerLink = screen.getByRole('link', { name: 'Sign Up' });
    await waitFor(() => {
      fireEvent.click(registerLink);
    });
    const completeRegister = screen.getByRole('button', { name: 'Complete' });
    await waitFor(() => {
      fireEvent.click(completeRegister);
      expect(screen.getByText('Email is a required field')).toBeInTheDocument();
      expect(
        screen.getByText('Username must be at least 4 characters')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Password must be at least 6 characters')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Confirm Password is required')
      ).toBeInTheDocument();
    });
  });
});

// test('Registering completed', async () => {
//   await act(async () => {
//     const MockUser = {
//       email: 'mockemail2@mock.com',
//       username: 'mock username2',
//       password: 'mock password',
//       confirmpassword: 'mock password',
//     };
//     SignUpPage();
//     const registerLink = screen.getByRole('link', { name: 'Sign Up' });
//     await waitFor(() => fireEvent.click(registerLink));

//     const completeRegister = screen.getByRole('button', { name: 'Complete' });
//     const inputEmail = screen.getByRole('textbox', { name: 'Email Address' });
//     const inputUsername = screen.getByRole('textbox', { name: 'Username' });
//     const inputPassword = screen.getByTestId('register-password');
//     const inputConfirmPass = screen.getByTestId('register-confirmpassword');
//     fireEvent.change(inputEmail, { target: { value: MockUser.email } });
//     fireEvent.change(inputUsername, { target: { value: MockUser.username } });
//     fireEvent.change(inputPassword, { target: { value: MockUser.password } });
//     fireEvent.change(inputConfirmPass, {
//       target: { value: MockUser.confirmpassword },
//     });
//     fireEvent.click(completeRegister);
//     await waitFor(() => {
//       expect(screen.getByText('New account created.')).toBeInTheDocument();
//     });
//   });
// });
