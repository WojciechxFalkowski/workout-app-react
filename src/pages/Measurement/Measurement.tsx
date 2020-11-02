import React, { useState } from "react";
import { Block } from "./components";

import "./measurement.scss";
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
  const [measurements, setMeasurements] = useState<Array<measurement>>([]);

  const [showBlock, setShowBlock] = useState(false);

  const handleAddMeasurement = () => {
    setShowBlock(true);
  };

  const handleDeleteMeasurement = (id: string) => {
    setMeasurements(measurements.filter((item) => item.id !== id));
  };
  return (
    <div className="measurement">
      <h2 onClick={handleAddMeasurement} className="measurement__h2">
        Dodaj pomiary
      </h2>
      {showBlock && (
        <Block
          measurements={measurements}
          setShowBlock={setShowBlock}
          setMeasurements={setMeasurements}
        />
      )}
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
        <tbody>
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
                    <span
                      onClick={() => handleDeleteMeasurement(measurement.id)}
                      className="measurement__delete"
                    >
                      Usuń
                    </span>
                  </td>
                </tr>
              );
            })
            .reverse()}
        </tbody>
      </table>
    </div>
  );
};

export default Measurement;
