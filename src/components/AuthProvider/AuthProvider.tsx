import React, { useEffect, useState } from "react";
import fire from "fire";
import { LoadingIndicator } from "components";
export const AuthContext = React.createContext({});
export interface Props {}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const writeUserData = (userId: string, email: string) => {
    fire
      .database()
      .ref("users/" + userId)
      .set({
        email: email,
      });
  };
  useEffect(() => {
    fire.auth().onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setPending(false);
      if (user) {
        let rootRef = fire.database().ref("users/");
        rootRef.child(user.uid).once("value", function (snapshot) {
          var exists = snapshot.val() !== null;
          if (!exists) {
            console.log("To konto nie ma bazy danych");
            writeUserData(user.uid, user.email);
          } else {
            console.log("To konto ma baze danych");
          }
        });
      }
    });
  }, []);

  if (pending) {
    return <LoadingIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
