import React from "react";
import "./home.scss";
import {
  BackgroundImage,
  Features,
  Feedback,
  SendMessage,
  Footer,
} from "./components";
export interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <main className="home">
      <BackgroundImage />
      <Features />
      <Feedback />
      <SendMessage />
      <Footer />
    </main>
  );
};

export default Home;
