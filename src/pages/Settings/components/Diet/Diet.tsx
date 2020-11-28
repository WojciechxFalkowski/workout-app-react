import React, { useState, useEffect } from "react";
import { FormTemplate } from "components";
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
          name: "calories",
          initialValue: snapshot.child("calories").val(),
          text: "Podaj ilość kalorii",
          placeholder: "Podaj ilość kalorii",
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
    const calories = values.calories ? Number(values.calories) : "";
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid + "/settings/diet/calories")
        .set(calories);
    }
  };
  return (
    <div className="diet">
      <h1 className="diet__h2">Dieta</h1>
      {diet && <FormTemplate formFields={diet} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default Diet;