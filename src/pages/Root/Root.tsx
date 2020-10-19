import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { Home } from "./components";

export interface Props {}

const Root: React.FC<Props> = () => {
  const { currentUser }: any | undefined = useContext(AuthContext);
  return <>{currentUser ? <Home /> : <div>Zaloguj się</div>}</>;
};

export default Root;
