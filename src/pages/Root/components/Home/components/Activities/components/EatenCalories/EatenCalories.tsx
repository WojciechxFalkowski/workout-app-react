import React from "react";
import "./eatenCalories.scss";
export interface Props {}

const EatenCalories: React.FC<Props> = () => {
  return (
    <div className="eaten-calories">
      <span className="eaten-calories__title">Dieta</span>
      <div className="eaten-calories__calories">3000 kcal</div>
    </div>
  );
};

export default EatenCalories;
