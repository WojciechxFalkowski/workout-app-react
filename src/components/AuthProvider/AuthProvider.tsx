import React, { useEffect, useState, createContext } from "react";
import firebase from "firebase/app";
import { LoadingIndicator } from "components";
export const AuthContext = createContext<Partial<ContextProps>>({});
type ContextProps = { currentUser: user | null };
type user = {
  uid: string;
  displayName: string;
};
type Props = {};
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const writeUserData = (
      userId: string,
      email: string,
      name: string,
      surname: string
    ) => {
      firebase
        .database()
        .ref("users/" + userId)
        .set({
          email: email,
        });
      firebase
        .database()
        .ref("users/" + userId + "/settings/user")
        .set({
          name,
          surname,
        });
    };
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        let rootRef = firebase.database().ref("users/");
        rootRef.child(user.uid).once("value", function (snapshot: any) {
          let exists = snapshot.val() !== null;
          if (!exists) {
            const name = user.displayName.split(" ")[0];
            const surname = user.displayName.split(" ").slice(1).join(" ");
            writeUserData(user.uid, user.email, name, surname);
          } else {
          }
        });
      }
      setCurrentUser(user);
      setPending(false);
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
