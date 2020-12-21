import React from "react";
import "./backgroundImage.scss";
import { Button } from "components";
import { useHistory } from "react-router-dom";
export interface Props {}

const BackgroundImage: React.FC<Props> = () => {
  const history = useHistory();
  const handleRegister = () => {
    history.push(`/login`);
  };
  return (
    <section className="background-image">
      <div className="background-image__div">
        <h1 className="background-image__h1">To do workout</h1>
        <p className="background-image__p">
          Wejdź na wyższy poziom trenowania!
        </p>
        <Button onClick={handleRegister}>Zarejestruj się</Button>
      </div>
    </section>
  );
};

export default BackgroundImage;
