import React, { useState, useEffect } from "react";
import { FormTemplate, LoadingIndicator } from "components";
import { required, composeValidators } from "utils/validation";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.scss";
type Fields = {
  name: string;
  validate: (value: any) => void;
  initialValue: string;
  text: string;
  placeholder: string;
};
type Button = {
  text: string;
};
type FormFields = {
  fields: Fields[];
  button: Button;
};
type user = {
  name: string;
  surname: string;
};
type currentUser = {
  uid: string;
};
export type props = {
  currentUser: currentUser;
};

const User = ({ currentUser }: props) => {
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
      toast("Zaktualizowano dane");
    }
  };

  return (
    <div className="user">
      <h2 className="user__h2">Dane</h2>
      {settings ? (
        <FormTemplate formFields={settings} handleSubmit={handleSubmit} />
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default User;
