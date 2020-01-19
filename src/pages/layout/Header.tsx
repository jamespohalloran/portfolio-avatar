import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <div id="header">
      <div id="logo">
        <Link href="/">James O'Halloran</Link>
      </div>
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
    </div>
  );
};
