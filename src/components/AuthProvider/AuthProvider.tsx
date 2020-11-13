import React, { useEffect, useState, createContext } from "react";
import firebase from "firebase/app";
import { LoadingIndicator } from "components";
export const AuthContext = createContext<Partial<ContextProps>>({});
type ContextProps = { currentUser: user | null };
interface user {
  uid: string;
}
interface Props {}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const writeUserData = (userId: string, email: string) => {
      firebase
        .database()
        .ref("users/" + userId)
        .set({
          email: email,
        });
    };
    firebase.auth().onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setPending(false);
      if (user) {
        let rootRef = firebase.database().ref("users/");
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
