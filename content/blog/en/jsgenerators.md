---
title: "Generators in JavaScript (1)"
date: 2022-10-30T14:55:50+09:00
draft: true
language_prog: JavaScript
language: en
tags: [TIL, JavaScript]
library_version:
sandbox_link:
category: post
description: First look at JavaScript generators
featuredImageURL: fahrul-razi-BR6lrzCPYPk-unsplash.jpg
imageLegend: Photo by <a href="https://unsplash.com/@mfrazi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fahrul Razi</a> on <a href="https://unsplash.com/photos/BR6lrzCPYPk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

During an interview some time ago, I had a multiple-choice questionnaire to evaluate my JS knowledge.
I got confronted with a weird JS syntax I've never seen before...
Being (over)confident, I was sure that this syntax didn't exist, that the question was clearly made for people coming from C or C++ who think pointers exist in JavaScript.
Well it turns out I was wrong and this syntax was meant to show what generators were...

<!--more-->
<!-- Do *not* put any h1 in the post content, the h1 being the post title  -->

In order to explain `Generators` in a easy way, we need to take one step back and look at what are `Iterators`.

## About iterators

An `Iterator` is an object which encapsulates a sequence of values.
Those values can be already computed and stored (e.g. in an `Array`), or they can be dynamically computed / fetched (e.g. a stream of data).

### Basic Iterator

As its most simple, an iterator is any object which has a `next()` method, returning an object with two properties:

- `value` being the current value in the sequence
- `done` being true if the sequence is finished. (The corresponding `value` may or may not be equal to the last value)
  Once the sequence has been read/generated in its entirety, any subsequent call to `next()` should return `{ done: true}`.

### Example

TODO:

- Patissier 1 makes the dough
- Patissier 2 takes the dough and fruit and makes a fruit tart.

NOTE:

- All the objects created are equal
- Having two patissier may confuse with Promises / parallelism => Maybe replace the example by one patissier and
  one machine.

```js
const getPatissier1 = (wheatInitialStock, orderAmount) => {
  let stockAmount = wheatInitialStock;
  let i = 0;
  // We create the dough as long as there is stock remaining

  const patissier = {
    next() {
      if (stockAmount > 0 && i < orderAmount) {
        return;
      }
    },
  };

  return patissier;
};
```
