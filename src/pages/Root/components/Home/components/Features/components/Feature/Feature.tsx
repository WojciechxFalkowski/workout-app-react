import React from "react";
import "./feature.scss";
export interface Props {
  icon: any;
  title: string;
  text: string;
}

const Feature: React.FC<Props> = ({ icon, title, text }) => {
  return (
    <div className="feature">
      <div className="feature__div">{icon}</div>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__p">{text}</p>
    </div>
  );
};

export default Feature;
