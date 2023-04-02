---
title: "About JavaScript Set"
date: 2022-10-29T20:52:01+09:00
draft: true
language_prog: JavaScript
language: en
tags: [JavaScript, Beginner]
library_version:
sandbox_link:
category: post
description: Comparison between the Set structure and a regular Array.
featuredImageURL: fahrul-razi-BR6lrzCPYPk-unsplash.jpg
imageLegend: Photo by <a href="https://unsplash.com/@mfrazi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fahrul Razi</a> on <a href="https://unsplash.com/photos/BR6lrzCPYPk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

Learning JavaScript we all begin using the simple object: `{}`. Straightforward to declare and to use, and on top of this, it is (_almost_) the same syntax than JSON objects. But in ES6 were introduced new data structures which are slightly optimized. You may not find a use case for these, but it's always better to know in the case of an interview 😉

## The `Set` data structure

The `Set` object is a optimized (but dumbed-dowm) version of an `Array`. So basically,

- You can insert into a `Set` objects of any type.
- You can iterate through a `Set`, the order will be the order in which the components were inserted
- You can test whether an element is inside a `Set` or not, and **this will be quicker than if you used an Array**.
- However, Very useful array methods are not implemented: no `.filter`, `.map`, `.find` etc. `.forEach` works though.
- You cannot access the element at the ith position.
- To derive an Array from a set, use `const myArray = Array.from(mySet)`.

## A little test...

All this would be very formal and theoretical - now let's see if we can find a difference.

You will find at the end a short program which measures the time to put 10,000 random numbers into each structure, and then tries to retrieve 10,000 elements and see how much time it takes.

In a code sandbox I got results with the routine with `Array` taking roughly 150ms, but the `Set` never taking more than 1ms! 🤯
This being said:

- The problem is very specific and plays to the advantage of the `Set`, as it is clearly written that the retrieval is very fast.
- We cannot change the order of elements in a Set, so the use cases are very specific.

This being said, if you are in a situation where you use an Array for a queue (i.e. always inserting at the end) and you just care to know if an element is inside the array or not, think about using a `Set`, the program perfomance will be greatly enhanced!

```javascript
function compareResults() {
  const TEST_SIZE = 10_000;

  const a0 = performance.now();
  const myArray = [];
  for (let i = 0; i < TEST_SIZE; i++) {
    const element = Math.floor(Math.random() * 10 * TEST_SIZE);
    myArray.push(element);
  }
  performance.mark("arrayAfterInit");
  let matchesInArray = 0;
  for (let i = 0; i < TEST_SIZE; i++) {
    const element = Math.floor(Math.random() * 10 * TEST_SIZE);
    if (myArray.find((x) => x === element)) {
      matchesInArray = matchesInArray + 1;
    }
  }
  const a1 = performance.now();
  console.log(`Array: ${a1 - a0} (${matchesInArray})`);

  const s0 = performance.now();
  const mySet = new Set();
  for (let i = 0; i < TEST_SIZE; i++) {
    const element = Math.floor(Math.random() * 10 * TEST_SIZE);
    mySet.add(element);
  }
  let matchesInSet = 0;
  for (let i = 0; i < TEST_SIZE; i++) {
    const element = Math.floor(Math.random() * 10 * TEST_SIZE);
    if (mySet.has(element)) {
      matchesInSet = matchesInSet + 1;
    }
  }
  const s1 = performance.now();

  console.log(`Set: ${s1 - s0} (${matchesInSet})`);
}
```
