import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FormTemplate } from "components";
import firebase from "firebase/app";
import { required, composeValidators } from "utils/validation";
import "./editTitle.scss";
import LoadingIndicator from "components/LoadingIndicator";
export type props = {
  labelText: string;
  editDate: boolean;
  refUrl: string;
  isActiveEditing: boolean;
  setIsActiveEditing: (value: boolean) => void;
};

const EditTitle = ({
  labelText,
  editDate,
  refUrl,
  isActiveEditing,
  setIsActiveEditing,
}: props) => {
  const [workoutName, setWorkoutName] = useState();
  const [editTimeDate, setEditTimeDate] = useState();
  const [editName, setEditName] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const formFields = {
    fields: [
      {
        name: "workoutName",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: workoutName,
        text: labelText,
        placeholder: "Nazwa treningu",
        type: "text",
      },
    ],
    button: {
      text: "Potwierdź zmiany",
    },
  };
  if (editDate) {
    formFields.fields.unshift({
      name: "date",
      validate: composeValidators(required("To pole jest wymagane!")),
      initialValue: editTimeDate,
      text: labelText,
      placeholder: "Data treningu",
      type: "datetime-local",
    });
  }
  const handleClickIcon = () => {
    setEditName(!editName);
    setIsActiveEditing(!isActiveEditing);
  };
  const saveEditedTraining = (workoutName: string, date?: string) => {
    if (date) {
      firebase.database().ref(refUrl).update({ workoutName, date });
    } else {
      firebase.database().ref(refUrl).update({ workoutName });
    }
  };
  const handleSubmit = (values: any) => {
    saveEditedTraining(values.workoutName, values.date);
    setWorkoutName(values.workoutName);
    if (editDate) {
      setEditTimeDate(values.date);
    }

    handleClickIcon();
  };
  const loadTrainingName = function (snapshot: any) {
    setWorkoutName(snapshot.val().workoutName);
    setEditTimeDate(snapshot.val().date);
    setIsLoaded(true);
  };
  useEffect(() => {
    const newRef = firebase.database().ref(refUrl);
    newRef.once("value").then(loadTrainingName);

    return () => {
      newRef.off("value", loadTrainingName);
    };
  }, [refUrl]);
  return (
    <>
      {editName ? (
        <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
      ) : isLoaded ? (
        <div className="edit-title__div">
          <h2 className="edit-title__h2">{workoutName}</h2>
          <div className="edit-title__div-icon">
            <BiEditAlt
              onClick={handleClickIcon}
              className="edit-title__icon-edit"
            />
          </div>
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default EditTitle;
