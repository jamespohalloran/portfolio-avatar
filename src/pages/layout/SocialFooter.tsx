import React from "react";
import { ReactComponent as TwitterIcon } from "../../static/icons/twitter.svg";
import { ReactComponent as MailIcon } from "../../static/icons/envelope.svg";

export const SocialFooter = () => {
  return (
    <div id="footer-float">
      <a href="https://twitter.com/jamespohalloran" target="_blank">
        <TwitterIcon />
      </a>
      <a id="mail-icon" href="mailto:james.ohalloran@mightypebble.com">
        <MailIcon />
      </a>
    </div>
  );
};
