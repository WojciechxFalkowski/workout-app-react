import React, { useState, useEffect, useContext } from "react";
import { FormTemplate } from "components";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "../../fire";
import { List } from "./components";
import { useHistory } from "react-router-dom";

import { required, composeValidators } from "utils/validation";
export interface Props {}
type Trainings = Array<training>;
interface training {
  id: string;
  date: string;
  workoutName: string;
}
const Trainings: React.FC<Props> = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [trainings, setTrainings] = useState<Trainings>();
  const today = new Date();
  const todayDatePattern = `${today.getFullYear()}-${today.getMonth() + 1}-${
    today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
  }T${today.getHours() > 9 ? today.getHours() : "0" + today.getHours()}:${
    today.getMinutes() > 9 ? today.getMinutes() : "0" + today.getMinutes()
  }`;
  const formFields = {
    fields: [
      {
        name: "date",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: todayDatePattern,
        text: "Data treningu",
        placeholder: "Data treningu",
        type: "datetime-local",
      },
      {
        name: "workoutName",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Nazwa treningu",
        placeholder: "Nazwa treningu",
      },
    ],
    button: {
      type: "submit",
      text: "Dodaj trening",
    },
  };
  const saveNewTraining = (
    userId: string,
    id: string,
    date: string,
    workoutName: string
  ) => {
    fire
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
  const uploadTrainings = function (snapshot: any) {
    const trainingArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      trainingArray.push(childData);
    });
    setTrainings(trainingArray);
  };
  useEffect(() => {
    if (currentUser) {
      const ref = fire
        .database()
        .ref("users/" + currentUser.uid + "/trainings")
        .orderByChild("date");
      ref.on("value", uploadTrainings);
      return () => {
        ref.off("value", uploadTrainings);
      };
    }
  }, [currentUser]);
  return (
    <>
      <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
      {trainings && <List trainings={trainings} />}
    </>
  );
};

export default Trainings;
