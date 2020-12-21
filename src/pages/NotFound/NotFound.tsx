import React from "react";
import "./notFound.scss";
import { Button } from "components";
import { useHistory } from "react-router-dom";
export interface Props {}

const NotFound: React.FC<Props> = () => {
  const history = useHistory();
  const handleBackToHomePage = () => {
    history.push("/");
  };
  return (
    <main className="not-found">
      <div className="not-found__div">
        <h1 className="not-found__p">404 - strona nie istnieje</h1>
        <Button onClick={handleBackToHomePage}>
          Przejdź do strony głównej
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
