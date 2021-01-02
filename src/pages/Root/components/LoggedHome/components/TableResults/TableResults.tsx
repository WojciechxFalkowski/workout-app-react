import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "./tableResults.scss";
import { AuthContext } from "components/AuthProvider/AuthProvider";
type users = {
  name: string;
  surname: string;
  numberOfTrainings: number;
};

const TableResults = () => {
  const { currentUser } = useContext(AuthContext);
  const [statistics, setStatistics] = useState<Array<users>>();
  const handleStatistics = function (snapshot: any) {
    const usersStatistics: Array<users> = [];
    snapshot.forEach(function (childSnapshot: any) {
      const name = childSnapshot.child("settings/user/name").val();
      const surname = childSnapshot.child("settings/user/surname").val();
      if (name && surname) {
        const numberOfTrainings = childSnapshot
          .child("trainings")
          .numChildren();
        usersStatistics.push({ name, surname, numberOfTrainings });
      }
    });
    usersStatistics.sort((a, b) => b.numberOfTrainings - a.numberOfTrainings);
    setStatistics(usersStatistics.slice(0, 10));
  };
  useEffect(() => {
    if (currentUser) {
      const ref = firebase.database().ref("users");
      ref.on("value", handleStatistics);
      return () => {
        ref.off("value", handleStatistics);
      };
    }
  }, [currentUser]);
  return (
    <section className="table-results">
      <h3 className="table-results__h3">Statystyki</h3>
      <table className="table-results__table">
        <thead>
          <tr className="table-results__tr">
            <th className="table-results__th">Miejsce</th>
            <th className="table-results__th">Imię</th>
            <th className="table-results__th">Nazwisko</th>
            <th className="table-results__th">Liczba treningów</th>
          </tr>
        </thead>
        <tbody>
          {statistics &&
            statistics.map((item, index) => {
              return (
                <tr
                  className="table-results__tr"
                  key={`${item.name}/${item.surname}/${item.numberOfTrainings}`}
                >
                  <td className="table-results__td">{index + 1}</td>
                  <td className="table-results__td">{item.name}</td>
                  <td className="table-results__td">{item.surname}</td>
                  <td className="table-results__td">
                    {item.numberOfTrainings}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <span className="table-results__span"></span>
    </section>
  );
};

export default TableResults;
