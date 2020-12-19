import React from "react";
import "./footer.scss";
export interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="footer">
      <div className="footer__info">
        <h2 className="footer__h2">To do workout</h2>
        <p className="footer__text">
          Aplikacji umożliwiający łatwiejsze zarządzanie swoimi treningami,
          projekt w ciągłym rozwoju.
        </p>
      </div>
      <p className="footer__rights">© 2020 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
