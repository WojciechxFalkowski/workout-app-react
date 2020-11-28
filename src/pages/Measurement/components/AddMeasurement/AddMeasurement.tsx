import React, { useState } from "react";
import { Button } from "components";
import firebase from "firebase/app";
import "./addMeasurement.scss";
export interface Props {
  measurements: any;
  setActiveMeasurement: (arg1: boolean) => void;
  currentUserId: string;
}

const AddMeasurement: React.FC<Props> = ({
  measurements,
  setActiveMeasurement,
  currentUserId,
}) => {
  const date = new Date();
  const today = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const saveMeasurement = (newMeasurement: any) => {
    firebase
      .database()
      .ref("users/" + currentUserId + "/measurements")
      .set([...measurements, newMeasurement]);
  };
  const handleSaveMeasurement = () => {
    if (
      weight === "" &&
      arm === "" &&
      chest === "" &&
      waist === "" &&
      thighs === ""
    ) {
    } else {
      const today = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const measurement = {
        date: today,
        id: ID(),
        weight,
        arm,
        chest,
        waist,
        thighs,
      };
      saveMeasurement(measurement);
    }

    setActiveMeasurement(false);
  };
  const ID = function () {
    return (
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9)
    );
  };
  const useInput = ({ type }: any) => {
    const [value, setValue] = useState("");
    const input = (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
      />
    );
    return [value, input];
  };
  const [weight, setWeight] = useInput({ type: "number" });
  const [arm, setArn] = useInput({ type: "number" });
  const [chest, setChest] = useInput({ type: "number" });
  const [waist, setWaist] = useInput({ type: "number" });
  const [thighs, setThighs] = useInput({ type: "number" });
  return (
    <tr className="add-measurement">
      <td className="add-measurement__td">{today}</td>
      <td className="add-measurement__td">{setWeight}</td>
      <td className="add-measurement__td">{setArn}</td>
      <td className="add-measurement__td">{setChest}</td>
      <td className="add-measurement__td">{setWaist}</td>
      <td className="add-measurement__td">{setThighs}</td>
      <td className="add-measurement__td">
        <Button onClick={() => handleSaveMeasurement()}>
          {weight === "" &&
          arm === "" &&
          chest === "" &&
          waist === "" &&
          thighs === ""
            ? "Usuń"
            : "Zapisz"}
        </Button>
      </td>
    </tr>
  );
};

export default AddMeasurement;
