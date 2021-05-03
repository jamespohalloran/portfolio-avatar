---
date: "2020-03-10T07:00:00.000Z"
title: "Let's make static sites dynamic again! ...sorta"
_template: "post"
---

I've been working with static sites for several years now. Before that, Wordpress was my go-to... and I hope to never again dig through their source-code 🙃. The switch to developing with static site generators has made my sites:

- Faster
- Cheaper (free) to run
- More secure
- MUCH easier to manage

For these reasons... when I first heard about Next.js, I was a bit confused about their focus on "Server Rendering". I wasn't sure why I should care about server rendering for my use-case as most of my sites were pretty small. I was fully accustomed to my SSG's of choice building everything up front, and then deploying the static assets. The datasource was consumed at build-time, and I could just run the site locally in dev-mode as I made changes to my content.

## Wait, I thought the title of this blog was "Let's make static sites dynamic again!"...

Well, I didn't realize it, but there were some definite drawbacks of having all my pages static.

When a site is built statically:

- Content is consumed at build-time. If I want to see a new "preview" of an edit, I need to rebuild the site.
- For each of these previews, the entire site needs to be completely rebuilt which can be sloooow. _Note: Gatsby is currently working on a "Incremental Builds" to get around this, but it's not ready yet_.
- If I'm running a 'preview' server to rebuild when my datasource is updated, I need one server running per datasource. Why does this matter? What if me and a team of editors are making changes to 3 different branches of my site at once? I would need 3 servers running 3 different versions of my site.

Those might seem like minor qualms, but I think it's a huge part of the reason that static site CMS's haven't caught up to the editing/collaboration experience of services like Squarespace. Seeing a live preview of a site is a crucial step before publishing changes, and the above drawbacks make it challenging.

## Next's ["Preview Mode"](https://nextjs.org/blog/next-9-3#preview-mode) to the rescue

With this latest NextJS release, Each page template can be designed to export statically, but can provide alternate behaviour for when they are run using SSR.

This has allowed us at [TinaCMS](https://tinacms.org) to provide an "open authoring" solution where our site is static, but can be run in dynamic "edit" mode with custom content per-user.

_See [our announcement](https://tinacms.org/blog/introducing-visual-open-authoring) for more details on our "Open Authoring" use-case._

So... back to our drawbacks of static-building mentioned above...

> "Content is consumed at build-time. If I want to see a new "preview" of an edit, I need to rebuild the site."

With SSR, the data is consumed dynamically per-request. In the case of TinaCMS's open authoring, it lets each editor load dynamic data per-request from their own fork.

> "For each of these previews, the entire site needs to be completely rebuilt which can be sloooow."

Nope! No rebuild is needed for preview mode. SSR renders each page on-the-fly as we need it.

> "If I'm running a 'preview' server to rebuild when my datasource is updated, I need one server running per datasource."

Nope! Just one. With SSR, the data is dynamic, so each user's request can query a different dataset. Also, In the case of deploying with Zeit, they automatically set up serverless Lambda functions for each of my templates, so I don't have to deal with managing any servers 🎉!

## Neat!

And of course, my live production site is still fully static. When I enter edit-mode, it switches to use SSR. It's the best of both worlds!

This (in my opinion) is going to be a gamechanger. Good work, Zeit team!

So... Let's make static sites dynamic again! **(_conditionally... in preview-mode_ 🙂)**
