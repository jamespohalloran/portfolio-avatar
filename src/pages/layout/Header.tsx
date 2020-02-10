import React from "react";
import Link from "next/link";

interface Props {
  showNav?: boolean;
}

const Header = ({ showNav = true }: Props) => {
  return (
    <div id="header">
      <div id="logo">
        <Link href="/">
          <a>James O'Halloran</a>
        </Link>
      </div>
      {showNav && (
        <div id="header-nav">
          <Link href="/about">
            <a>About Me</a>
          </Link>
          <Link href="/posts">
            <a>Blog</a>
          </Link>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
