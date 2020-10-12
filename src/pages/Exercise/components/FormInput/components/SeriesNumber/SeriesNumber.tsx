import React from "react";
import "./seriesNumber.scss";
export interface Props {
  index: number;
}

const SeriesNumber: React.FC<Props> = ({ index }) => {
  return (
    <>
      {index % 2 === 0 && <p className="seriesNumber">Seria {index / 2 + 1}</p>}
    </>
  );
};

export default SeriesNumber;
