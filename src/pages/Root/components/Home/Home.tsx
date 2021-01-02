import React from "react";
import "./home.scss";
import {
  BackgroundImage,
  Features,
  Feedback,
  SendMessage,
  Footer,
} from "./components";

const Home = () => {
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
