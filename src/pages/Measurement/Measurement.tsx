import React, { useState } from "react";

export interface Props {}
interface measurement {
  id: string;
  date: string;
  weight: number;
}
const Measurement: React.FC<Props> = () => {
  const [measurements, setMeasurements] = useState<Array<measurement>>([
    { id: "abccefghjk", date: "10/10/2020", weight: 70 },
    { id: "abcdef2jka", date: "12/10/2020", weight: 75 },
    { id: "abadef1sjk", date: "13/10/2020", weight: 79 },
  ]);

  return (
    <>
      <form action="">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Waga</th>
              <th>Kk</th>
              <th>Rm</th>
              <th>Kp</th>
              <th>Pr</th>
              <th>Ng</th>
              <th>T</th>
              <th>B</th>
              <th>U</th>
              <th>Ł</th>
              <th>Ss</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((measurement) => {
              return (
                <tr key={measurement.id}>
                  <td>{measurement.date}</td>
                  <td>{measurement.weight}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </>
  );
};

export default Measurement;
