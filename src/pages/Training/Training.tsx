import React, { useState, useEffect, useContext } from "react";
import { FormTemplate } from "components";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "./../../fire";
import { List } from "./components";
import {
  required,
  // checkAtSign,
  // mustBeNumber,
  // minValue,
  // maxValue,
  composeValidators,
  // uniqueString,
} from "utils/validation";
interface user {
  uid: string;
}

export interface Props {}
type Trainings = Array<training>;
interface training {
  date: string;
  trainingName: string;
}
const Training: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const [trainings, setTrainings] = useState<Trainings>();

  // console.log("currentUser w Training", currentUser.uid);

  const today = new Date();
  const todayDatePattern = `${today.getFullYear()}-${today.getMonth() + 1}-${
    today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
  }T${today.getHours() > 9 ? today.getHours() : "0" + today.getHours()}:${
    today.getMinutes() > 9 ? today.getMinutes() : "0" + today.getMinutes()
  }`;
  // console.log(todayDatePattern);
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
        name: "trainingName",
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
  const handleSubmit = (values: any) => {
    // const recipientsList = {
    //   name: values.name,
    //   surname: values.surname,
    //   email: values.email,
    //   accountNumber: values.accountNumber,
    //   phoneNumber: values.phoneNumber,
    //   address: values.address,
    //   city: values.city,
    //   country: values.country,
    // };
    console.log(values);
    console.log(typeof values.date);
    if (currentUser) {
      saveNewTraining(currentUser.uid, values.date, values.trainingName);
    }
  };
  const saveNewTraining = (
    userId: string,
    date: Date,
    trainingName: string
  ) => {
    fire
      .database()
      .ref("users/" + userId + "/trainings/" + date + trainingName)
      .set({
        date,
        trainingName,
      });
  };
  useEffect(() => {
    if (currentUser) {
      fire
        .database()
        .ref("users/" + currentUser.uid + "/trainings")
        .orderByChild("date")
        .on("value", function (snapshot) {
          console.log("HALKO");
          const trainingArray: any = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            trainingArray.push(childData);
          });
          setTrainings(trainingArray);
        });
    }
  }, []);
  return (
    <>
      <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
      {trainings && <List trainings={trainings} />}
    </>
  );
};

export default Training;
