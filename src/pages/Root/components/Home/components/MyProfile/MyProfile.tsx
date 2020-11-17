import React from "react";
import "./myProfile.scss";
export interface Props {}

const MyProfile: React.FC<Props> = () => {
  return (
    <div className="my-profile">
      <span className="my-profile__text">Mój profil</span>
      <div className="my-profile__div-initials">
        <span className="my-profile__initials">WF</span>
      </div>
      <span className="my-profile__name">Wojciech Falkowski</span>
      <span className="my-profile__rank">Początkujący</span>
    </div>
  );
};

export default MyProfile;
