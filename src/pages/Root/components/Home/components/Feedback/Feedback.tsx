import React, { useState, useEffect } from "react";
import "./feedback.scss";
import { IoIosArrowBack } from "react-icons/io";
import firebase from "firebase/app";

const Feedback = () => {
  const [opinions, setOpinions] = useState<Array<string>>([]);
  const numberOfOpinions = opinions.length;
  const [indexOfActiveFeedback, setIndexOfActiveFeedback] = useState(0);
  useEffect(() => {
    if (numberOfOpinions > 1) {
      const indexActiveFeedback = setInterval(() => {
        setIndexOfActiveFeedback((prevState) => {
          if (prevState === numberOfOpinions - 1) return 0;
          return prevState + 1;
        });
      }, 10000);
      return () => clearInterval(indexActiveFeedback);
    }
  }, [indexOfActiveFeedback, numberOfOpinions]);

  const handleActiveFeedback = (direction: string) => {
    if (numberOfOpinions > 1) {
      if (direction === "left") {
        setIndexOfActiveFeedback((prevState) => {
          if (prevState === 0) return numberOfOpinions - 1;
          return prevState - 1;
        });
      } else if (direction === "right") {
        setIndexOfActiveFeedback((prevState) => {
          if (prevState === numberOfOpinions - 1) return 0;
          return prevState + 1;
        });
      }
    }
  };
  const uploadOpinions = function (snapshot: any) {
    const opinionArray: Array<string> = [];

    snapshot.forEach(function (childSnapshot: any) {
      opinionArray.push(childSnapshot.child("opinion").val());
    });
    setOpinions(opinionArray);
  };
  useEffect(() => {
    const ref = firebase.database().ref("app/data/form").limitToLast(3);
    ref.on("value", uploadOpinions);
    return () => {
      ref.off("value", uploadOpinions);
    };
  }, []);

  return (
    <section className="feedback">
      <h4 className="feedback__title">Najświeższe opinie</h4>
      <div className="feedback__opinions">
        <span
          onClick={() => handleActiveFeedback("left")}
          className="feedback__left"
        >
          <IoIosArrowBack />
        </span>
        <p className="feedback__p">
          {numberOfOpinions > 0 ? opinions[indexOfActiveFeedback] : "Brak"}
        </p>
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
