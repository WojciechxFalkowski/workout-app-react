import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { Charts } from "./components";
import "./statistics.scss";
import { LoadingIndicator } from "components";
type exercise = {
  workoutName: string;
  series?: Array<string>;
};
type training = {
  date: string;
  id: string;
  workoutName: string;
  exercises?: object;
};

const Statistics = () => {
  const { currentUser }: any | undefined = useContext(AuthContext);
  const [trainings, setTrainings] = useState<Array<training>>();
  const uploadTrainings = function (snapshot: any) {
    const trainingArray: Array<training> = [];
    snapshot.forEach(function (childSnapshot: any) {
      trainingArray.push(childSnapshot.val());
    });
    setTrainings(trainingArray);
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase.database().ref(`users/${currentUser.uid}/trainings`);
      ref.once("value", uploadTrainings);
      return () => {
        ref.off("value", uploadTrainings);
      };
    }
  }, [currentUser]);

  return (
    <main className="statistics">
      {trainings ? <Charts trainings={trainings} /> : <LoadingIndicator />}
    </main>
  );
};

export default Statistics;
