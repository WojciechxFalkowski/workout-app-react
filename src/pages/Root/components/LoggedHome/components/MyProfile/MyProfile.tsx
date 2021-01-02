import React, { useRef } from "react";
import { MyProfileName, MyProfileRank, Ranks } from "./components";
import "./myProfile.scss";

type currentUser = {
  uid: string;
};
export type props = {
  name: string;
  surname: string;
  currentUser: currentUser;
};

const MyProfile = ({ name, surname, currentUser }: props) => {
  const refFlipper = useRef<HTMLDivElement>(null);
  const handleFlipCard = () => {
    if (refFlipper.current) {
      refFlipper.current.classList.toggle("active-card");
    }
  };
  return (
    <section className="my-profile">
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
    </section>
  );
};

export default MyProfile;
