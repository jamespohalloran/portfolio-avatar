import React, { useEffect } from "react";
import "./App.css";
import "./avatar.css";
import { TweenMax, TimelineMax } from "gsap";
import { ReactComponent as Avatar } from "./avatar.svg";
const App: React.FC = () => {
  useEffect(() => {
    const face = document.getElementById("avatar") as any;
    const hoof = document.getElementById("ClawHoof") as any;
    const clawLeft = document.getElementById("ClawLeft") as any;
    const clawTop = document.getElementById("ClawTop") as any;
    const clawRight = document.getElementById("ClawRight") as any;
    const eyeLeft = document.getElementById("EyeLeft") as any;
    const eyeRight = document.getElementById("EyeRight") as any;
    const mouth = document.getElementById("Mouth") as any;

    let rotation = 0;
    let tl = new TimelineMax();
    tl.to(
      face,
      1,
      {
        rotation: rotation -= 90
      },
      "speech"
    );
    tl.to(
      hoof,
      1,
      {
        // x: 110,
        // y: 30,
        borderRadius: "50%"
      },
      "speech"
    );
    // tl.to(
    //   clawLeft,
    //   1,
    //   {
    //     // x: 105,
    //     // y: 30,
    //     // height: 150,
    //     width: 0
    //   },
    //   "speech"
    // );
    // tl.to(
    //   clawRight,
    //   1,
    //   {
    //     // x: 43,
    //     // y: 10,
    //     // height: 110,
    //     width: 0
    //   },
    //   "speech"
    // );
    // tl.to(
    //   clawTop,
    //   1,
    //   {
    //     // x: 70,
    //     // y: 140,
    //     // height: 60,
    //     width: 0
    //   },
    //   "speech"
    // );
    // tl.to(
    //   mouth,
    //   1,
    //   {
    //     // x: 100,
    //     // y: -85,
    //     // height: 110,
    //     width: 0
    //   },
    //   "speech"
    // );
    // tl.to(
    //   eyeLeft,
    //   1,
    //   {
    //     // x: 100,
    //     // y: -85,
    //     // height: 110,
    //     width: 0
    //   },
    //   "speech"
    // );
    // tl.to(
    //   eyeRight,
    //   1,
    //   {
    //     // x: 100,
    //     // y: -85,
    //     // height: 110,
    //     width: 0
    //   },
    //   "speech"
    // );

    // setInterval(
    //   () => {
    //     if (Math.abs(rotation) <= 180) {
    //       TweenMax.to(face, 1, {
    //         rotation: rotation -= 90
    //       });
    //     }
    //   },
    //   1500,
    //   500
    // );
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
