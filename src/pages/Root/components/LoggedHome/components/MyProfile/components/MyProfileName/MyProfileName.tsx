import React from "react";
import { Link } from "react-router-dom";
import "./myProfileName.scss";
export interface Props {
  name: string;
  surname: string;
}

const MyProfileName: React.FC<Props> = ({ name, surname }) => {
  return (
    <div className="my-profile-name">
      <span className="my-profile-name__text">Mój profil</span>
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
