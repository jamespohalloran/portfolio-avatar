import React, { useEffect, useState } from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import { ReactComponent as Avatar } from "../../static/avatar.svg";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse.svg";
import { ReactComponent as Mailbox } from "../../static/mailbox.svg";
import anime from "animejs";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollContainer } from "../../helpers/ScrollContainer";
import { Header } from "./Header";

type AVATAR_STATE_ID = "Head-ref" | "Speech-ref" | "Videogames-ref";
interface AvatarState {
  id: AVATAR_STATE_ID;
  rot: number;
  effects?: () => void;
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
    rot: -180,
    effects: () => {
      const arm = document.querySelector(`#Head .Arm`);
      anime({
        targets: [arm],
        d: "M224,84l-43,52l-0,12l12,10l32,-20",
        duration: 600,
        loop: true,
        direction: "alternate",
        easing: "linear"
      });
    }
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

  if (state.effects) {
    state.effects();
  }
  rectElements.forEach(path => {
    const className = path.classList[0];

    const rotatableRect = document.querySelector(`#Head .${className}`) as any;
    anime({
      targets: [rotatableRect],
      x: parseInt(path.getAttribute("x") || "0"),
      y: parseInt(path.getAttribute("y") || "0"),
      d: path.getAttribute("d"),
      scale: path.getAttribute("data-hidden") == "true" ? 0 : 1,
      duration: 400,
      easing: "easeInQuad",
      backgroundColor: [
        { value: "#FFF" } // Or #FFFFFF
      ]
    });
  });
};

let easing = [0.175, 0.85, 0.42, 0.96];
const backVariants = {
  exit: {
    // x: 100,
    backgroundColor: "rgba(0, 0, 0, 1)",
    transition: {
      duration: 0.5,
      ease: easing
    }
  },
  enter: {
    // x: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: {
      delay: 0,
      duration: 0.5,
      ease: easing
    }
  }
};

const App: React.FC = () => {
  const [avatarState, setAvatarState] = useState<AVATAR_STATE_ID>("Head-ref");

  useEffect(() => {
    face = document.getElementById("avatar") as any;

    anime({
      targets: document.querySelectorAll(`#Head *:not(.Arm)`),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1000,
      delay: function(el, i) {
        return i * 50;
      },
      direction: "alternate",
      loop: false
    });
  }, []);
  useEffect(() => {
    rotateTo(AVATAR_STATES.filter(a => a.id == avatarState)[0]);
  }, [avatarState]);

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div id="tansition-bg" variants={backVariants}></motion.div>
      <ScrollContainer className="App">
        <Header showNav={false} />
        <div>
          <header className="App-header">
            <Avatar id="avatar" />
            <div id="hero-links">
              <Link href="/about">
                <a
                  className={avatarState == "Head-ref" ? "highlighted" : ""}
                  onMouseOver={() => {
                    setAvatarState("Head-ref");
                  }}
                >
                  About Me
                </a>
              </Link>
              <a
                className={avatarState == "Speech-ref" ? "highlighted" : ""}
                onMouseOver={() => {
                  setAvatarState("Speech-ref");
                }}
              >
                Blog
              </a>
              <a
                className={avatarState == "Videogames-ref" ? "highlighted" : ""}
                onMouseOver={() => {
                  setAvatarState("Videogames-ref");
                }}
              >
                Projects
              </a>
            </div>
          </header>
        </div>
      </ScrollContainer>

      <footer></footer>
    </motion.div>
  );
};

export default App;
