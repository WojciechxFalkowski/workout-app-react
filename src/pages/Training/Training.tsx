import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "fire";
import { useHistory } from "react-router-dom";
import { Arrow } from "./components";
import { FormTemplate } from "components";
import { useList } from "react-firebase-hooks/database";
import { Link } from "react-router-dom";
import {
  required,
  // checkAtSign,
  // mustBeNumber,
  // minValue,
  // maxValue,
  composeValidators,
  // uniqueString,
} from "utils/validation";
import "./training.scss";

interface training {
  id: string;
  date: string;
  trainingName: string;
}
interface Exercise {
  exerciseName: string;
}
type MatchParams = {
  params: any;
};
export interface Props {
  match: MatchParams;
}

const Training: React.FC<Props> = ({ match }) => {
  let history = useHistory();

  const { id } = match.params;
  const { currentUser } = useContext(AuthContext);
  const [exercise, setExercise] = useState(null);
  var tutorialsRef;
  if (currentUser) {
    tutorialsRef = fire
      .database()
      .ref("users/" + currentUser.uid + "/trainings/" + id + "/exercises");
  }
  const [snapshots, loading, error] = useList(tutorialsRef);
  if (snapshots) {
    // snapshots.map((tutorial, index) => {
    //   console.log("JAKIES ", tutorial.val(), index);
    // });
    // console.log("snapshots", snapshots);
  }

  const formFields = {
    fields: [
      {
        name: "exerciseName",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Nowe ćwiczenie",
        placeholder: "Nowe ćwiczenie",
      },
    ],
    button: {
      type: "submit",
      text: "Dodaj ćwiczenie",
    },
  };

  const handleDeleteTraining = () => {
    if (currentUser) {
      fire
        .database()
        .ref("users/" + currentUser.uid + "/trainings/" + id)
        .remove();
      history.goBack();
    }
  };
  const handleSubmit = (values: Exercise) => {
    // console.log(values.exerciseName);
    if (currentUser) {
      fire
        .database()
        .ref("users/" + currentUser.uid + "/trainings/" + id)
        .child("exercises")
        .push()
        .set({ name: values.exerciseName });

      // .set(values.exerciseName);

      //   const databasePath = fire
      //   .database()
      //   .ref("users/" + currentUser.uid + "/trainings/" + id + "training");
      // databasePath.on("value", function (snapshot) {
      //   console.log("Snap", snapshot.val());
      // });
      // .set(values.exerciseName);
    }
  };
  const handleTrainingExercise = (exerciseKey: any, exerciseName: any) => {
    // console.log(exerciseName);
    history.push({
      pathname: `/trainings/${id}/${exerciseKey}`,
      state: { exerciseName },
    });
  };
  return (
    <div className="training">
      <Arrow />
      <button onClick={handleDeleteTraining} className="training__button">
        Usuń trening
      </button>
      <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
      <ul>
        {!loading &&
          snapshots &&
          snapshots
            .map((exerciseName, index) => (
              <li
                onClick={() =>
                  handleTrainingExercise(
                    exerciseName.key,
                    exerciseName.val().name
                  )
                }
                key={exerciseName.key}
                className="training__exercise"
              >
                {exerciseName.val().name}
              </li>
            ))
            .reverse()}
      </ul>
    </div>
  );
};

export default Training;
