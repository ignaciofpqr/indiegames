import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <h2>Hey, Nacho here. Welcome.</h2>
      <p>
        This is just a warm-up app. No need for fancy CSS or complex logic. The
        goal is simply get back into the groove. Have fun!
      </p>
      <div className="welcome__buttons__container">
        <Button onClick={() => navigate("/wpm")}>Go to Words Per Minute</Button>
        <Button onClick={() => navigate("/memotest")}>Go to Memotest</Button>
      </div>
    </div>
  );
}
