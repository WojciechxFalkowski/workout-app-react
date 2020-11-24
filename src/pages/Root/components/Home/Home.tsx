import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { Greetings, MyProfile, Activities, TableResults } from "./components";
import "./home.scss";

export interface Props {}
// let index = 0;
const Home: React.FC<Props> = () => {
  // console.log(`wywołanie Home:${index++}`);
  const { currentUser } = useContext(AuthContext);
  // console.log("currentUser w HOME:", currentUser);

  return (
    <div className="home">
      {currentUser && <Greetings />}
      <div className="home__profile">
        <MyProfile />
        <Activities />
      </div>
      <TableResults />
    </div>
  );
};

export default Home;
