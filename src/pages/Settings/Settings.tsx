import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { LoadingIndicator } from "components";
import { User, Diet, DeleteAccount } from "./components";
import "./settings.scss";
const Settings = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <main className="settings">
      {currentUser ? (
        <>
          <User currentUser={currentUser} />
          <Diet currentUser={currentUser} />
          <DeleteAccount currentUser={currentUser} />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </main>
  );
};

export default Settings;
