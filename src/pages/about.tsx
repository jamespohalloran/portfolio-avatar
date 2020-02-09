import React, { useEffect } from "react";
import "../static/css/App.css";
import "../static/css/avatar.css";
import { ReactComponent as LighthouseBG } from "../static/lighthouse.svg";
import anime from "animejs";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "./layout/Header";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import FadeWrapper from "../helpers/FadeWrapper";
import { SocialFooter } from "./layout/SocialFooter";

export default function About(props: any) {
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
        document.body.setAttribute("bg-state", "bright");

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
      }
    });

    return () => {
      document.body.setAttribute("bg-state", "light");
    };
  }, []);

  const markdownBody = props.content;
  const frontmatter = props.data;

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <div id="bio">
        <Header />
        <FadeWrapper>
          <div className="bio-blurb">
            <h2>{frontmatter.title}</h2>
            <div className="boxed-content">
              <ReactMarkdown source={markdownBody} />
              <Link href="/contact">
                <div className="contact-btn">
                  <a>{frontmatter.contactButton}</a>
                </div>
              </Link>
            </div>
          </div>
          <LighthouseBG className="lighthouse" />
        </FadeWrapper>
      </div>
      <footer></footer>
    </motion.div>
  );
}

About.getInitialProps = async function(context: any) {
  // const content = await import("./../content/posts/");
  const content = await require(`../content/about.md`);

  const data = matter(content.default);
  return {
    ...data
  };
};
