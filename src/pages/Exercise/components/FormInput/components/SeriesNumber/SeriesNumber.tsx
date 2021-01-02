import React from "react";
import "./seriesNumber.scss";
export type props = {
  index: number;
};

const SeriesNumber = ({ index }: props) => {
  return (
    <>
      {index % 2 === 0 && (
        <p className="series-number">Seria {index / 2 + 1}</p>
      )}
    </>
  );
};

export default SeriesNumber;
