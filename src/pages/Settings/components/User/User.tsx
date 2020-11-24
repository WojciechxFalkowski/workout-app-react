import React, { useState, useEffect, useContext } from "react";
import { FormTemplate } from "components";
import { required, composeValidators } from "utils/validation";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import "./user.scss";
interface Fields {
  name: string;
  validate: (value: any) => void;
  initialValue: string;
  text: string;
  placeholder: string;
}
interface Button {
  text: string;
  type: string;
}
interface FormFields {
  fields: Fields[];
  button: Button;
}
interface user {
  name: string;
  surname: string;
}
export interface Props {}

const User: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const [settings, setSettings] = useState<FormFields>();
  const uploadUserInfo = function (snapshot: any) {
    setSettings({
      fields: [
        {
          name: "name",
          validate: composeValidators(required("To pole jest wymagane!")),
          initialValue: snapshot.child("name").val(),
          text: "Imię",
          placeholder: "Imię",
        },
        {
          name: "surname",
          validate: composeValidators(required("To pole jest wymagane!")),
          initialValue: snapshot.child("surname").val(),
          text: "Nazwisko",
          placeholder: "Nazwisko",
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
        .ref("users/" + currentUser.uid + "/settings/user");
      ref.once("value", uploadUserInfo);
      return () => {
        ref.off("value", uploadUserInfo);
      };
    }
  }, [currentUser]);
  const handleSubmit = (values: user) => {
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid + "/settings/user")
        .set(values);
    }
  };

  return (
    <div className="user">
      <h1 className="user__h1">Dane</h1>
      {settings && (
        <FormTemplate formFields={settings} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default User;
