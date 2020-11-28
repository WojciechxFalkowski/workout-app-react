import React, { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import "./myProfile.scss";

interface currentUser {
  uid: string;
}
export interface Props {
  name: string;
  surname: string;
  currentUser: currentUser;
}

const MyProfile: React.FC<Props> = ({ name, surname, currentUser }) => {
  const trainingList: Array<string> = [
    "Początkujący/a",
    "Średnio zaawansowany/a",
    "Zaawansowany",
    "Ekspert",
  ];
  const [numberOfTrainings, setNumberOfTrainings] = useState<number>(0);
  var ref = firebase.database().ref(`users/${currentUser.uid}/trainings`);
  ref.once("value").then(function (snapshot) {
    setNumberOfTrainings(snapshot.numChildren());
  });
  const trainingName =
    numberOfTrainings >= 10
      ? numberOfTrainings >= 50
        ? numberOfTrainings >= 100
          ? trainingList[3]
          : trainingList[2]
        : trainingList[1]
      : trainingList[0];
  return (
    <article className="my-profile">
      <span className="my-profile__text">Mój profil</span>
      <div className="my-profile__div-initials">
        <span className="my-profile__initials">
          {name && surname ? (
            `${name[0].toUpperCase()}${surname[0].toUpperCase()}`
          ) : (
            <Link className="my-profile__link" to="settings">
              ?
            </Link>
          )}
        </span>
      </div>
      <span className="my-profile__name">
        {name && surname ? (
          `${name} ${surname}`
        ) : (
          <Link className="my-profile__link" to="settings">
            -
          </Link>
        )}
      </span>
      <span className="my-profile__rank">{trainingName}</span>
    </article>
  );
};

export default MyProfile;
