import React, { useEffect, useState } from "react";
import "../static/css/App.css";
import "../static/css/avatar.css";
import { ReactComponent as Avatar } from "../static/avatar.svg";
import anime from "animejs";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "./layout/Header";
import FadeWrapper, { easing } from "../helpers/FadeWrapper";
import { SocialFooter } from "./layout/SocialFooter";

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

const Homepage: React.FC = () => {
  const [avatarState, setAvatarState] = useState<AVATAR_STATE_ID>("Head-ref");

  const [isMobile, setIsMobile] = useState(false);
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
    setIsMobile(window.innerWidth <= 500);
  }, []);
  useEffect(() => {
    rotateTo(AVATAR_STATES.filter(a => a.id == avatarState)[0]);
  }, [avatarState]);

  return (
    <motion.div animate="enter" exit="exit">
      <div className="App">
        <Header showNav={false} />
        <div>
          <header className="App-header">
            <FadeWrapper
              fadeIn
              overrides={{
                exit: {
                  opacity: 0,
                  transition: {
                    duration: isMobile ? 2 : 0.5,
                    ease: easing
                  }
                }
              }}
            >
              <div id="about-intro">
                <h1>
                  Hey! I'm James O'Halloran, <br />a software developer from
                  PEI, Canada
                </h1>
              </div>
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
                <Link href="/posts">
                  <a
                    className={avatarState == "Speech-ref" ? "highlighted" : ""}
                    onMouseOver={() => {
                      setAvatarState("Speech-ref");
                    }}
                  >
                    Blog
                  </a>
                </Link>
                <Link href="/projects">
                  <a
                    className={
                      avatarState == "Videogames-ref" ? "highlighted" : ""
                    }
                    onMouseOver={() => {
                      setAvatarState("Videogames-ref");
                    }}
                  >
                    Projects
                  </a>
                </Link>
              </div>
              <SocialFooter />
            </FadeWrapper>
          </header>
        </div>
      </div>

      <footer></footer>
    </motion.div>
  );
};

export default Homepage;
