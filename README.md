# Blog / Portfolio Next.js theme

## Overview
This repo contains the code corresponding to the theme of my portfolio / blog website.
It has the following features:
* Home page with animations from `particlejs`
* Markdown content management
* Page displaying all the blog entries and blog tags
* `WIP` Multilingual content

I could have a used a CMS - but there is no better way to understand how something works than doing it by yourself!

## Editing the blog content
I had to find a way to separate the theme from the content, and still to be able to work on both of those.
* Currently, the content is stored in another repo and content is fetched from GitHub during static page regeneration.
* So in order to fetch this content, you need to edit the `.env.local` file during development, and set environment variables during deployment.
The variables you need to set are:
* `GH_TOKEN` to contain a GitHub token corresponding to your account (See [how to create a personal token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token))
* `GH_REPO` with the content repo's name
* `GH_OWNER` with the content repo's owner name

The structure of the repo is fixed though, i.e. with one folder called `pages` and one called `posts`. Inside each folder are sub-folders for each locale (e.g. `pages/en`, `pages/ja` etc...)

## Modifying the theme

This repo is based on a `Next.js` repo (version 12).
To edit it, clone the repo and run `npm install` then `npm run dev` to see the site on your local machine

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
