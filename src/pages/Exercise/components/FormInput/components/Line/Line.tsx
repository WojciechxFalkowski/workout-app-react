import React from "react";
import "./line.scss";
import generateRandomString from "utils/generateRandomString";
import { required, composeValidators } from "utils/validation";
interface Fields {
  name: string;
  validate: (value: any) => void;
  initialValue: string | undefined;
  text: string;
  placeholder: string;
}
interface Button {
  text: string;
}
export interface Props {
  fields: Fields[];
  button: Button;
  setFormFields: (cos: any) => void;
}

const Line: React.FC<Props> = ({ fields, button, setFormFields }) => {
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
