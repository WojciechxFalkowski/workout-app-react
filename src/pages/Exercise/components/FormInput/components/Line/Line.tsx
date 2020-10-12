import React from "react";
import "./line.scss";
export interface Props {
  handleAddSeries: () => void;
}

const Line: React.FC<Props> = ({ handleAddSeries }) => {
  return (
    <div onClick={handleAddSeries} className="exercise__line">
      <div className="exercise__check">+</div>
    </div>
  );
};

export default Line;
