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
// let index = 0;
const Home: React.FC<Props> = () => {
  // console.log(`wywołanie Home:${index++}`);
  const { currentUser }: any | undefined = useContext(AuthContext);
  // console.log("currentUser w HOME:", currentUser);
  const [trainings, setTrainings] = useState<Array<training>>();

  // ref.on("value", function (dataTrainings) {
  //   dataTrainings.forEach(function (dataTraining) {
  //     console.log("training date", dataTraining.val().date);
  //     console.log("training workoutName", dataTraining.val().workoutName);
  //     console.log("training workoutName", dataTraining.val().exercises);
  //   });
  // });
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
  if (trainings) {
    // console.log(trainings);
    // console.log(typeof trainings);
    trainings.forEach((training: training) => {
      // console.log("training ", training.workoutName);
      if (training.exercises) {
        // console.log("exercises ", training.exercises);
        for (const [key, value] of Object.entries(training.exercises)) {
          // console.log("value", value);
          if (value.series) {
            // console.log(
            //   `id: ${key}, nazwa ćwiczenia: ${value.workoutName}, serie: ${value.series}`
            // );
          } else {
            // console.log(`id: ${key}, nazwa ćwiczenia: ${value.workoutName}`);
          }
        }
      }
    });
  }
  return <>{trainings && <Charts trainings={trainings} />}</>;
};

export default Home;
