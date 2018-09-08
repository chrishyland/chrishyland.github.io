---
title: Introduction to Monte Carlo Integration
date:   2018-09-05 10:00:00
layout: post
tag:
- Computer Science
- Statistics
category: blog
author: chrishyland
description: An introduction to Computational Techniques for Integration.
---
# Introduction to Simulation Techniques
## Why Simulations?

Before we begin, we first ask why do we even need computational techniques. An answer to this is that there are many reasons why we need computational techniques, as they can help us in scenarios such as

- When we can't always trust asymptotic results in finite samples;
- When we can't trust assumptions underlying our models;
- When we want to run methods that have not been coded up.


Furthermore, on the topic of simulations, we need simulations when we need to be able to generate draws from distributions. There are many practical applications to this such as simulating random terms in time series, constructing random samples, and more. However, sampling from distributions other than the uniform tend to be quite difficult, due to many reasons as we will soon discover. Furthermore, when you construct distributions yourself that are not currently written in Python or R, it is useful to write your own methods to sample from your own distributions. 


We look at some examples of computational techniques. Alot of times we require computational techniques for expressions that do not have analytical expressions. In particular, we focus on 2 techniques, simulation and numerical integration. 

--- 

## Numerical Integration
We have a function h(x) which we seek to evaluate at a grid of points x. We then use those values to approximate h by a piecewise linear function, which we can integrate exactly in order to find an approximation to $$\int_{x \in D}h(x)dx$$. Keep this integral in mind as we will spend the rest of this chapter on finding out how to evaluate this integral. Such examples of this include both midpoint and trapezoid rule. These algorithms converge quickly in low dimension with bounded domains.

<div class="toleft">
    <img class="image" src="/assets/Monte-integration/trapezoid.png" alt="Alt Text">
    <figcaption class="caption"></figcaption>
</div>


<div class="toleft">
    <img class="image" src="/assets/Monte-integration/midpoint.png" alt="Alt Text">
    <figcaption class="caption"></figcaption>
</div>

The issue is for high-dimensional problems, we suffer from the curse of dimensionality, as we try to cover too much of the space. Hence, such techniques do not scale well. For example, if we get 4 grid points for each dimension, so only 4 points along each axis, we would already have $4^10$ points to sample and that is already massive for such a poor performance. Instead, sampling random points is more efficient, that is, if the space was $R^{10}$, we would sample vectors with 10 components and evaluate them accordingly. The issue is that this does not work really well. Hence, we turn to Monte Carlo integration instead.

---

## Monte Carlo Integration
Recall that expectations for density functions of continuous random variables are just integrals, hence, we try to write our integrals as an expectation. Then finding the expectation is equivalent to evaluating the integral, except that computing expectations are much easier to do.

First we need to recall some properties of density functions f, on the domain $$\mathbb{D}$$.

- f is never negative;
- $$\int_{x \in D}f(x)dx = 1$$;
- Some properties of smoothness. 


Then, we need to recall the _Law of the Unconscious Statistician_ that states that if we want to calculate the $\textbf{expected value}$ of a function g(X) for the random variable X, if we know the probability distribution of X but not g(X), we can simply compute 

$$
\mathbb{E}(g(X)) = \int_{\infty}^{\infty}g(x)f_X(x)dx
$$ 

and this still works in giving us the expectation of X.

So now, if we are interested in evaluating the integral
$$
\int_{x \in \mathbb{D}}h(x)dx
$$
we re-express h(x) as
$$
h(x) = v(x)f(x)
$$
where f(x) is a density function on the domain D and then we simply define v to be h\f.

Bringing it all together, we have that 

$$
\int_{x \in \mathbb{D}}h(x)dx = \int_{x \in \mathbb{D}}v(x)f(x)dv = \mathbb{E}[v(X)]
$$

where X is a random variable with density funcction f. Furthermore, the last equality is just the application of LOTUS. Hence, we have just written our integral of h(.) as an expectation of a random variable X, with a density function f(.), that relates to h(.). 

For a quick high level overview, since we need to find E[v(X)] in order to compute the integral of h(.), recall that expectations are simply averages, so all we need to do is sample multiple v(x) for x in D (over the same domain as the integral of interest h), and simply take the average of these v(x) values. We have just computed E[v(X)] and therefore the integral of h(x)! In particular, what we do is that we take draws x1, x2, ..., xS from the density function f and then

$$
\mathbb{E}[v(X)] = \frac{1}{n}\sum_{i=1}^Sv(x_i).
$$

So we take draws from f and evaluate v(.) on it.

In particular, we hope that the density f() that we have chose is one that is very easy to sample from. From this, we can have multiple draws from that distribution and therefore the expectation of v(.). 

In terms of theoretical justifications for this, recall that the $$\textbf{weak law of large numbers}$$ (Khinchin's Law) states that the sample average $$\textbf{converges in probability}$$ towards the expected value for a sequence of random variables that are i.i.d and whose first moment exists. Convergence in probability is that the probability of an unusual outcome becomes smaller and smaller as the sequence progresses, or in other words

$$
lim_{n \rightarrow \infty}Pr(|X_n - X| > \epsilon) = 0
$$

for a sequence of random variables $$\{X_n\}$$ and all $$\epsilon > 0$$. Therefore, the WLLN can then be expressed as

$$
lim_{n \rightarrow \infty}Pr(|\bar{X}_n - \mu| > \epsilon) = 0,
$$

where $$\mu$$ is the expected value and $$\bar{X} = \frac{1}{n}(X_1 + ... + X_n)$$. Hence, going back to our scenario, as long as v(x) is a sequence of Lebesgue integrable random variables (which means that their expected value exists and is finite), we have that

$$
\frac{1}{S}\sum_{k=1}^Sv(x^{(s)}) \rightarrow E[v(X)] = \int_{X \in \mathbb{D}}h(x)dx.
$$

Hence, we see that this converges to our integral of interest as number of draws from f increases or $$S \rightarrow \infty$$. An important thing to note is that unlike most cases of asymptotics, we actually have control over S and hence we can keep simulating to ensure we get the integral of interest!

---

Stay tuned on how can we sample from distributions in order to compute these integrals!
