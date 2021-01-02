import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__info">
        <h5 className="footer__h5">To do workout</h5>
        <p className="footer__text">
          Aplikacja umożliwiająca łatwiejsze zarządzanie swoimi treningami,
          projekt w ciągłym rozwoju.
        </p>
      </div>
      <p className="footer__rights">© 2020 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
