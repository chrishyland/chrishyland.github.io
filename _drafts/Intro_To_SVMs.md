---
layout: post
title: Support Vector Machines for Dummies
date:   2017-12-31 09:00:00
categories: [Data Science, Statistics]
---

(Tbh from the title of this post, it is more directed at my future self for when I forget about this concept).

_Where do we begin?_

First, in order to understand support vector machines (SVM's), we're going need to build up some prior knowledge.


_Ok... so what does this actually mean?_
If we have a dataset, we can split it up like this.

#### Insert image

This hyperplane is now known as a _margin hyperplane_. We want to find the margin hyperplane that best separates the dataset, which means it has a massive distance from points. This is known as the _maximal margin hyperplane_.

We can now classify observations based on what side of the maximal margin hyperplane it is on. This is known as the _maximal margin classifier_.

The observations on dashed line are known as _support vectors_. Firstly, since they are observations in a p dimensional space, they are _vectors_. Notice the maximal margin hyperplane depends on these vectors, whereby if we move these observations around, the maximal margin hyperplane will move too. From this, they are seen to be "supporting" the maximal margin hyperplane and hence the name _support vectors_.


_References are from the canonical textbook ISL._
