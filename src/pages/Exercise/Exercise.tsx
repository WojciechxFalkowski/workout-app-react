import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { FormInput } from "./components";
import { Button, Arrow } from "components";
import { required, composeValidators } from "utils/validation";
import fire from "./../../fire";
import "./exercise.scss";
interface Id {
  id: string;
}
interface Params {
  params: Id;
  path: string;
  url: string;
}
export interface Props {
  match: Params;
}

const Exercise: React.FC<Props> = (props) => {
  let history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const { exerciseName }: any = history.location.state;
  const url = props.match.url.replace("/trainings/", "");
  const id = url.replace("/" + props.match.params.id, "");
  const [formFields, setFormFields] = useState({
    fields: [
      {
        name: "exerciseWeight",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Ciężar",
        placeholder: "Ciężar",
      },
      {
        name: "exerciseRepeat",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Liczba powtórzeń",
        placeholder: "Liczba powtórzeń",
      },
    ],
    button: {
      type: "submit",
      text: "Zapisz",
    },
  });
  const handleSaveExercise = () => {
    if (currentUser) {
      fire
        .database()
        .ref(
          `users/${currentUser.uid}/trainings/${id}/exercises/${props.match.params.id}`
        )
        .remove();
      history.goBack();
    }
  };
  const handleSubmit = (values: any) => {
    const newArray: any = [];
    formFields.fields.forEach((field) => {
      newArray.push(values[field.name]);
    });
    if (currentUser) {
      const url = `users/${currentUser.uid}/trainings/${id}/exercises/${props.match.params.id}`;
      fire.database().ref(url).child("series").set(newArray);
    }
  };
  const ID = function () {
    return (
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9)
    );
  };
  useEffect(() => {
    if (currentUser) {
      fire
        .database()
        .ref(
          `users/${currentUser.uid}/trainings/${id}/exercises/${props.match.params.id}/series`
        )
        .on("value", function (snapshot) {
          if (snapshot) {
            const fields: any = [];
            const button = {
              type: "submit",
              text: "Zapisz",
            };
            snapshot.forEach(function (childSnapshot) {
              fields.push({
                name: `${
                  fields.length % 2 === 0 ? "exerciseWeight" : "exerciseRepeat"
                }${ID()}`,
                validate: composeValidators(required("To pole jest wymagane!")),
                initialValue: childSnapshot.val(),
                text: "Ciężar",
                placeholder: "Ciężar",
              });
            });
            if (fields.length > 0) {
              setFormFields({
                fields,
                button,
              });
            }
          }
        });
    }
  }, [currentUser, id, props.match.params.id]);
  return (
    <div className="exercise">
      <Arrow />
      <Button onClick={handleSaveExercise}>Usuń ćwiczenie</Button>
      <h2 className="exercise__h2">{exerciseName}</h2>
      <FormInput
        formFields={formFields}
        setFormFields={setFormFields}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Exercise;
