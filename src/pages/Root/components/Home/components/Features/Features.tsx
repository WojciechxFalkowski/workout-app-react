import React from "react";
import "./features.scss";
import { Feature } from "./components";
import { BsCardText } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { RiRunLine } from "react-icons/ri";
import { AiOutlineBarChart } from "react-icons/ai";
export interface Props {}

const Features: React.FC<Props> = () => {
  return (
    <section className="features">
      <h2 className="features__title">Możliwości</h2>
      <Feature
        icon={<BsCardText />}
        title="Plan treningowy"
        text="Zaprojektuj zestaw ćwiczeń do swojej aktualnej formy i pozwoli osiągnąć
        wymarzoną sylwetkę oraz zadbać o zdrowie."
      />
      <Feature
        icon={<GiMeal />}
        title="Zaplanuj diete"
        text="Prawidłowa dieta jest kluczowa dla zdrowia, kondycji i świetnego samopoczucia."
      />
      <Feature
        icon={<RiRunLine />}
        title="Motywacja"
        text="W osiągnięciu sukcesu najważniejsze jest to, co dzieje się w głowie. Trenuj regularnie i patrz jak rośnie Twoja pozycja w rankingu."
      />
      <Feature
        icon={<AiOutlineBarChart />}
        title="Monitorowanie rozwoju ciala"
        text="Wykresy to najlepszy przyjaciel sportowca. Dzięki aplikacji możesz śledź
        przyrost swojej siły!"
      />
    </section>
  );
};

export default Features;
