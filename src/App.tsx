import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ColorModeButton from "./components/ColorModeButton";
import PrivateRoute from "./components/PrivateRoute";

import { ChakraProvider, Center, Heading } from "@chakra-ui/react";
import theme from "./theme";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Heading>Loading Please Wait..</Heading>}>
        <ChakraProvider theme={theme}>
          <ColorModeButton />
          <Center w="100%" h="100vh" fontFamily="Poppins">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute path="/dashboard" component={Home} exact />
            </Switch>
          </Center>
        </ChakraProvider>
      </Suspense>
    </Router>
  );
}

export default App;
