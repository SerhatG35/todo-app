import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ColorModeButton from './components/ColorModeButton';
import PrivateRoute from './components/PrivateRoute';

import useVerifyAuth from './hooks/useVerifyAuth';

import { ChakraProvider, Center, Heading } from '@chakra-ui/react';
import theme from './theme';
import UserContext from './context/userContext';
import { ROUTES } from './constants/routes';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  const { user } = useVerifyAuth();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<Heading>Loading Please Wait..</Heading>}>
          <ChakraProvider theme={theme}>
            <ColorModeButton />
            <Center w="100%" h="100vh" fontFamily="Poppins">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <PrivateRoute user={user} path={ROUTES.DASHBOARD} exact>
                  <Home />
                </PrivateRoute>
              </Switch>
            </Center>
          </ChakraProvider>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
