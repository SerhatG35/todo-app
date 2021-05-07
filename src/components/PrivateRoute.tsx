import { User } from "global";

import React from "react";
import { Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  user: User | null;
  children: React.ReactNode;
  [x: string]: any;
};

const PrivateRoute = ({ user, children, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user && React.isValidElement(children)) {
          return React.cloneElement(children);
        }
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
};

export default PrivateRoute;
