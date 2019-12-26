import React, { useEffect } from "react";
import "./App.css";
import "./avatar.css";
import { ReactComponent as Avatar } from "./Self_multidimensional.svg";
import anime from "animejs";

// interface Shape {
//   hoof: string;
//   clawLeft: string;
//   clawTop: string;
//   clawRight: string;
//   eyeLeft: string;
//   eyeRight: string;
//   mouth: string;
//   outline: string;
// }

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

// const getShapes = (root: string): Shape => {
//   return {
//     hoof: document.querySelector(`#${root} .ClawHoof`) as any,
//     clawLeft: document.querySelector(`#${root} .ClawLeft`) as any,
//     clawTop: document.querySelector(`#${root} .ClawTop`) as any,
//     clawRight: document.querySelector(`#${root} .ClawRight`) as any,
//     eyeLeft: document.querySelector(`#${root} .EyeLeft`) as any,
//     eyeRight: document.querySelector(`#${root} .EyeRight`) as any,
//     mouth: document.querySelector(`#${root} .Mouth`) as any,
//     outline: document.querySelector(`#${root} .HeadOutline`) as any
//   };
// };

const rotateTo = (state: AvatarState) => {
  anime({
    targets: [face],
    rotate: state.rot,
    duration: 2000
  });

  const rectElements = document.querySelectorAll(`#${state.id} rect`);

  rectElements.forEach(rect => {
    const className = rect.classList[0];
    console.log(`className ${JSON.stringify(rect.classList[0])}`);

    const rotatableRect = document.querySelector(`#Head .${className}`) as any;
    anime({
      targets: [rotatableRect],
      x: parseInt(rect.getAttribute("x") || "0"),
      y: parseInt(rect.getAttribute("y") || "0")
    });
  });
};

const App: React.FC = () => {
  useEffect(() => {
    face = document.getElementById("avatar") as any;

    // const outlinePath = document
    //   .querySelector("#Videogames .HeadOutline")!
    //   .getAttribute("d");

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
