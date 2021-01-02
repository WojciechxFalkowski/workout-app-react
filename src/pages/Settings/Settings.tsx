import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { User, Diet } from "./components";
import "./settings.scss";
const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <main className="settings">
      {currentUser && (
        <>
          <User currentUser={currentUser} />
          <Diet currentUser={currentUser} />
        </>
      )}
    </main>
  );
};

export default Settings;
