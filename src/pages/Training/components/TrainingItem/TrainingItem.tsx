import React, { useContext } from "react";
import { TrainingExerciseList } from "./..";
import { FormTemplate } from "components";
import { required, composeValidators } from "utils/validation";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
interface Exercise {
  workoutName: string;
}
export interface Props {
  exercises: any | undefined;
  id: string;
}

const TrainingItem: React.FC<Props> = ({ exercises, id }) => {
  const { currentUser } = useContext(AuthContext);
  const formFields = {
    fields: [
      {
        name: "workoutName",
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
  const handleSubmit = (values: Exercise) => {
    if (currentUser) {
      firebase
        .database()
        .ref(`users/${currentUser.uid}/trainings/${id}`)
        .child("exercises")
        .push()
        .set({ workoutName: values.workoutName });
      values.workoutName = "";
    }
  };
  return (
    <>
      <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
      <TrainingExerciseList exercises={exercises} id={id} />
    </>
  );
};

export default TrainingItem;
