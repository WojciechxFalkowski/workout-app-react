import React, { useContext } from "react";
import { PopUp } from "components";
import { required, composeValidators, mustBeAmount } from "utils/validation";
import firebase from "firebase/app";
import { AuthContext } from "components/AuthProvider/AuthProvider";
interface mealItem {
  ingredient: string;
  carbs: number;
  fats: number;
  proteins: number;
  mineralsalt: number;
  calories: number;
}
interface meal {
  mealName: string;
  list: Array<mealItem>;
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
  index: number;
  id: string;
  setShowBlock: (arg: boolean) => void;
  meal: meal;
}

const AddElementBlock: React.FC<Props> = ({
  index,
  id,
  setShowBlock,
  meal,
}) => {
  const { currentUser } = useContext(AuthContext);

  const formFields: FormFields = {
    fields: [
      {
        name: "ingredient",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Nazwa składnika",
        placeholder: "Nazwa składnika",
        type: "text",
      },
      {
        name: "carbs",
        validate: composeValidators(
          required("To pole jest wymagane!"),
          mustBeAmount("To nie jest liczba!")
        ),
        initialValue: undefined,
        text: "Węglowodany",
        placeholder: "Węglowodany",
        type: "number",
        step: "0.1",
        min: "0",
      },
      {
        name: "fats",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Tłuszcze",
        placeholder: "Tłuszcze",
        type: "number",
        step: "0.1",
        min: "0",
      },
      {
        name: "proteins",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Białko",
        placeholder: "Białko",
        type: "number",
        step: "0.1",
        min: "0",
      },
      {
        name: "mineralsalt",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Sole mineralne",
        placeholder: "Sole mineralne",
        type: "number",
        step: "0.1",
        min: "0",
      },
      {
        name: "calories",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Wartość energetyczna (kcal)",
        placeholder: "Wartość energetyczna (kcal)",
        type: "number",
        step: "0.1",
        min: "0",
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
  const saveIngredient = (
    userId: string,
    index: number,
    values: mealItem,
    list: Array<mealItem>
  ) => {
    const newList = list ? list : [];
    firebase
      .database()
      .ref(`users/${userId}/diet/${id}/meal/${index}/list`)
      .set([...newList, values]);
  };
  const handleSubmit = (values: mealItem) => {
    const valuesModified = {
      ingredient: values.ingredient,
      carbs: Number(values.carbs),
      fats: Number(values.fats),
      proteins: Number(values.proteins),
      mineralsalt: Number(values.mineralsalt),
      calories: Number(values.calories),
    };

    if (currentUser) {
      saveIngredient(currentUser.uid, index, valuesModified, meal.list);
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

export default AddElementBlock;
