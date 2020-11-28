import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { Greetings, MyProfile, Activities, TableResults } from "./components";
import firebase from "firebase/app";
import "./home.scss";
interface user {
  name: string;
  surname: string;
  calories: number;
}
export interface Props {}
const Home: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<user>();
  const uploadDiet = function (snapshot: any) {
    setUser({
      name: snapshot.child("user/name").val(),
      surname: snapshot.child("user/surname").val(),
      calories: snapshot.child("diet/calories").val(),
    });
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/settings");
      ref.once("value", uploadDiet);
      return () => {
        ref.off("value", uploadDiet);
      };
    }
  }, [currentUser]);
  return (
    <>
      {currentUser && user && (
        <main className="home">
          <Greetings name={user.name} />
          <section className="home__profile">
            <MyProfile
              name={user.name}
              surname={user.surname}
              currentUser={currentUser}
            />
            <Activities calories={user.calories} />
          </section>

          <TableResults />
        </main>
      )}
    </>
  );
};

export default Home;
