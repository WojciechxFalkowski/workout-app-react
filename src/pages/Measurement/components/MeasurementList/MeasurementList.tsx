import React from "react";
import { Button } from "components";
import { dayMonthYearWithSeparator } from "utils/dateFunctions";

interface measurement {
  id: string;
  date: string;
  weight: number;
  arm: number;
  chest: number;
  waist: number;
  thighs: number;
}
export interface Props {
  measurements: Array<measurement>;
  handleDeleteMeasurement: (arg1: string) => void;
}

const MeasurementList: React.FC<Props> = ({
  measurements,
  handleDeleteMeasurement,
}) => {
  return (
    <>
      {measurements
        .map((measurement) => {
          const date = new Date(measurement.date);
          const modifiedDate = dayMonthYearWithSeparator(date, "/");
          return (
            <tr className="measurement__tr" key={measurement.id}>
              <td className="measurement__td">{modifiedDate}</td>
              <td className="measurement__td">{measurement.weight}</td>
              <td className="measurement__td">{measurement.arm}</td>
              <td className="measurement__td">{measurement.chest}</td>
              <td className="measurement__td">{measurement.waist}</td>
              <td className="measurement__td">{measurement.thighs}</td>
              <td className="measurement__td">
                <Button onClick={() => handleDeleteMeasurement(measurement.id)}>
                  Usuń
                </Button>
              </td>
            </tr>
          );
        })
        .reverse()}
    </>
  );
};

export default MeasurementList;
