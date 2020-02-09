---
date: "2020-01-22T07:00:00.000Z"
title: "Why I chose NextJS for my portfolio"
---

Hey there! Welcome to my brand spankin' new portfolio.
Making a personal site has been on my list for a while now, and I've finally just got around to it. For background, I'm a software developer of 10+ years, with a knack for starting up random projects, so now I have a place to put them all :).

I've been working with the "Jamstack" for a few years now, and switching from Wordpress to Static Sites Generators has been a game-changer. Having my site built from git (including the sites content), I feel like I'm in control. If my site breaks, I can always trace it back to a specific commit.

Hugo was my first static site generator of choice. It was great! I never fully got used to the golang syntax, so evenmaking basic things like for loops was always a bit of a hangup.

Then came Gatsby. It was written in React which was a revelation for me (as I spend most of my time developing in React). It introduced me to things like the "Content Mesh". Now, I could loads content from a variety of datasources and access all of the data through the Graphql data layer. How neat! I had grand plans for pulling in data from my Etsy account, pulling blogs from Medium, etc.

After writing a few sites in Gatsby I soon realized..The more I relied on this "Content Mesh", the less control that I felt I had. When my sites was being built from a dynamic datasource (Etsy, Snipcart), I could no longer use git to truely trace back the state of my website.

Most of my Gatsby sites reverted back to controlling content from local markdown or Json files.

...

Then cut to a few months ago where I started thinking of my portfolio. I knew very little of what I wanted, other than this concept of an avatar rotating into various sections of the site.

I created an application with `create-react-app` and starting playing around until finally I had something cool.

Next.js had been on my radar, and I thought this would be a good opportunity to try it out. I was amazed that turning my app into a "Next" site could be done just by calling `next init`. As I added new features (like loading the content from markdown, it was just one incremental step).
