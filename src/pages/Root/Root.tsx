import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";

export interface Props {}

const Home: React.FC<Props> = () => {
  const { currentUser }: any | undefined = useContext(AuthContext);
  return (
    <>{currentUser ? <div>Witaj zalogowany</div> : <div>Zaloguj się</div>}</>
  );
};

export default Home;
