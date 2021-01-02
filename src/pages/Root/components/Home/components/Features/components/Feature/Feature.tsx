import React from "react";
import "./feature.scss";
export type props = {
  icon: any;
  title: string;
  text: string;
};

const Feature = ({ icon, title, text }: props) => {
  return (
    <div className="feature">
      <div className="feature__div">{icon}</div>
      <p className="feature__title">{title}</p>
      <p className="feature__p">{text}</p>
    </div>
  );
};

export default Feature;
