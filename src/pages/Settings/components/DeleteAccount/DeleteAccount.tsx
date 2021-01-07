import React, { useState } from "react";
import { Button } from "components";
import firebase from "firebase/app";
import "react-toastify/dist/ReactToastify.css";
import "./deleteAccount.scss";
type Button = {
  text: string;
};
type currentUser = {
  uid: string;
  reauthenticateWithCredential: any;
  delete: any;
  providerData: any;
  email: string;
};
export type props = {
  currentUser: currentUser;
};

const DeleteAccount = ({ currentUser }: props) => {
  const [isActiveForm, setIsActiveForm] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [password, setPassword] = useState<string>("");
  const handleSubmit = () => {
    if (currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      currentUser
        .reauthenticateWithCredential(credential)
        .then(() => {
          currentUser.delete().then(() => {
            firebase
              .database()
              .ref("users/" + currentUser.uid)
              .remove();
          });
        })
        .catch(() => {
          setIsErrorMessage(true);
        });
    }
  };

  return (
    <div className="delete-account">
      {!isActiveForm && (
        <Button onClick={() => setIsActiveForm(true)}>Usuń konto</Button>
      )}
      {isActiveForm && (
        <>
          <h4 className="delete-account__h4">Na pewno chcesz usunąć konto?</h4>
          <div className="delete-account__wrapper">
            <label htmlFor="password" className="delete-account__label">
              Hasło
            </label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="delete-account__input"
              id="password"
            />
            {isErrorMessage && (
              <p className="delete-account__error-message">Niepoprawne hasło</p>
            )}
            <Button onClick={handleSubmit}>Tak</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteAccount;
