import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./Memotest.css";

const IMAGES = [
  "https://icongr.am/devicon/redhat-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/mongodb-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/docker-original-wordmark.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/react-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/git-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/nginx-original.svg?size=128&color=currentColor",
  "https://icongr.am/devicon/python-original.svg?size=128&color=currentColor",
]
  .flatMap((image) => [`a|${image}`, `b|${image}`])
  .sort(() => Math.random() - 0.5);

export default function Memotest() {
  const navigate = useNavigate();
  const [guessed, setGuessed] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
        setGuessed((guessed) => guessed.concat(selected));
      }
      setTimeout(() => setSelected([]), 1000);
    }
  }, [selected]);

  useEffect(() => {
    if (guessed.length === IMAGES.length) {
      alert("¡Ganaste!");
    }
  }, [guessed]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Memotest</h1>

      <div
        style={{
          width: "60vmin",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          marginTop: "24px",
          gap: "24px",
        }}
      >
        {IMAGES.map((image) => {
          const [, url] = image.split("|");
          return (
            <div
              key={image}
              className="memotest-card"
              onClick={() =>
                selected.length < 2 &&
                setSelected((selected) => selected.concat(image))
              }
            >
              {selected.includes(image) || guessed.includes(image) ? (
                <img
                  alt="icon"
                  src={url}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ) : (
                <img
                  alt="icon"
                  src="https://icongr.am/octicons/search.svg?size=128&color=currentColor"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <Button
        style={{
          fontSize: "14px",
          width: "160px",
          marginTop: "40px",
        }}
        onClick={() => navigate("/")}
      >
        {" "}
        Back to main
      </Button>
    </div>
  );
}
