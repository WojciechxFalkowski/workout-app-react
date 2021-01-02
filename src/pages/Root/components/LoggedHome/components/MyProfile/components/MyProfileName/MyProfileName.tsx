import React from "react";
import { Link } from "react-router-dom";
import "./myProfileName.scss";
export type props = {
  name: string;
  surname: string;
};

const MyProfileName = ({ name, surname }: props) => {
  return (
    <div className="my-profile-name">
      <p className="my-profile-name__text">Mój profil</p>
      <div className="my-profile-name__div-initials">
        <span className="my-profile-name__initials">
          {name && surname ? (
            `${name[0].toUpperCase()}${surname[0].toUpperCase()}`
          ) : (
            <Link className="my-profile-name__link" to="settings">
              ?
            </Link>
          )}
        </span>
      </div>
      <span className="my-profile-name__name">
        {name && surname ? (
          `${name} ${surname}`
        ) : (
          <Link className="my-profile-name__link" to="settings">
            -
          </Link>
        )}
      </span>
    </div>
  );
};

export default MyProfileName;
