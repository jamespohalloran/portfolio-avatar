import React, { useEffect } from "react";
import "../static/css/App.css";
import "../static/css/avatar.css";
import { ReactComponent as Mailbox } from "../static/mailbox.svg";
import anime from "animejs";
import { motion } from "framer-motion";
import { ScrollContainer } from "../helpers/ScrollContainer";
import { Header } from "./layout/Header";
import { initialPageStates } from "../helpers/pageStates";
let easing = [0.175, 0.85, 0.42, 0.96];

interface Props {
  pathName: string;
}

export default function Contact({ pathName }: Props) {
  console.log(`slug ${pathName}`);
  useEffect(() => {
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
  }, []);

  const backVariants = {
    exit: () => {
      // const vals = {
      //   ...initialPageStates[window.location.pathname],
      //   opacity: 1
      // };
      // console.log(vals);
      console.log(`slug ${pathName}`);
      return {
        ...initialPageStates[pathName],
        opacity: 1
      };
    },
    enter: {
      // x: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: easing
      }
    }
  };

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div variants={backVariants}>
        <div id="tansition-bg" />
      </motion.div>
      <ScrollContainer id="portfolio">
        <Header />
        <Mailbox id="mailbox" />
        <div className="portfolio-inner">
          <h2>Contact Me</h2>
          <div className="contact-form">
            <div>
              <label>Name</label>
              <input name="name" type="text" />
              <label>Email</label>
              <input name="email" type="email" />
              <label>Message</label>
              <textarea name="message" rows={5} />
            </div>
          </div>
        </div>
      </ScrollContainer>
      <footer></footer>
    </motion.div>
  );
}

Contact.getInitialProps = async function(ctx: any) {
  console.log(`slug! ${JSON.stringify(ctx.pathname)}`);

  return {
    pathName: ctx.pathname
  };
};
