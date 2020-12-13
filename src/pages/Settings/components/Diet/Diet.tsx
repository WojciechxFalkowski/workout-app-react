import React, { useState, useEffect } from "react";
import { FormTemplate, LoadingIndicator } from "components";
import firebase from "firebase/app";
import "./diet.scss";
interface Fields {
  name: string;
  initialValue: string;
  text: string;
  placeholder: string;
  type: string;
  step: string;
  min: string;
}
interface Button {
  text: string;
  type: string;
}
interface FormFields {
  fields: Fields[];
  button: Button;
}
interface currentUser {
  uid: string;
}
export interface Props {
  currentUser: currentUser;
}
const Diet: React.FC<Props> = ({ currentUser }) => {
  const [diet, setDiet] = useState<FormFields>();
  const uploadDiet = function (snapshot: any) {
    setDiet({
      fields: [
        {
          name: "carbs",
          initialValue: snapshot.child("carbs").val(),
          text: "Węglowodany",
          placeholder: "Węglowodany",
          type: "number",
          step: "1",
          min: "0",
        },
        {
          name: "fats",
          initialValue: snapshot.child("fats").val(),
          text: "Tłuszcze",
          placeholder: "Tłuszcze",
          type: "number",
          step: "1",
          min: "0",
        },
        {
          name: "proteins",
          initialValue: snapshot.child("proteins").val(),
          text: "Białko",
          placeholder: "Białko",
          type: "number",
          step: "1",
          min: "0",
        },
        {
          name: "calories",
          initialValue: snapshot.child("calories").val(),
          text: "Kalorie",
          placeholder: "Kalorie",
          type: "number",
          step: "1",
          min: "0",
        },
      ],
      button: {
        type: "submit",
        text: "Aktualizuj",
      },
    });
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/settings/diet");
      ref.once("value", uploadDiet);
      return () => {
        ref.off("value", uploadDiet);
      };
    }
  }, [currentUser]);
  const handleSubmit = (values: any) => {
    for (var propName in values) {
      if (values[propName] === null || values[propName] === undefined) {
        delete values[propName];
      } else {
        values[propName] = Number(values[propName]);
      }
    }
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid + "/settings/diet")
        .set(values);
    }
  };
  return (
    <div className="diet">
      <h1 className="diet__h2">Dieta</h1>
      {diet ? (
        <FormTemplate formFields={diet} handleSubmit={handleSubmit} />
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default Diet;
