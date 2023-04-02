---
title: "TypeScript Utility Types Cheatsheet"
date: 2022-09-25T07:22:56+09:00
draft: true
language_prog: JavaScript
language: en
tags: [TypeScript]
library_version:
sandbox_link:
category: post
description: Cheat sheet of TypeScript utility types
featuredImageURL: fahrul-razi-BR6lrzCPYPk-unsplash.jpg
imageLegend: Photo by <a href="https://unsplash.com/@mfrazi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fahrul Razi</a> on <a href="https://unsplash.com/photos/BR6lrzCPYPk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

Looking at a cheat sheet of all utility types in TypeScript. (`Partial`, `Pick`, `Omit`, etc...)

<!--more-->

## Partial

A `Partial` will create a new type where all properties are optional.

{{< highlight ts >}}
type qty = "A bit" | "A lot" | "Mountain";

// Putting all the toppings!
type max_crepe = {
whipped_cream: qty;
custard: qty;
choco_chips: qty;
banana: qty;
};
// A max_crepe needs to have a qty for all toppings

type healthy_crepe = Partial<max_crepe>;
{{< /highlight >}}
