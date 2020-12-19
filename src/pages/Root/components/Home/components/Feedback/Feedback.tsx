import React, { useState, useEffect } from "react";
import "./feedback.scss";
import { IoIosArrowBack } from "react-icons/io";
export interface Props {}

const Feedback: React.FC<Props> = () => {
  const text = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis
  tortor lectus. Vestibulum eget felis quis magna dignissim bibendum a
  eget ante. Cras volutpat erat et urna mollis porta. Nunc porta sodales
  nibh a euismod. Nullam fringilla varius dolor et euismod. Aenean
  lobortis magna.`,
    `Ala ma kota `,
    `Lolek bobek `,
  ];

  const [indexOfActiveFeedback, setIndexOfActiveFeedback] = useState(0);
  useEffect(() => {
    const indexActiveFeedback = setInterval(() => {
      setIndexOfActiveFeedback((prevState) => {
        if (prevState === 2) return 0;
        return prevState + 1;
      });
    }, 10000);
    return () => clearInterval(indexActiveFeedback);
  }, [indexOfActiveFeedback]);
  const handleActiveFeedback = (direction: string) => {
    if (direction === "left") {
      setIndexOfActiveFeedback((prevState) => {
        if (prevState === 0) return 2;
        return prevState - 1;
      });
    } else if (direction === "right") {
      setIndexOfActiveFeedback((prevState) => {
        if (prevState === 2) return 0;
        return prevState + 1;
      });
    }
  };
  return (
    <section className="feedback">
      <h2 className="feedback__title">Najświeższe opinie</h2>
      <div className="feedback__opinions">
        <span
          onClick={() => handleActiveFeedback("left")}
          className="feedback__left"
        >
          <IoIosArrowBack />
        </span>
        <p className="feedback__p">{text[indexOfActiveFeedback]}</p>
        <span
          onClick={() => handleActiveFeedback("right")}
          className="feedback__right"
        >
          <IoIosArrowBack />
        </span>
      </div>
    </section>
  );
};

export default Feedback;
