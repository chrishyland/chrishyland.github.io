---
title: Introduction to Complexity Theory
date:   2018-06-28 09:00:00
layout: post
tag:
- Computer Science
category: blog
author: chrishyland
description: Crash course on Complexity Theory.
---

# Introduction
Complexity theory can be a topic which confuses many undergraduates due to the plethora of jargon and seemingly contradictory ideas. In this post, I've tried to give a tl;dr rundown of many of the terms and try to concisely explain what it all means.

---
## What different terms are there?
There are 4 things you need to understand to really understand all this stuff.

- P
- NP
- NP Complete
- NP Hard

## P

P stands for Polynomial time. A problem in P means it can be solved with a **polynomial time** algorithm. What this means is that it can be solved fairly quickly. This class of problems are a subset of NP, which we will come to next.

---

# NP
NP stands for Nondeterministic polynomial time. Lets say we had a problem X. Problem X MIGHT be able to be solved in polynomial time **or not**. However, if we had a **proposed solution** to the problem, and we can verify that is indeed the correct solution in polynomial time, then the problem is in NP. An example would be Sudoku, idk if this is in P or strictly NP, it's just an example!. Anyone who's tried playing the game of Sudoku, they know it's quite hard and let's suppose we can't solve it in polynomial time. Hence it is not in P. HOWEVER, if we were given a proposed solution to the Sudoku board, we can check if that solution is the **correct solution or not** to the Sudoku board really quickly (just look and see if the rules are obeyed). 

So you can see, problems that can be solved in polynomial time can be verified in polynomial time (it makes sense too, if you can solve a question easily, you can check if an answer your given is the right answer easily). However, problems that can be **verified in polynomial time does not mean it can be solved in polynomial time**. Hence, **P is a subset of NP**.

<img  src="/assets/Complexity/np-complete.png" alt="Drawing"  style="width: 400px; height: 300px;text-align:center;"/>

---

# NP Complete
To understand how to show something is in NP-Complete, we need to go on a sidetrack to understand the concepts of _reductions_.

## Reductions
_Make sure you understand this section. It is so important for understanding NP Hard and Complete._

Lets say we had problem X and Y. If we can _reduce problem X into problem Y_ and we can solve problem Y, _X is EASIER than Y_. In otherwords, Y is harder than X or at least same is the same level of difficulty as X. Let this sink in. This is important. An example could be, let's say we had a problem X that requires year 3 understanding of Maths and a problem Y that requires 2nd year uni level of Maths. IF (and a big if) we can somehow recast problem X into something similar to problem Y which requires uni level maths, and we can solve problem Y, then that means we can solve problem X since we CAN recast it to problem Y. So for example, imagine if you wanted to solve: 2x+8=6. Let's say you can recast it to something much more complex in abstract maths requiring abstract algebra and group theory etc. If you can solve that much more complex version of the problem, then you can DEFINITELY solve the easier version we had initially.

On a side note, when we reduce X to Y, we assume that reduction transformation iself is in polynomial time as well. So, if we can reduce X to Y in polynomial time, solve Y, and reduce back to X in polynomial time, we have found a solution to X.

### tl;dr
X (reduces)-> Y and we can solve Y, then X is **AT MOST** hard as Y. So Y is harder OR might be same level of difficulty, Y definitely can't be easier.

So back to NP complete problems. Looking at the diagram earlier, we see that NP-Complete is in the intersect of both NP-Hard problems and NP problems. It's gonna be annoying but now I'm going to jump into NP-Hard problems before wrapping up with NP-Complete problems.

---

# NP Hard
The short and sweet definition (and definitely not rigorously phrased) of NP Hard problem are problems that are harder than _ALL_ problems in NP. A problem that is NP hard is **not necessarily in NP** and could in fact be in EXP or takes exponential time to solve (where an example of exponential time algorithms could be to brute force and generate ALL possible answers and find which one is the right one). A problem that is **in NP** is a **NP Complete** problem. So, to show something is NP Hard, we need to be able to take all problems that in NP, **reduce all the problems** into our supposedly NP hard problem, and if we can solve our NP hard problem (in exponential time and **maybe** verifiy it in polynomial time), then all our problems in NP are **easier** than our NP hard problem and we know that our NP hard problem is indeed harder than all our problems in NP.

### tl;dr
A problem X where all problems in NP can be reduced to problem X. This problem is **NOT** in NP since if was, then it would be **NP Complete**.

--

## Wrapping up with NP-Complete

2 conditions are needed to show something is in NP-Complete.

- The problem is in NP.
- Every problem in NP is reducible to our problem.

1) We can show a problem is in NP by the same manner we mentioned earlier. We show that a solution can be verified in polynomial time.
2) Reduce every problem in NP to our problem! However, this is not feasible, so what we do is that we reduce **a known NP Complete problem** into our problem. This is fine because for the known NP Complete problem, someone else has already reduced every problem in NP to that known NP complete problem. Now if we reduce that known NP Complete problem into our problem, then by transitive property, every problem in NP can be reduced to our problem!

--

# Conclusion

The following lists aims to show the steps to prove that a problem is in:
* P: Show there exists a polynomial time algorithm to solve the problem.

* NP: Show that we can verify a proposed solution in polynomial time.

* NP-Hard: Reduce a NP Hard problem into our problem.

* NP-Complete: Reduce a NP Complete problem into our problem **AND** show our problem is in NP.

# Resources
Resource I would really recommend reading: http://jeffe.cs.illinois.edu/teaching/algorithms/2009/notes/21-nphard.pdf