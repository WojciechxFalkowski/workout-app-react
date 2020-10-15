import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "fire";
import { useHistory } from "react-router-dom";
import { TrainingExerciseList } from "./components";
import { FormTemplate, Button, Arrow } from "components";
import { required, composeValidators } from "utils/validation";
import "./training.scss";
interface Exercise {
  exerciseName: string;
}
interface Id {
  id: string;
}
type MatchParams = {
  params: Id;
};
export interface Props {
  match: MatchParams;
}
const Training: React.FC<Props> = ({ match }) => {
  const history = useHistory();
  const { id } = match.params;
  const { currentUser } = useContext(AuthContext);
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
      fire.database().ref(`users/${currentUser.uid}/trainings/${id}`).remove();
      history.goBack();
    }
  };
  const handleSubmit = (values: Exercise) => {
    if (currentUser) {
      fire
        .database()
        .ref(`users/${currentUser.uid}/trainings/${id}`)
        .child("exercises")
        .push()
        .set({ name: values.exerciseName });
      // history.push(`/trainings/${date}`); //think about that
    }
  };

  const [trainingName, setTrainingName] = useState();
  if (currentUser) {
  }
  const [exercises, setExercises] = useState();
  const loadTrainingName = function (snapshot: any) {
    setTrainingName(snapshot.val().trainingName);
  };
  const loadTrainings = function (snapshot: any) {
    const exerciseArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const { name } = childSnapshot.val();
      const key = childSnapshot.key;
      exerciseArray.push({ name, key });
    });
    setExercises(exerciseArray);
  };
  useEffect(() => {
    if (currentUser) {
      const ref = fire
        .database()
        .ref(`users/${currentUser.uid}/trainings/${id}`);
      ref.once("value").then(loadTrainingName);
      ref.child(`exercises`).on("value", loadTrainings);
      return () => {
        ref.off("value", loadTrainingName);
        ref.child(`exercises`).off("value", loadTrainings);
      };
    }
  }, [currentUser, id]);
  return (
    <div className="training">
      <Arrow />
      <Button onClick={handleDeleteTraining}>Usuń trening</Button>
      <h2 className="exercise__h2">{trainingName}</h2>
      <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
      {exercises && <TrainingExerciseList exercises={exercises} id={id} />}
    </div>
  );
};

export default Training;
