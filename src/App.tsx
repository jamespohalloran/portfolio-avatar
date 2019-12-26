import React, { useEffect } from "react";
import "./App.css";
import "./avatar.css";
import { ReactComponent as Avatar } from "./Self_multidimensional.svg";
import anime from "animejs";

type AVATAR_STATE_ID = "Head-ref" | "Speech-ref" | "Videogames-ref";
interface AvatarState {
  id: AVATAR_STATE_ID;
  rot: number;
}

const AVATAR_STATES: AvatarState[] = [
  {
    id: "Head-ref",
    rot: 0
  },
  {
    id: "Speech-ref",
    rot: -90
  },
  {
    id: "Videogames-ref",
    rot: -180
  }
];

let face: Element;

const rotateTo = (state: AvatarState) => {
  anime({
    targets: [face],
    rotate: state.rot,
    duration: 2000
  });

  const rectElements = document.querySelectorAll(
    `#${state.id} rect, #${state.id} path`
  );

  rectElements.forEach(path => {
    const className = path.classList[0];

    const rotatableRect = document.querySelector(`#Head .${className}`) as any;
    anime({
      targets: [rotatableRect],
      x: parseInt(path.getAttribute("x") || "0"),
      y: parseInt(path.getAttribute("y") || "0"),
      d: path.getAttribute("d"),
      scale: path.getAttribute("data-hidden") == "true" ? 0 : 1
    });
  });
};

const App: React.FC = () => {
  useEffect(() => {
    face = document.getElementById("avatar") as any;

    let index = 0;
    setInterval(
      () => {
        rotateTo(AVATAR_STATES[++index % AVATAR_STATES.length]);
      },
      1500,
      500
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Avatar id="avatar" />

        <p>James Makes Stuff</p>
      </header>
    </div>
  );
};

export default App;
