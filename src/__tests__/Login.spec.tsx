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
import { ROUTES } from 'src/constants/routes';
import SignUp from 'src/pages/SignUp';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import UserContext from 'src/context/userContext';
import { User } from 'global';
import PrivateRoute from 'src/components/PrivateRoute';

const LoginPage = () => {
  return render(
    <MemoryRouter>
      <Switch>
        <Route exact path={ROUTES.LOGIN} component={Login} />
      </Switch>
    </MemoryRouter>
  );
};

const RenderDashboard = (user:User) => {
  return render(
    <Provider store={store}>
      <UserContext.Provider value={{ user }}>
        <MemoryRouter>
          <ChakraProvider>
            <Switch>
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path={ROUTES.SIGNUP} component={SignUp} />
              <PrivateRoute user={user} path={ROUTES.DASHBOARD} exact>
                <Home />
              </PrivateRoute>
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
      id: '608e6edf564ca01738e06bcb',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGU2ZWRmNTY0Y2EwMTczOGUwNmJjYiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJmaXJzdG5hbWUiOiIiLCJpYXQiOjE2MjIyMDA0NTV9.nzLomPDa9DTRCtqrUnUbnM4v8ahyXV9pX5rIDMpQBhg',
      userName: 'testuser',
    };
    RenderDashboard(user);
    const inputUsername = await screen.findByTestId('input-username');
    const inputPassword = await screen.findByTestId('input-password');
    const submitButton = await screen.findByTestId('button-login');
    fireEvent.change(inputUsername, { target: { value: 'testuser' } });
    fireEvent.change(inputPassword, { target: { value: '123123' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });
});
