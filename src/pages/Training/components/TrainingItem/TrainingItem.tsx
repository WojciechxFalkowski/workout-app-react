import React, { useContext } from "react";
import { TrainingExerciseList } from "./..";
import { FormTemplate } from "components";
import { required, composeValidators, maxValue } from "utils/validation";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
type Exercise = {
  workoutName: string;
};
export type props = {
  exercises: any | undefined;
  id: string;
};

const TrainingItem = ({ exercises, id }: props) => {
  const { currentUser } = useContext(AuthContext);
  const formFields = {
    fields: [
      {
        name: "workoutName",
        validate: composeValidators(
          required("To pole jest wymagane!"),
          maxValue(60, "Nazwa treningu maksymalnie może mieć 60 znaków")
        ),
        initialValue: undefined,
        text: "Nowe ćwiczenie",
        placeholder: "Nowe ćwiczenie",
      },
    ],
    button: {
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
