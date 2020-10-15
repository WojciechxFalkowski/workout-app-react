import "./arrow.scss";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";

const Arrow = () => {
  const history = useHistory();
  const handleArrowClick = () => {
    history.goBack();
  };
  return (
    <>
      <span className="arrow__span" onClick={handleArrowClick}>
        <IoIosArrowBack />
      </span>
    </>
  );
};

export default Arrow;
