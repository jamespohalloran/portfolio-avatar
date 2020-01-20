import React, { useEffect } from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import { ReactComponent as LighthouseBG } from "../../static/lighthouse.svg";
import anime from "animejs";
import { motion } from "framer-motion";
import { ScrollContainer } from "../../helpers/ScrollContainer";
import Link from "next/link";
import { Header } from "./Header";

let easing = [0.175, 0.85, 0.42, 0.96];
const backVariants = {
  exit: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    transition: {
      duration: 0.5,
      ease: easing
    }
  },
  enter: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: {
      delay: 0,
      duration: 0.5,
      ease: easing
    }
  }
};

const About: React.FC = () => {
  useEffect(() => {
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

        const sunEl = document.querySelector(`#bio #sun`);
        if (sunEl) {
          sunEl.classList.add("rising");
        }
        anime({
          targets: "#bio #sun",
          duration: 2000,
          easing: "easeInOutSine",
          cy: "-70"
        });
        console.log("bio svg");
        anime({
          targets: "#bio svg",
          duration: 4000,
          stroke: "#000"
        });
      }
    });
  }, []);

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div variants={backVariants}>
        <div id="tansition-bg" />
      </motion.div>

      <ScrollContainer id="bio">
        <Header />
        <div className="bio-blurb">
          <h2>About Me</h2>
          <p>
            James O'Halloran is a software developer from Prince Edward Island,
            Canada. James created the video game Miner Meltdown, and now spends
            most of his time making tools to make web development extra awesome.
            He has over 10 years of experience working as a developer. Oh! and
            he also runs the sock company, awkosock.com, with his lovely wife!
          </p>
          <span className="contact-btn">
            <Link href="/contact">
              <a>Contact Me</a>
            </Link>
          </span>
        </div>
        <LighthouseBG className="lighthouse" />
      </ScrollContainer>
      <footer></footer>
    </motion.div>
  );
};

export default About;
