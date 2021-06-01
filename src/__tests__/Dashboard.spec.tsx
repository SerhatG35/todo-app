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
import userEvent from '@testing-library/user-event';

const RenderDashboard = (user: User) => {
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

test('Adding new card and todos', async () => {
  const user = {
    id: '608e6edf564ca01738e06bcb',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGU2ZWRmNTY0Y2EwMTczOGUwNmJjYiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJmaXJzdG5hbWUiOiIiLCJpYXQiOjE2MjIyMDA0NTV9.nzLomPDa9DTRCtqrUnUbnM4v8ahyXV9pX5rIDMpQBhg',
    userName: 'testuser',
  };

  await act(async () => {
    RenderDashboard(user);
  });

  const inputUsername = await screen.findByTestId('input-username');
  const inputPassword = await screen.findByTestId('input-password');
  const submitButton = await screen.findByTestId('button-login');
  fireEvent.change(inputUsername, { target: { value: 'testuser' } });
  fireEvent.change(inputPassword, { target: { value: '123123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  const addNewCardButton = await screen.findByTestId('button-newcard');
  const selectCategory = await screen.findByTestId('select-cardcategory');

  await waitFor(() => {
    userEvent.selectOptions(selectCategory, 'Normal');
    expect(selectCategory).toHaveValue('blue 1 normal');
    fireEvent.click(addNewCardButton);
  });

  const addTitle = await screen.findByTestId('button-addtitle');
  const inputTitle = await screen.findByTestId('input-title');

  await waitFor(() => {
    fireEvent.change(inputTitle, { target: { value: 'this is test title' } });
    expect(inputTitle).toHaveValue('this is test title');
    fireEvent.click(addTitle);
    expect(screen.getByText('this is test title')).toBeInTheDocument();
  });

  // const addTodo = await screen.findByTestId('button-addtodo');
  // const inputTodo = await screen.findByTestId('input-addtodo');

  // await waitFor(() => {
  //   fireEvent.change(inputTodo, { target: { value: 'my todo' } });
  //   expect(inputTodo).toHaveValue('my todo');
  //   fireEvent.click(addTodo);
  //   expect(screen.getByText('my todo')).toBeInTheDocument();
  // });
});
