import React, { useState } from "react";
import firebase from "firebase/app";
import { trainingList } from "utils/constants";
import "./myProfileRank.scss";
interface currentUser {
  uid: string;
}
interface Props {
  currentUser: currentUser;
  handleFlipCard: () => void;
}

const MyProfileRank: React.FC<Props> = ({ currentUser, handleFlipCard }) => {
  const [numberOfTrainings, setNumberOfTrainings] = useState<number>(0);
  var ref = firebase.database().ref(`users/${currentUser.uid}/trainings`);
  ref.once("value").then(function (snapshot) {
    setNumberOfTrainings(snapshot.numChildren());
  });
  const trainingName =
    numberOfTrainings >= trainingList[3].min
      ? trainingList[3].name
      : numberOfTrainings >= trainingList[2].min
      ? trainingList[2].name
      : numberOfTrainings >= trainingList[1].min
      ? trainingList[1].name
      : trainingList[0].name;
  return (
    <span onClick={handleFlipCard} className="my-profile-rank">
      {trainingName}
    </span>
  );
};

export default MyProfileRank;
