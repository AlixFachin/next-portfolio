---
title: Mirroring a remote branch with git
date: 2022-09-24T14:38:09+09:00
draft: false
language_prog:
language: en
tags: [TIL, git]
featuredImageURL: fahrul-razi-BR6lrzCPYPk-unsplash.jpg
imageLegend: Photo by <a href="https://unsplash.com/@mfrazi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fahrul Razi</a> on <a href="https://unsplash.com/photos/BR6lrzCPYPk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
library_version:
description: Pretty useful command in git
---

I was looking for a quick way to create a `git branch` locally which would track and replicate a branch located on the remote server. (For example, when I wanted to test code during a code review).

There is a git command for that:

```bash
git checkout --track origin/remotebranchname
```

will create a branch locally with the same name than the remote branch, and set it up to track it.
