import React from "react";
import { Button } from "components";
import { IoIosArrowBack } from "react-icons/io";
import { trainingList } from "utils/constants";
import "./rank.scss";
type props = {
  handleFlipCard: () => void;
};

const Ranks = ({ handleFlipCard }: props) => {
  return (
    <div className="rank">
      <Button onClick={handleFlipCard}>
        <IoIosArrowBack />
      </Button>
      <div className="rank__div">
        <h1 className="rank__h1">Liczba treningów</h1>
        <div className="rank__div-list">
          {trainingList.map((trainingItem) => (
            <p key={trainingItem.name} className="rank__p">
              <span className="rank__span-name">{trainingItem.name}</span>
              <span className="rank__span-min">{trainingItem.min}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranks;
