import React, { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import { User, Diet } from "./components";
import "./settings.scss";
export interface Props {}
const Settings: React.FC<Props> = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {currentUser && (
        <div className="settings">
          <User currentUser={currentUser} />
          <Diet currentUser={currentUser} />
        </div>
      )}
    </>
  );
};

export default Settings;
