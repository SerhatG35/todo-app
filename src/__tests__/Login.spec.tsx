import {
  act,
  findByTestId,
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
import { ROUTES } from 'src/constants/routes';
import SignUp from 'src/pages/SignUp';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import UserContext from 'src/context/userContext';
import { User } from 'global';

const LoginPage = () => {
  return render(
    <MemoryRouter>
      <Switch>
        <Route exact path={ROUTES.LOGIN} component={Login} />
      </Switch>
    </MemoryRouter>
  );
};

const RenderDashboard = (user: User) => {
  return render(
    <Provider store={store}>
      <UserContext.Provider value={{ user }}>
        <MemoryRouter>
          <ChakraProvider>
            <Switch>
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path={ROUTES.SIGNUP} component={SignUp} />
              <Home />
            </Switch>
          </ChakraProvider>
        </MemoryRouter>
      </UserContext.Provider>
    </Provider>
  );
};

test('Renders login page correctly', async () => {
  await act(async () => {
    LoginPage();
    const loginText = await screen.findByTestId('login-text');
    expect(loginText).toHaveTextContent('Login');
  });
});

test('User logins correctly', async () => {
  await act(async () => {
    const user = {
      id: 'this is id',
      token: 'this is token',
      userName: 'testuser',
    };
    RenderDashboard(user);
    const inputUsername = await screen.findByTestId('input-username');
    const inputPassword = await screen.findByTestId('input-password');
    const submitButton = screen.getByText('Sign in');
    await waitFor(() => [
      fireEvent.change(inputUsername, { target: { value: 'testuser' } }),
      fireEvent.change(inputPassword, { target: { value: '123123' } }),
      fireEvent.click(submitButton),
    ]);
    const loggedUserName = await screen.findByTestId('loggedin-username');
    expect(loggedUserName).toHaveTextContent(user.userName);
  });
});
