import React, { useState } from "react";
import "./sendMessage.scss";
import { FormTemplate } from "components";
import { required, composeValidators } from "utils/validation";
import { useCookies } from "react-cookie";
import {
  dayMonthYearWithSeparator,
  hoursMinutesWithSeparator,
} from "utils/dateFunctions";
import { minValue, maxValue } from "utils/validation";
import firebase from "firebase/app";
interface values {
  name: string;
  surname: string;
  opinion: string;
}
export interface Props {}

const SendMessage: React.FC<Props> = () => {
  const [isSendForm, setIsSendForm] = useCookies(["sendForm"]);
  const [isSameSession, setIsSameSession] = useState(false);

  const formFields = {
    fields: [
      {
        name: "name",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Twoje imię",
        placeholder: "Twoje imię",
        type: "text",
      },
      {
        name: "surname",
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Twoje nazwisko",
        placeholder: "Twoje nazwisko",
        type: "text",
      },
      {
        name: "opinion",
        validate: composeValidators(
          required("To pole jest wymagane!"),
          minValue(10, "Tekst musi mieć conajmniej 10 znaków"),
          maxValue(400, "Tekst nie może być dłuższy niż 400 znaków")
        ),
        initialValue: undefined,
        text: "Twoja opinia",
        placeholder: "Twoja opinia...",
        component: "textarea",
        type: "text",
      },
    ],
    button: {
      text: "Wyślij",
    },
  };
  const handleSubmitOpinion = (values: values) => {
    const date = new Date();
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const dayOfMonth = date.getDate();
    const newDate = new Date(year, month, dayOfMonth + 14);
    const modifiedDate =
      dayMonthYearWithSeparator(new Date(date), "-", "yes") +
      "T" +
      hoursMinutesWithSeparator(new Date(date), ":");
    firebase.database().ref("app/data/form").push().set({
      name: values.name,
      surname: values.surname,
      opinion: values.opinion,
      date: modifiedDate,
    });
    setIsSendForm("sendForm", "formularz wysłany", {
      expires: newDate,
    });
    setIsSameSession(true);
  };

  return (
    <section className="send-message">
      {isSendForm.sendForm === "formularz wysłany" ? (
        <p className="send-message__sent">
          {isSendForm.sendForm === "formularz wysłany" && isSameSession
            ? "Dzięki za opinię!"
            : "Formularz został już wysłany!"}
        </p>
      ) : (
        <FormTemplate
          formFields={formFields}
          handleSubmit={handleSubmitOpinion}
        />
      )}
    </section>
  );
};

export default SendMessage;
