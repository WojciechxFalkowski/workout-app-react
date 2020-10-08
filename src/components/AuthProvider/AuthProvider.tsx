import React, { useEffect, useState, createContext } from "react";

import { LoadingIndicator } from "components";
export const AuthContext = createContext<Partial<ContextProps>>({});
type ContextProps = { currentUser: user | null };
interface user {
  uid: string;
}
interface Props {
  fire: any;
}
const AuthProvider: React.FC<Props> = ({ children, fire }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const writeUserData = (userId: string, email: string) => {
      fire
        .database()
        .ref("users/" + userId)
        .set({
          email: email,
        });
    };
    fire.auth().onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setPending(false);
      if (user) {
        let rootRef = fire.database().ref("users/");
        rootRef.child(user.uid).once("value", function (snapshot: any) {
          let exists = snapshot.val() !== null;
          if (!exists) {
            // console.log("To konto nie ma bazy danych");
            writeUserData(user.uid, user.email);
          } else {
            // console.log("To konto ma baze danych");
          }
        });
      }
    });
  }, [fire]);

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
