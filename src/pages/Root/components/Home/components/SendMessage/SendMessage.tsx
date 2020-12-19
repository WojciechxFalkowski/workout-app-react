import React, { useState } from "react";
import "./sendMessage.scss";
import { FormTemplate } from "components";
import { required, composeValidators } from "utils/validation";
import { useCookies } from "react-cookie";
export interface Props {}

const SendMessage: React.FC<Props> = () => {
  const [isSendForm, setIsSendForm] = useCookies(["sendForm"]);
  const [isSameSession, setIsSameSession] = useState(false);
  const handleSubmitOpinion = () => {
    console.log("dziala");
    const date = new Date();
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const dayOfMonth = date.getDate();
    setIsSendForm("sendForm", "formularz wysłany", {
      expires: new Date(year, month, dayOfMonth, hours, minutes + 2),
    });
    setIsSameSession(true);
  };
  console.log("cookies", isSendForm);
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
        validate: composeValidators(required("To pole jest wymagane!")),
        initialValue: undefined,
        text: "Twoja opinia",
        placeholder: "Twoja opinia...",
        component: "textarea",
        type: "text",
      },
    ],
    button: {
      type: "submit",
      text: "Wyślij",
    },
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
