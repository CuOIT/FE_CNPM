import { render } from "@testing-library/react";
import { redirect } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
  return (
    <div id="welcome">
      <h1 id="welcome-text">Welcome to KA COFFEE</h1>
    </div>
  );
};
export default HomePage;
