import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "fire";
import { Charts } from "./components";
type exercise = {
  workoutName: string;
  series?: Array<string>;
};
interface training {
  date: string;
  id: string;
  workoutName: string;
  exercises?: object;
}
export interface Props {}
const Statistics: React.FC<Props> = () => {
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
      const ref = fire.database().ref(`users/${currentUser.uid}/trainings`);
      ref.once("value", uploadTrainings);
    }
  }, [currentUser]);

  return <>{trainings && <Charts trainings={trainings} />}</>;
};

export default Statistics;
