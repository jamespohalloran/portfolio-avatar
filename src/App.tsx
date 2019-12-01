import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./avatar.css";
import { TweenLite } from "gsap";
const App: React.FC = () => {
  useEffect(() => {
    const myElement = document.getElementById("avatar") as any;
    let rotation = 0;
    setInterval(
      () => {
        if (Math.abs(rotation) <= 180) {
          TweenLite.to(myElement, 1, {
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
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 251 251"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          id="avatar"
        >
          <path
            id="HeadOutline"
            d="M187.853,1.5l-105.89,0l-38.113,38.753l0.672,46.601l-43.022,22.553l0.128,12.047l11.609,12.588l32.056,-1.647l-1.458,97.369l29.588,19.363l131.794,-1.554l43.171,-62.83l0.947,-120.74l-61.482,-62.503Z"
          />
          <rect id="Mouth" x="66.132" y="212.719" width="67.1" height="6.206" />
          <rect
            id="EyeLeft"
            x="45.335"
            y="149.382"
            width="28.569"
            height="29.163"
          />
          <rect
            id="EyeRight"
            x="133.526"
            y="149.822"
            width="29.648"
            height="29.163"
          />
          <g id="RaptorLogo">
            <rect x="107.522" y="48.038" width="26.85" height="30.021" />
            <rect x="112.501" y="11.349" width="16.751" height="24.871" />
            <rect x="140.514" y="21.023" width="8.608" height="20.983" />
            <rect x="93.057" y="19.986" width="8.608" height="20.983" />
          </g>
        </svg>
        <p>James Makes Stuff</p>
      </header>
    </div>
  );
};

export default App;
