import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "fire";
import { DragAndDropList } from "./components";
import { useHistory } from "react-router-dom";
import { TrainingExerciseList } from "./components";
import { FormTemplate, EditTitle, GoBackDelete } from "components";
import { required, composeValidators } from "utils/validation";
import "./training.scss";
interface Exercise {
  workoutName: string;
}
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
  const formFields = {
    fields: [
      {
        name: "workoutName",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Nowe ćwiczenie",
        placeholder: "Nowe ćwiczenie",
      },
    ],
    button: {
      type: "submit",
      text: "Dodaj ćwiczenie",
    },
  };

  const handleDeleteTraining = () => {
    if (currentUser) {
      fire.database().ref(`users/${currentUser.uid}/trainings/${id}`).remove();
      history.goBack();
    }
  };
  const handleSubmit = (values: Exercise) => {
    if (currentUser) {
      fire
        .database()
        .ref(`users/${currentUser.uid}/trainings/${id}`)
        .child("exercises")
        .push()
        .set({ workoutName: values.workoutName });
      values.workoutName = "";
    }
  };

  if (currentUser) {
  }
  const [exercises, setExercises] = useState();
  const loadTrainings = function (snapshot: any) {
    const exerciseArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const { workoutName } = childSnapshot.val();
      const key = childSnapshot.key;
      exerciseArray.push({ workoutName, key });
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
      {!isActiveEditing && (
        <GoBackDelete
          handleEdit={handleDeleteTraining}
          editTitle="Usuń trening"
        />
      )}
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
        {isActiveEditing && exercises && currentUser ? (
          <DragAndDropList
            exercises={exercises}
            id={id}
            refUrl={`users/${currentUser.uid}/trainings/${id}/exercises`}
          />
        ) : (
          <>
            <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
            {exercises && (
              <TrainingExerciseList exercises={exercises} id={id} />
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Training;
