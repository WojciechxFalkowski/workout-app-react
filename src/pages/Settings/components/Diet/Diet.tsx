import React, { useState, useEffect } from "react";
import { FormTemplate, LoadingIndicator } from "components";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import "./diet.scss";
type Fields = {
  name: string;
  initialValue: string;
  text: string;
  placeholder: string;
  type: string;
  step: string;
  min: string;
};
type Button = {
  text: string;
};
type FormFields = {
  fields: Fields[];
  button: Button;
};
type currentUser = {
  uid: string;
};
export type props = {
  currentUser: currentUser;
};
const Diet = ({ currentUser }: props) => {
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
      toast("Zaktualizowano dietę");
    }
  };
  return (
    <div className="diet">
      <h3 className="diet__h3">Dieta</h3>
      {diet ? (
        <FormTemplate formFields={diet} handleSubmit={handleSubmit} />
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default Diet;
