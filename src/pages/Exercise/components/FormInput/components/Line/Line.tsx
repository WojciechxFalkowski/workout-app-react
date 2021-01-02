import React from "react";
import "./line.scss";
import generateRandomString from "utils/generateRandomString";
import { required, composeValidators } from "utils/validation";
type Fields = {
  name: string;
  validate: (value: any) => void;
  initialValue: string | undefined;
  text: string;
  placeholder: string;
};
type Button = {
  text: string;
};
export type props = {
  fields: Fields[];
  button: Button;
  setFormFields: (cos: any) => void;
};

const Line = ({ fields, button, setFormFields }: props) => {
  const handleAddSeries = () => {
    fields.push(
      {
        name: `exerciseWeight${generateRandomString()}`,
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Ciężar (kg)",
        placeholder: "Ciężar (kg)",
      },
      {
        name: `exerciseRepeat${generateRandomString()}`,
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Liczba powtórzeń",
        placeholder: "Liczba powtórzeń",
      }
    );
    setFormFields({
      fields,
      button,
    });
  };
  return (
    <div onClick={handleAddSeries} className="exercise__line">
      <div className="exercise__check">+</div>
    </div>
  );
};

export default Line;
