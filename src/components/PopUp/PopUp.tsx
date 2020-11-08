import React from "react";
import { FormTemplate } from "components";
import "./popUp.scss";
interface Fields {
  name?: string;
  validate?: (value: any) => void;
  initialValue?: string | undefined;
  text?: string;
  placeholder?: string;
  type?: string;
  step?: string;
  min?: string;
}

interface Button {
  text: string;
}
interface FormFields {
  fields: Fields[];
  button: Button;
}
export interface Props {
  handleRemoveBlock: () => void;
  formFields: FormFields;
  handleSubmit: (val: any) => void;
}

const PopUp: React.FC<Props> = ({
  handleRemoveBlock,
  formFields,
  handleSubmit,
}) => {
  return (
    <div onClick={(e) => handleRemoveBlock()} className="pop-up">
      <div onClick={(e) => e.stopPropagation()} className="pop-up__add">
        <FormTemplate formFields={formFields} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default PopUp;
