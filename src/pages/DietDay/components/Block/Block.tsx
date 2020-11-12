import React, { useContext } from "react";
import { PopUp } from "components";
import firebase from "firebase";
import { AuthContext } from "components/AuthProvider/AuthProvider";
interface values {
  mealName: string;
}

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
  type: string;
}
interface FormFields {
  fields: Fields[];
  button: Button;
}
export interface Props {
  setShowBlock: (arg: boolean) => void;
  meals: any;
  setMeals: any;
  id: string;
}

const Block: React.FC<Props> = ({ setShowBlock, meals, setMeals, id }) => {
  const { currentUser } = useContext(AuthContext);

  const formFields: FormFields = {
    fields: [
      {
        name: "mealName",
        initialValue: undefined,
        text: "Nazwa posiłku",
        placeholder: "Nazwa posiłku",
        type: "text",
      },
    ],
    button: {
      type: "submit",
      text: "Dodaj",
    },
  };
  const handleRemoveBlock = () => {
    setShowBlock(false);
  };
  const saveMeal = (userId: string, values: values) => {
    firebase
      .database()
      .ref(`users/${userId}/diet/${id}/meal`)
      .set([...meals, values]);
  };
  const handleSubmit = (values: values) => {
    if (values.mealName) {
      // setMeals([...meals, values.meal]);
      if (currentUser) {
        saveMeal(currentUser.uid, values);
      }
    }
    setShowBlock(false);
  };

  return (
    <>
      <PopUp
        handleRemoveBlock={handleRemoveBlock}
        formFields={formFields}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Block;
