import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { LoggedHome, Home } from "./components";
const Root = () => {
  const { currentUser }: any | undefined = useContext(AuthContext);
  return <>{currentUser ? <LoggedHome /> : <Home />}</>;
};

export default Root;
