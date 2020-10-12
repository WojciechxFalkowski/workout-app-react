import React from "react";
import "./removeSeries.scss";
export interface Props {
  index: number;
  handleRemoveSeries: (index: number) => void;
}

const RemoveSeries: React.FC<Props> = ({ index, handleRemoveSeries }) => {
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
