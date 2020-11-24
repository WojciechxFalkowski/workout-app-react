import React, { useState, useEffect, useContext } from "react";
import { User, Diet } from "./components";

import { AuthContext } from "components/AuthProvider/AuthProvider";
export interface Props {}

const Settings: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      Settings
      <User />
      <Diet />
    </>
  );
};

export default Settings;
