import React, { useContext } from "react";
import { required, composeValidators } from "utils/validation";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import fire from "../../../../fire";
import { PopUp } from "components";
export interface Props {
  measurements: Array<measurement>;
  setShowBlock: (arg: boolean) => void;
  setMeasurements: (arg: Array<measurement>) => void;
}
interface measurement {
  id: string;
  date: string;
  weight: number;
  arm: number;
  chest: number;
  waist: number;
  thighs: number;
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
const Block: React.FC<Props> = ({
  measurements,
  setShowBlock,
  setMeasurements,
}) => {
  const { currentUser } = useContext(AuthContext);
  const today = new Date();
  const todayDatePattern = `${today.getFullYear()}-${today.getMonth() + 1}-${
    today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
  }`;
  const formFields: FormFields = {
    fields: [
      {
        name: "date",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: todayDatePattern,
        text: "Data treningu",
        placeholder: "Data treningu",
        type: "date",
      },
      {
        name: "weight",
        initialValue: undefined,
        text: "Weight",
        placeholder: "Wight",
        type: "number",
        step: "1",
        min: "0",
      },
      {
        name: "arm",
        initialValue: undefined,
        text: "Arm",
        placeholder: "Arm",
        type: "number",
        step: "1",
        min: "0",
      },
      {
        name: "chest",
        initialValue: undefined,
        text: "Chest",
        placeholder: "Chest",
        type: "number",
        step: "1",
        min: "0",
      },
      {
        name: "waist",
        initialValue: undefined,
        text: "Waist",
        placeholder: "Waist",
        type: "number",
        step: "1",
        min: "0",
      },
      {
        name: "thighs",
        initialValue: undefined,
        text: "Thighs",
        placeholder: "Thighs",
        type: "number",
        step: "1",
        min: "0",
      },
    ],
    button: {
      type: "submit",
      text: "Dodaj",
    },
  };
  const ID = function () {
    return (
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9)
    );
  };
  const handleRemoveBlock = () => {
    setShowBlock(false);
  };
  const saveMeasurement = (userId: string, newMeasurement: any) => {
    fire
      .database()
      .ref("users/" + userId + "/measurements")
      .set([...measurements, newMeasurement]);
  };
  const handleSubmit = (values: measurement) => {
    if (
      !values.arm &&
      !values.chest &&
      !values.thighs &&
      !values.waist &&
      !values.weight
    ) {
    } else {
      console.log("measurements", [...measurements]);
      setMeasurements([...measurements, { ...values, id: ID() }]);
      setShowBlock(false);
      if (currentUser) {
        saveMeasurement(currentUser.uid, { ...values, id: ID() });
      }
    }
  };
  return (
    <PopUp
      handleRemoveBlock={handleRemoveBlock}
      formFields={formFields}
      handleSubmit={handleSubmit}
    />
  );
};

export default Block;
