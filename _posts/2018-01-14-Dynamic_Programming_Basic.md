---
title: Dynamic Programming Basics
date:   2018-01-14 09:00:00
layout: post
tag:
- Computer Science
category: blog
author: chrishyland
description: A primer into DP.
---

Now why would I write a post on an seemingly esoteric topic such as dynamic programming? (Henceforth known as DP). Well, besides being a staple of many tech interview questions, I find the framework in which one can solve problems via DP quite beautiful tbh and can lead to elegant solutions. So this blog post will first look at the more common framework of divide and conquer algorithms, then seeing the paradigm shift to DP algorithms, examples, and finally a coded up solution of DP. Now would be a good time to brew your coffee before we delve in!

![Dynamic Programming Tree]({{ "/assets/dp_post/dp-meme.jpg" | absolute_url }})

## Divide and Conquer Algorithms

Divide and conquer algorithms boil down to solving problems in an intuitive manner which you normally do in every day life (or should be doing). If we had a massive problem to tackle, instead of taking it all on at once, we can simply break it down, solve each respective component, and combine our solutions.

Let us work with a concrete example. Imagine us being tasked by Elon Musk to build an electric car. What may seem like an overwhelming challenge, can be much more readily approached if we break down on what exactly we need to produce for the car and combine the parts. So we can build the engine, car body, tires, and whatever else is needed in the car. We can then combine the car parts and after connecting the parts together, we have a working car! (Okay I know I've simplified the process just a tad bit but you get the point!). Likewise, divide and conquer algorithms can be thought of composing of 3 parts.

* _Divide_: Break the problem down into several non overlapping parts.

* _Conquer_: Solve each part recursively.

* _Combine_: Combine our sub-solutions to form an overall solution.

A more concrete example of a divide and conquer algorithm includes the famous _mergesort_. Lets say we are given a set of _n_ dogs, which we then want to sort by ascending order of weight. We can employ mergesort on our dogs. Let's put this through our divide and conquer framework.

1) Divide: Split the set of dogs up into two sets of bunnies.

2) Conquer: Recursively sort each half by weight.

3) Combine: Merge the two halves into a sorted whole.

Whenever we merge our two subsets of sorted bunnies into a single set, we need to undertake a linear number of comparisons and also have a temporary array to then store the results of the sorted set of dogs. By this, we need to compare each bunny of our two sublists in ascending order and add the lighter bunny into our temporary list.

![Mergesort Tree]({{ "/assets/dp_post/merge-sort.png" | absolute_url }})

We can use this tree to further illustrate the example. Hence, let us say we had a 7 dogs weighing 38, 27, 43, 3, 9, 82, 10 pounds. First, we split the dogs into 2 groups with one group containing 4 dogs and the other group containing 3. We then continually split the groups up by half until we end up with 1 dog left in each group. Obviously, if there is only 1 dog in the group, the group is sorted! This is known as the _base case_. Now we take 2 groups of dogs of size one and we then combine the 2 groups by first comparing the weights of the dogs from the 2 groups and then putting the lighter dog first and then the heavier dog later. This is the combine step in divide and conquer. We continuously repeat this process until we merge all the groups and are left with 1 group whereby the dogs are sorted in ascending order of weight.  

### Dynamic Programming
Dynamic programming is similar to divide and conquer algorithms except now when we break the problem down into several subproblems, our subproblems tend to overlap. That is, they are dependent on each other. A way to think of this is that back to our brief job of developing Tesla cars for Elon Musk, when breaking down the problem of building a car, we may find that to build the engine, may require us building a bolt or a nut that is also required to build the car body. Hence, we can see our subproblems overlap with one another.

With that in mind, we then think of the framework for dynamic programming differently to our divide and conquer algorithms. The steps are:

* _Define subproblems_

* _Find recurrences_

* _Solve the base cases_

* _Transform recurrence into an efficient algorithm_

For when defining subproblems, using some notation will go a long way in helping us figure out how to solve a particular problem. We usually define *OPT(j)* to be the optimal value for the set of items from i to j in our problem.

For more concrete examples, we can turn to the famous Knapsack problem. The Knapsack problem states, if we had n items, whereby each item is associated with a personal utility value \\(v_i\\) and a weight \\(w_i\\). We also have a old Knapsack that can only carry a certain total weight W of items before breaking. We then want to maximize our utility so we ask the question, which set of items should we put in our Knapsack to maximize our utility whilst being constrained by the weight limit of the Knapsack.

A naive approach would be to try every possible combination of items to go into the Knapsack and choose the set of items that gives us the highest utility whilst satisfying the weight constraint. However, the number of possible combinations can explode exponentially. Hence, we can use a DP approach to this problem!

### Dynamic Programming with Knapsack

So just like divide and conquer, to tackle this problem, we are going to break the problem down and solve subproblems and combine our mini-solutions to form a final solution. Let's say we have a basket of fruits which we could like to put into our Knapsack. Resultantly, first we restrict the sets of fruits we can take and then ask what set of fruits from this subset of fruits should we take if the total weight that the Knapsack can carry is less than W. An example would be the case where we have 10 fruits and the weight limit our Knapsack can take is 20kg. A subproblem we can break it to is first by restricting the set of items to only contain 1 item such as an apple and the weight limit being 1 kg. Suppose the apple weighs 1 kg, resultantly we can put it in our Knapsack. If it weighs more than 1 kg, we can't put it into our Knapsack. We then increase the weight limit the Knapsack can carry to 2 kg and then again ask whether can we place the apple into our Knapsack. We repeat the process of slowly incrementing the weight limit our Knapsack until it reaches the original weight limit of 20 kg. At some point, assuming the apple weights less than 20 kg, we can start to include it into the Knapsack. Afterwards, we then set the weight limit back to 1 kg but now our subset of items contains the original apple but now we also have a banana. We now ask with a weight limit of 1 kg, can we include either the apple, banana, or both into our Knapsack. We then increment the weight limit of the Knapsack by 1 kg and ask the same question repeatedly until we finally reach the Knapsack original weight limit of 20 kg. However, the difference is that since we are seeking to maximize our utility, if we only have enough space for one of the fruits, we would then select the fruit that we prefer more to be included into the Knapsack. However, if we have space for both fruits, then we can just take both of them (assuming neither of the fruit has a negative utility value). Eventually, we will then have the solution to which fruits should we include if our Knapsack's weight limit is 20 kg.

Let us formalise the previous example. We can first define our subproblem to be OPT(i,w), which is the maximum utility v which we can derive from choosing what fruits from a set of size i with a weight limit of w for our Knapsack. Back to our fruit example, then OPT(3,9) would be defined as the maximum utility we can get from 3 fruits and the Knapsack weight limit being 9 kg, whereby we choose the subset from the fruits that will give us the maximum utility whilst satisfying the Knapsack limit of 9 kg.

Now, we can define something called the _recurrence relation_ which can be thought of as a way to write out _recursion_ since that is what our solution is doing. We have 2 cases that can occur every time we ask what fruits from the subset of fruits should we put into our Knapsack with a weight limit of w. The first recurrence is that we do not select fruit i sine it does not give us additional utility. An example would be that if we currently have an apple and a banana in our Knapsack, swapping either fruit out with an orange will not increase our utility. Therefore, we do not select the orange and instead we select the subset of fruits without the orange whilst having the weight limit. We write this as OPT(i-1,w). However, if swapping out the orange gives us a higher utility and the orange weights 4 kg and the limit of the Knapsack is 10 kg, we then take the orange into our Knapsack but now the weight we have left over in our Knapsack is 6 kg and we gain the utility \\(v_i\\) from the orange. We write this as OPT(i-1, w-\\(w_j)\\). Hence, when deciding whether to take fruit i (the orange) we want to choose the case which gives us the higher value or in other words, whether we should include the orange or not include the orange. We formalise this by:

$$ OPT(i,w) = max\{OPT(i-1,w), v_j + OPT(i-1,w-w_j)\} $$

Just to translate that equation one more time, note that we have two arguments in our max function. This represents us choosing the choice which maximizes our utility from either including or not including the item. Note here that i is a _subset_ of the n original items and the weight limit w is < W or the actual weight limit of the Knapsack. We do this as we can slowly build up our solution to the original problem we had. It is trivial to see if we had weight limit of w = 0, the optimal solution is always no items included in the Knapsack unless an item has a weight of 0 as well.

### Pseudocode

The pseudocode for the Knapsack problem is seen as below:

![Pseudocode]({{ "/assets/dp_post/pseudocode.png" | absolute_url }})


Just a side note here, the concept of _memoization_ is when we store the results of subproblem calculations such that we do not need to recompute it again for recursion. If you think about it, since DP is defined to have overlapping subproblems, there will be calculations recomputed that have already been computed. This is inefficient so we can simply save these calculations into an array and retrieve them if ever needed instead of recalculation.

## Conclusion

Hopefully that made some sense and gave some insight and inspiration to start trying out DP algorithms on problems!
