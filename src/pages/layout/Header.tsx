import React from "react";
import Link from "next/link";

interface Props {
  showNav?: boolean;
}

export const Header = ({ showNav = true }: Props) => {
  return (
    <div id="header">
      <div id="logo">
        <Link href="/">James O'Halloran</Link>
      </div>
      {showNav && (
        <div id="header-nav">
          <Link href="/about">
            <a>About Me</a>
          </Link>
          <Link href="/blog">
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
