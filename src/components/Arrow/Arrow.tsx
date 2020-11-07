import "./arrow.scss";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Button } from "components";

const Arrow = () => {
  const history = useHistory();
  const handleArrowClick = () => {
    history.goBack();
  };
  return (
    <div className="arrow">
      <Button onClick={handleArrowClick}>
        <IoIosArrowBack />
      </Button>
    </div>
  );
};

export default Arrow;
