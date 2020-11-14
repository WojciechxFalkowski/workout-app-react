import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { Greetings } from "./components";
// import fire from "fire";

export interface Props {}
// let index = 0;
const Home: React.FC<Props> = () => {
  // console.log(`wywołanie Home:${index++}`);
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser w HOME:", currentUser);

  return <>{currentUser && <Greetings />}</>;
};

export default Home;
