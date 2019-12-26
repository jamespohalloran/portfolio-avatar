import React, { useEffect } from "react";
import "./App.css";
import "./avatar.css";
import { TweenMax, TweenLite, TimelineMax } from "gsap";
import { ReactComponent as Avatar } from "./Self_multidimensional.svg";
import { ReactComponent as SpeechBubble } from "./avatar.svg";
import anime from "animejs";

const App: React.FC = () => {
  useEffect(() => {
    const face = document.getElementById("avatar") as any;
    const hoof = document.querySelector("#Head .ClawHoof") as any;
    const clawLeft = document.querySelector("#Head .ClawLeft") as any;
    const clawTop = document.querySelector("#Head .ClawTop") as any;
    const clawRight = document.querySelector("#Head .ClawRight") as any;
    const eyeLeft = document.querySelector("#Head .EyeLeft") as any;
    const eyeRight = document.querySelector("#Head .EyeRight") as any;
    const mouth = document.querySelector("#Head .Mouth") as any;

    // M137,47c-5,-5 -25,-5 -30,0c-5,5 -5,25 0,30c5,5 25,5 30,0c5,-5 5,-25 0,-30Z
    anime({
      targets: [hoof],
      d: "M137,47c-5,-5 -25,-5 -30,0l0,30l30,0l0,-30Z",
      duration: 1000,
      loop: true,
      direction: "alternate",
      easing: "linear"
    });

    // var hoofSnap = Snap.select("#ClawHoof");
    // var hoofRoundSnap = Snap.select("#Round-ClawHoof");

    // var hoofPoints = hoofSnap.node.getAttribute("d");
    // var hoofRoundPoints = hoofSnap.node.getAttribute("d");

    // hoofSnap.animate({ d: hoofRoundPoints }, 1000, mina.backout, () => {});

    let rotation = 0;
    let tl = new TimelineMax();
    // TweenLite.to("#HeadOutline", 1, {
    //   morphSVG: "240,220 240,70 70,70 70,220"
    // });

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

    setInterval(
      () => {
        if (Math.abs(rotation) <= 180) {
          TweenMax.to(face, 1, {
            rotation: rotation -= 90
          });
        }
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
