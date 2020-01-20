import React, { useEffect } from "react";
import "../../static/css/App.css";
import "../../static/css/avatar.css";
import { ReactComponent as Mailbox } from "../../static/mailbox.svg";
import anime from "animejs";
import { motion } from "framer-motion";
import { ScrollContainer } from "../../helpers/ScrollContainer";
import { Header } from "./Header";
let easing = [0.175, 0.85, 0.42, 0.96];
const backVariants = {
  exit: {
    // x: 100,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing
    }
  },
  enter: {
    // x: 0,
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.5,
      ease: easing
    }
  }
};

const Contact: React.FC = () => {
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
};

export default Contact;
