import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "fire";
import { DragAndDropList, TrainingItem } from "./components";
import { useHistory } from "react-router-dom";
import { EditTitle, GoBackDelete } from "components";
import firebase from "firebase/app";
import "./training.scss";

interface Id {
  id: string;
}
type MatchParams = {
  params: Id;
};
export interface Props {
  match: MatchParams;
}
const Training: React.FC<Props> = ({ match }) => {
  const history = useHistory();
  const { id } = match.params;
  const { currentUser } = useContext(AuthContext);
  const [isActiveEditing, setIsActiveEditing] = useState(false);

  const handleDeleteTraining = () => {
    if (currentUser) {
      firebase
        .database()
        .ref(`users/${currentUser.uid}/trainings/${id}`)
        .remove();
      history.goBack();
    }
  };

  const [exercises, setExercises] = useState();
  const loadTrainings = function (snapshot: any) {
    const exerciseArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const { series, workoutName } = childSnapshot.val();
      const key = childSnapshot.key;
      exerciseArray.push({ workoutName, key, series });
    });
    setExercises(exerciseArray);
  };
  useEffect(() => {
    if (currentUser) {
      const ref = fire
        .database()
        .ref(`users/${currentUser.uid}/trainings/${id}`);
      ref.child(`exercises`).on("value", loadTrainings);
      return () => {
        ref.child(`exercises`).off("value", loadTrainings);
      };
    }
  }, [currentUser, id]);

  return (
    <main className="training">
      <GoBackDelete
        handleEdit={handleDeleteTraining}
        editTitle="Usuń trening"
      />

      <section className="training__add-exercise">
        {currentUser && (
          <EditTitle
            labelText="Nazwa treningu"
            editDate={true}
            refUrl={`users/${currentUser.uid}/trainings/${id}`}
            isActiveEditing={isActiveEditing}
            setIsActiveEditing={setIsActiveEditing}
          />
        )}
        {isActiveEditing && currentUser ? (
          <DragAndDropList
            exercises={exercises}
            id={id}
            refUrl={`users/${currentUser.uid}/trainings/${id}/exercises`}
          />
        ) : (
          exercises && <TrainingItem exercises={exercises} id={id} />
        )}
      </section>
    </main>
  );
};

export default Training;
