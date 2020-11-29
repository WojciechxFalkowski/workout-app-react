import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { AddMeasurement } from "./components";
import "./measurement.scss";
import { Button } from "components";
export interface Props {}

interface measurement {
  id: string;
  date: string;
  weight: number;
  arm: number;
  chest: number;
  waist: number;
  thighs: number;
}
const Measurement: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  const [measurements, setMeasurements] = useState<Array<measurement>>([]);
  const [activeMeasurement, setActiveMeasurement] = useState(false);
  const handleAddMeasurement = () => {
    setActiveMeasurement(true);
  };
  const handleDeleteMeasurement = (id: string) => {
    const filteredMeasurements = measurements.filter(
      (item: any) => item.id !== id
    );
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid + "/measurements")
        .set([...filteredMeasurements]);
    }
  };
  const uploadMeasurements = function (snapshot: any) {
    const measurementsArray: any = [];
    snapshot.forEach(function (childSnapshot: any) {
      const childData = childSnapshot.val();
      measurementsArray.push(childData);
    });
    setMeasurements(measurementsArray);
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase
        .database()
        .ref("users/" + currentUser.uid + "/measurements")
        .orderByChild("date");
      ref.on("value", uploadMeasurements);
      return () => {
        ref.off("value", uploadMeasurements);
      };
    }
  }, [currentUser]);
  return (
    <main className="measurement">
      <Button onClick={handleAddMeasurement}>Dodaj pomiary</Button>
      <table className="measurement__table">
        <thead className="measurement__thead">
          <tr className="measurement__tr">
            <th className="measurement__th">Data</th>
            <th className="measurement__th">Waga</th>
            <th className="measurement__th">Ramię</th>
            <th className="measurement__th">Klatka</th>
            <th className="measurement__th">Talia</th>
            <th className="measurement__th">Uda</th>
            <th className="measurement__th"></th>
          </tr>
        </thead>
        <tbody className="measurement__tbody">
          {activeMeasurement && currentUser && (
            <AddMeasurement
              measurements={measurements}
              setActiveMeasurement={setActiveMeasurement}
              currentUserId={currentUser.uid}
            />
          )}
          {measurements
            .map((measurement) => {
              const date = new Date(measurement.date);
              const modifiedDate = `${
                date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
              }/${
                date.getMonth() + 1 > 9
                  ? date.getMonth() + 1
                  : "0" + date.getMonth() + 1
              }/${date.getFullYear()}`;
              return (
                <tr className="measurement__tr" key={measurement.id}>
                  <td className="measurement__td">{modifiedDate}</td>
                  <td className="measurement__td">{measurement.weight}</td>
                  <td className="measurement__td">{measurement.arm}</td>
                  <td className="measurement__td">{measurement.chest}</td>
                  <td className="measurement__td">{measurement.waist}</td>
                  <td className="measurement__td">{measurement.thighs}</td>
                  <td className="measurement__td">
                    <Button
                      onClick={() => handleDeleteMeasurement(measurement.id)}
                    >
                      Usuń
                    </Button>
                  </td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </main>
  );
};

export default Measurement;
