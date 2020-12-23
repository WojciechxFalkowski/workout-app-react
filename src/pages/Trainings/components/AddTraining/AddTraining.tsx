import React, { useContext } from "react";
import { FormTemplate } from "components";
import { required, composeValidators, maxValue } from "utils/validation";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import {
  dayMonthYearWithSeparator,
  hoursMinutesWithSeparator,
} from "utils/dateFunctions";
export interface Props {}

const AddTraining: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const date = new Date();
  const datePattern = `${dayMonthYearWithSeparator(
    date,
    "-",
    "yes"
  )}T${hoursMinutesWithSeparator(date, ":")}`;
  const formFields = {
    fields: [
      {
        name: "date",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: datePattern,
        text: "Data treningu",
        placeholder: "Data treningu",
        type: "datetime-local",
        max: datePattern,
      },
      {
        name: "workoutName",
        validate: composeValidators(
          required("To pole jest wymagane!"),
          maxValue(40, "Nazwa treningu maksymalnie może mieć 40 znaków")
        ),
        initialValue: undefined,
        text: "Nazwa treningu",
        placeholder: "Nazwa treningu",
      },
    ],
    button: {
      text: "Dodaj trening",
    },
  };
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
