import React from "react";
import "./backgroundImage.scss";
import { Button } from "components";
import { useHistory } from "react-router-dom";

const BackgroundImage = () => {
  const history = useHistory();
  const handleRegister = () => {
    history.push(`/login`);
  };
  return (
    <section className="background-image">
      <div className="background-image__div">
        <h2 className="background-image__h2">To do workout</h2>
        <p className="background-image__p">
          Wejdź na wyższy poziom trenowania!
        </p>
        <Button onClick={handleRegister}>Zarejestruj się</Button>
      </div>
    </section>
  );
};

export default BackgroundImage;
