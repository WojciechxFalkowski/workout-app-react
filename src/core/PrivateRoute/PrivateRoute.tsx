import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
export interface Props {
  component: any;
  exact: boolean;
  path: string;
}
const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,

  ...rest
}) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

export default PrivateRoute;
