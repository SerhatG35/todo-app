import { Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ComponentType<any>;
  [x: string]: any;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const login = localStorage.getItem("login");
  const routeComponent = (props: any) =>
    login && JSON.parse(login) ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
