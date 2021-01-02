import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { trainingList } from "utils/constants";
import "./myProfileRank.scss";
type currentUser = {
  uid: string;
};
type props = {
  currentUser: currentUser;
  handleFlipCard: () => void;
};

const MyProfileRank = ({ currentUser, handleFlipCard }: props) => {
  const [numberOfTrainings, setNumberOfTrainings] = useState<number>(0);

  const uploadTrainingsAmount = function (snapshot: any) {
    setNumberOfTrainings(snapshot.numChildren());
  };
  const trainingName =
    numberOfTrainings >= trainingList[3].min
      ? trainingList[3].name
      : numberOfTrainings >= trainingList[2].min
      ? trainingList[2].name
      : numberOfTrainings >= trainingList[1].min
      ? trainingList[1].name
      : trainingList[0].name;
  useEffect(() => {
    var ref = firebase.database().ref(`users/${currentUser.uid}/trainings`);
    ref.once("value").then(uploadTrainingsAmount);
    return () => {
      ref.off("value", uploadTrainingsAmount);
    };
  }, [currentUser.uid]);
  return (
    <span onClick={handleFlipCard} className="my-profile-rank">
      {trainingName}
    </span>
  );
};

export default MyProfileRank;
