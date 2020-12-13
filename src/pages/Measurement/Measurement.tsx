import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import firebase from "firebase/app";
import { Thead, MeasurementList, AddMeasurement } from "./components";
import "./measurement.scss";
import { Button, LoadingIndicator } from "components";
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
  const [isLoaded, setIsLoaded] = useState(false);
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
    setIsLoaded(true);
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
      {isLoaded ? (
        <table className="measurement__table">
          <Thead />
          <tbody className="measurement__tbody">
            {activeMeasurement && currentUser && (
              <AddMeasurement
                measurements={measurements}
                setActiveMeasurement={setActiveMeasurement}
                currentUserId={currentUser.uid}
              />
            )}

            <MeasurementList
              measurements={measurements}
              handleDeleteMeasurement={handleDeleteMeasurement}
            />
          </tbody>
        </table>
      ) : (
        <LoadingIndicator />
      )}
    </main>
  );
};

export default Measurement;
