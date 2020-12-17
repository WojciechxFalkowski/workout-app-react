import React, { useRef } from "react";
import { MyProfileName, MyProfileRank, Ranks } from "./components";
import "./myProfile.scss";

interface currentUser {
  uid: string;
}
export interface Props {
  name: string;
  surname: string;
  currentUser: currentUser;
}

const MyProfile: React.FC<Props> = ({ name, surname, currentUser }) => {
  const refFlipper = useRef<HTMLDivElement>(null);
  const handleFlipCard = () => {
    if (refFlipper.current) {
      refFlipper.current.classList.toggle("active-card");
    }
  };
  return (
    <article className="my-profile">
      <div ref={refFlipper} className="my-profile__inner ">
        <div className="my-profile__front">
          <MyProfileName name={name} surname={surname} />
          <MyProfileRank
            currentUser={currentUser}
            handleFlipCard={handleFlipCard}
          />
        </div>
        <div className="my-profile__back">
          <Ranks handleFlipCard={handleFlipCard} />
        </div>
      </div>
    </article>
  );
};

export default MyProfile;
