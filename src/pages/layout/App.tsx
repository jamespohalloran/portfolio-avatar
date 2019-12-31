import React, { useEffect, useState, useRef } from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import { ReactComponent as Avatar } from "../../static/avatar.svg";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse.svg";
import { ReactComponent as Mailbox } from "../../static/mailbox.svg";
import anime from "animejs";
import Head from "next/head";
import Link from "next/link";

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
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div id="landing-container">
        <ScrollContainer className="App">
          <div id="header">
            <div id="logo">James O'Halloran</div>
          </div>
          <div>
            <header className="App-header">
              <Avatar id="avatar" />
              <div id="hero-links">
                <a
                  href="#bio"
                  className={avatarState == "Head-ref" ? "highlighted" : ""}
                  onMouseOver={() => {
                    setAvatarState("Head-ref");
                  }}
                >
                  About Me
                </a>

                <a
                  className={avatarState == "Speech-ref" ? "highlighted" : ""}
                  onMouseOver={() => {
                    setAvatarState("Speech-ref");
                  }}
                >
                  Blog
                </a>
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
              </div>
            </header>
          </div>
        </ScrollContainer>
        <ScrollContainer
          id="bio"
          onActivate={() => {
            anime({
              targets: document.querySelectorAll(`#bio svg *:not(ellipse)`),
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: "easeInOutSine",
              duration: 1000,
              delay: function(el, i) {
                return i * 150;
              },
              complete: function() {},
              direction: "alternate",
              loop: false
            });
            anime({
              targets: "#bio path",
              // left: "240px",
              duration: 2000,
              fillOpacity: 1,
              easing: "easeInOutSine",
              complete: function() {
                anime({
                  targets: "#bio",
                  // left: "240px",
                  duration: 2000,
                  backgroundColor: "rgba(255, 209, 140, 0.42)",

                  easing: "easeInOutSine"
                });
                document.querySelector(`#bio #sun`)!.classList.add("rising");
                anime({
                  targets: "#bio #sun",
                  duration: 2000,
                  easing: "easeInOutSine",
                  cy: "-70"
                });
                anime({
                  targets: "#bio svg",
                  duration: 4000,
                  stroke: "#000"
                });
              }
            });
          }}
        >
          <div className="bio-blurb">
            <h3>About Me</h3>
            <p>
              James O'Halloran is a software developer from Prince Edward
              Island, Canada. James created the video game Miner Meltdown, and
              now spends most of his time making tools to make web development
              extra awesome. He has over 10 years of experience working as a
              developer. Oh! and he also runs the sock company, awkosock.com,
              with his lovely wife!
            </p>
          </div>
          <LighthouseBG />
        </ScrollContainer>
        <ScrollContainer
          id="portfolio"
          onActivate={() => {
            anime({
              targets: document.querySelectorAll(`#mailbox *`),
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: "easeInOutSine",
              duration: 1000,
              fillOpacity: 1,
              delay: function(el, i) {
                return i * 150;
              },
              complete: function() {
                anime({
                  targets: [document.querySelector(`#mailbox-latch`)],
                  rotate: -90,
                  duration: 2000
                });
              }
            });
          }}
        >
          <div className="portfolio-inner">
            <h2>Contact Me</h2>
            <div className="contact-form">
              <input name="name" />
              <input name="email" />
              <textarea name="message" />
            </div>
          </div>
          <Mailbox id="mailbox" />
        </ScrollContainer>
        <footer></footer>
      </div>
    </>
  );
};

export const ScrollContainer = ({ children, onActivate, ...props }: any) => {
  const ref = useRef() as any;
  const [hasActivated, setHasActivated] = useState(false);
  useEffect(() => {
    const checkForInView = function() {
      if (ref.current && isInViewPort(ref.current)) {
        ref.current.classList.add("active");
        ref.current.classList.add("activated");

        if (!hasActivated && onActivate) {
          onActivate();
          setHasActivated(true);
        }
      } else {
        ref.current.classList.remove("active");
      }
    };
    checkForInView();
    document.body.addEventListener("scroll", checkForInView, false);

    return () => {
      document.body.removeEventListener("scroll", checkForInView);
    };
  }, [hasActivated]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

function isInViewPort(element: Element) {
  // Get the bounding client rectangle position in the viewport
  var bounding = element.getBoundingClientRect();

  // Checking part. Here the code checks if it's *fully* visible
  // Edit this part if you just want a partial visibility
  if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  ) {
    console.log("In the viewport! :)");
    return true;
  } else {
    console.log("Not in the viewport. :(");
    console.log(JSON.stringify(bounding));
    return false;
  }
}

export default App;
