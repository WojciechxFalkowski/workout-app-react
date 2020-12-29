import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { FormInput } from "./components";
import { EditTitle, GoBackDelete } from "components";
import { required, composeValidators } from "utils/validation";
import generateRandomString from "utils/generateRandomString";
import firebase from "firebase/app";
import "./exercise.scss";
interface Id {
  id: string;
}
interface Params {
  params: Id;
  path: string;
  url: string;
}
interface Field {
  name: string;
  validate: (value: any) => void;
  initialValue: string | undefined;
  text: string;
  placeholder: string;
}
interface Button {
  type: string;
  text: string;
}
interface FormFields {
  fields: Field[];
  button: Button;
}
export interface Props {
  match: Params;
}
const Exercise: React.FC<Props> = (props) => {
  let history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const url = props.match.url.replace("/trainings/", "");
  const id = url.replace("/" + props.match.params.id, "");
  const [isActiveEditing, setIsActiveEditing] = useState(false);
  const [formFields, setFormFields] = useState<FormFields>({
    fields: [
      {
        name: "exerciseWeight",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Ciężar (kg)",
        placeholder: "Ciężar (kg)",
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
      firebase
        .database()
        .ref(
          `users/${currentUser.uid}/trainings/${id}/exercises/${props.match.params.id}`
        )
        .remove();
      history.goBack();
    }
  };
  const uploadExercise = function (snapshot: any) {
    if (snapshot) {
      const fields: Field[] = [];
      const button = {
        type: "submit",
        text: "Zapisz",
      };
      snapshot.forEach(function (childSnapshot: any) {
        const text =
          fields.length % 2 === 0 ? "Ciężar (kg)" : "Liczba powtórzeń";

        fields.push({
          name: `${
            fields.length % 2 === 0 ? "exerciseWeight" : "exerciseRepeat"
          }${generateRandomString()}`,
          validate: composeValidators(required("To pole jest wymagane!")),
          initialValue: childSnapshot.val(),
          text: text,
          placeholder: text,
        });
      });
      if (fields.length > 0) {
        setFormFields({
          fields,
          button,
        });
      }
    }
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref(
          `users/${currentUser.uid}/trainings/${id}/exercises/${props.match.params.id}/series`
        );
      ref.on("value", uploadExercise);
      return () => {
        ref.off("value", uploadExercise);
      };
    }
  }, [currentUser, id, props.match.params.id]);
  return (
    <main className="exercise">
      <GoBackDelete
        handleEdit={handleSaveExercise}
        editTitle="Usuń ćwiczenie"
      />
      <section className="exercise__add-series">
        {currentUser && (
          <EditTitle
            labelText="Nazwa ćwiczenia"
            editDate={false}
            refUrl={`users/${currentUser.uid}/trainings/${id}/exercises/${props.match.params.id}`}
            isActiveEditing={isActiveEditing}
            setIsActiveEditing={setIsActiveEditing}
          />
        )}
        {!isActiveEditing && (
          <FormInput
            formFields={formFields}
            setFormFields={setFormFields}
            id={id}
            paramId={props.match.params.id}
          />
        )}
      </section>
    </main>
  );
};

export default Exercise;
