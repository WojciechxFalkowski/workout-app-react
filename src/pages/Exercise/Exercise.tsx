import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Arrow } from "./../Training/components";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { FormInput } from "./components";
import { required, composeValidators } from "utils/validation";
import "./exercise.scss";
interface Id {
  id: string;
}
interface Params {
  params: Id;
}
export interface Props {
  match: Params;
}

const Exercise: React.FC<Props> = (props) => {
  let history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const { exerciseName }: any = history.location.state;
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

  const checkSeries = (series: Array<string>) => {
    return series.map((item, index) => {
      const firstHalf = Number(item.substring(0, item.indexOf(":")));
      const secondHalf = Number(
        item.substring(item.indexOf(":") + 1, item.length)
      );
      // console.log(typeof firstHalf);
      // console.log(`element: ${index} ${firstHalf},${secondHalf}`);
      // console.log(`tablica typ: ${typeof series}`);
      // console.log(`tablica: ${series}`);
      // console.log(`tablica długość: ${series.length}`);
    });
  };

  const handleDeleteExercise = () => {
    if (currentUser) {
      // fire
      //   .database()
      //   .ref("users/" + currentUser.uid + "/trainings/")
      //   .remove();
      history.goBack();
    }
  };
  const handleSubmit = (values: any) => {
    // console.log("handleSubmit");
    // console.log("ilosc pól:", formFields.fields.length);
    // console.log("pola:", formFields.fields);
    formFields.fields.map((field) => {
      console.log(values[field.name]);
    });
    // console.log(values);
  };

  const handleSaveExercise = () => {
    console.log("handleSaveExercise");
  };

  return (
    <div className="exercise">
      <Arrow />
      <button onClick={handleDeleteExercise} className="exercise__button">
        Usuń ćwiczenie
      </button>
      <h2 className="exercise__h2">{exerciseName}</h2>
      <FormInput
        formFields={formFields}
        setFormFields={setFormFields}
        handleSubmit={handleSubmit}
      />
      {/* <div className="exercise__add">
        <AiOutlineCheck
          onClick={handleSaveExercise}
          className="exercise__icon"
        />
      </div> */}
    </div>
  );
};

export default Exercise;
