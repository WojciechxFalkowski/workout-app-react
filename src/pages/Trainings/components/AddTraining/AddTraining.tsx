import React, { useContext } from "react";
import { FormTemplate } from "components";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import formFields from "./formFields";

const AddTraining = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const saveNewTraining = (
    userId: string,
    id: string,
    date: string,
    workoutName: string
  ) => {
    firebase
      .database()
      .ref("users/" + userId + "/trainings/" + id)
      .set({ id, date, workoutName });
  };
  const handleSubmit = (values: any) => {
    const date = values.date
      .replace(/-/g, "")
      .replace(/T/g, "")
      .replace(/:/g, "");

    if (currentUser) {
      saveNewTraining(currentUser.uid, date, values.date, values.workoutName);
      history.push(`/trainings/${date}`);
    }
  };
  return (
    <section className="add-training">
      <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
    </section>
  );
};

export default AddTraining;
