import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { Greetings, MyProfile, Activities, TableResults } from "./components";
import firebase from "firebase/app";
import "./loggedHome.scss";
import { LoadingIndicator } from "components";
type ingredients = {
  carbs: number;
  fats: number;
  proteins: number;
  calories: number;
};
type user = {
  name: string;
  surname: string;
  ingredients: ingredients;
};
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<user>();
  const uploadUser = function (snapshot: any) {
    setUser({
      name: snapshot.child("user/name").val(),
      surname: snapshot.child("user/surname").val(),
      ingredients: {
        carbs: snapshot.child("diet/carbs").val(),
        fats: snapshot.child("diet/fats").val(),
        proteins: snapshot.child("diet/proteins").val(),
        calories: snapshot.child("diet/calories").val(),
      },
    });
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/settings");
      ref.on("value", uploadUser);
      return () => {
        ref.off("value", uploadUser);
      };
    }
  }, [currentUser]);
  return (
    <>
      {currentUser && user ? (
        <main className="logged-home">
          <Greetings name={user.name} />
          <section className="logged-home__profile">
            <MyProfile
              name={user.name}
              surname={user.surname}
              currentUser={currentUser}
            />
            <Activities ingredients={user.ingredients} />
          </section>

          <TableResults />
        </main>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default Home;
