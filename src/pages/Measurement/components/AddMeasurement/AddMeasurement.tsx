import React from "react";
import { Button } from "components";
import firebase from "firebase/app";
import "./addMeasurement.scss";
import generateRandomString from "utils/generateRandomString";
import { Input } from "utils/customHooks";
import { dayMonthYearWithSeparator } from "utils/dateFunctions";
import { measurement } from "./../../Measurement";
export type props = {
  measurements: Array<measurement>;
  setActiveMeasurement: (arg1: boolean) => void;
  currentUserId: string;
};

const AddMeasurement = ({
  measurements,
  setActiveMeasurement,
  currentUserId,
}: props) => {
  const [weight, setWeight] = Input({ type: "number" });
  const [arm, setArn] = Input({ type: "number" });
  const [chest, setChest] = Input({ type: "number" });
  const [waist, setWaist] = Input({ type: "number" });
  const [thighs, setThighs] = Input({ type: "number" });
  const isComplete =
    weight === "" &&
    arm === "" &&
    chest === "" &&
    waist === "" &&
    thighs === "";
  const date = new Date();
  const today = dayMonthYearWithSeparator(date, "/");
  const saveMeasurement = (newMeasurement: any) => {
    firebase
      .database()
      .ref("users/" + currentUserId + "/measurements")
      .set([...measurements, newMeasurement]);
  };
  const handleSaveMeasurement = () => {
    if (isComplete) {
    } else {
      const today = dayMonthYearWithSeparator(date, "-", "yes");
      const measurement = {
        date: today,
        id: generateRandomString(),
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
          {isComplete ? "Usuń" : "Zapisz"}
        </Button>
      </td>
    </tr>
  );
};

export default AddMeasurement;
