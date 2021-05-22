import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import Login from 'src/pages/Login';
import Home from 'src/pages/Home';
import { ChakraProvider, Switch } from '@chakra-ui/react';
import PrivateRoute from 'src/components/PrivateRoute';
import { ROUTES } from 'src/constants/routes';
import SignUp from 'src/pages/SignUp';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

const RenderLoginPage = () => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ChakraProvider>
          <Switch>
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.SIGNUP} component={SignUp} />
            <Home />
          </Switch>
        </ChakraProvider>
      </MemoryRouter>
    </Provider>
  );
};

test('Renders login page correctly', async () => {
  await act(async () => {
    RenderLoginPage();

    const loginText = screen.getByTestId('login-text');

    expect(loginText).toHaveTextContent('Login');
  });
});

test('User logins correctly', async () => {
  await act(async () => {
    RenderLoginPage();
    const inputUsername = await screen.findByTestId('input-username');
    const inputPassword = await screen.findByTestId('input-password');
    const submitButton = screen.getByText('Sign in');
    await waitFor(() => [
      fireEvent.change(inputUsername, { target: { value: 'testuser' } }),
      fireEvent.change(inputPassword, { target: { value: '123123' } }),
      fireEvent.click(submitButton),
    ]);
  });
});
