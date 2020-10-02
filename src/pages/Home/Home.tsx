import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
export interface Props {}

const Home: React.FC<Props> = () => {
  const { currentUser }: any | undefined = useContext(AuthContext);
  console.log("currentUser w HOME:", currentUser);
  return (
    <>
      <ul>
        Ostatnie treningi
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
};

export default Home;
