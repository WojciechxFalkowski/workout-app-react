import React from "react";
import "./removeSeries.scss";
export type props = {
  index: number;
  handleRemoveSeries: (index: number) => void;
};

const RemoveSeries = ({ index, handleRemoveSeries }: props) => {
  return (
    <div className="remove-series">
      <button
        onClick={() => handleRemoveSeries(index)}
        type="button"
        className="remove-series__button"
      >
        Usuń serię
      </button>
    </div>
  );
};

export default RemoveSeries;
