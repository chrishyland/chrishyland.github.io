---
title: Mathematical Reason why the Bootstrap Works
date:   2018-09-05 10:00:00
layout: post
tag:
- Statistics
- Math
category: blog
author: chrishyland
description: Why does the bootstrap work?
---
# Introduction
## What is the bootstrap?

Recall that the bootstrap is when you sample from the data you have. The idea is that the empirical distirbution generated from this will converge to the true distribution and hence any test statistics you get from this test will be the correct distribution.

---
We are interested in the test statistic $$\gamma(x) \in \mathbb{R}$$. The distribution of this may depend on 

  1) Sample size n;

  2) Distribution F;

  3) Parameter of the distribution $$\theta$$.


Resultantly, we have a distribution $$J_n(.,F_{\theta})$$. That is, for any $$c \in \mathbb{R}$$, we have that

$$
J_n(c,F_{\theta}) = P[\gamma(x) \leq c | x_i \sim i.i.d. \; F_{\theta} \; \text{ for i = 1,2,...,n}].
$$


In terms of notation, $$J_n$$ is the distribution of the test statistic for sample size n, $$J_{\infty}$$ is the distribution of the test statistic as sample size goes to $$\infty$$, $$F_{\theta}$$ is the actual CDF/distribution of interest with parameter $$\theta$$, and $$F_n$$ is the empirical CDF from the data. 

We have may have the scenario of where $$\gamma$$ is asymptotically pivotal, that is, as $$n \rightarrow \infty$$, we now have the asymptotic distribution. However, we shouldn't always rely on asymptotic results in finite samples. Hence, we want to look at simulation techniques on non-pivotal quantities, $$\textbf{regardless if they're asymptotically pivotal}$$. However, if we do have an asymptotic pivot, then we can state even stronger results. Therefore, it is always desirable to study asymptotical pivots if given the option. Hence, test statistics need not be pivotal, but we do require that $$J_n(.,F_{\theta}) \rightarrow J_{\infty}(.,F_{\theta})$$ as $$n \rightarrow \infty$$. In other words, that there exists an asymptotic distribution for the test statistic. Furthermore, we don't necessarily need pivotal statistics, so if we drop this assumption, then we require the convergence of the distribution to be uniform as well. As we will see later, both the parametric and non-parametric bootstrap simply requires that there exists a limiting distribution.

---
(Assume we are in finite dimensional spaces, not in infinite ones like you showed in a post earlier).

Suppose $$f_n$$ are a sequence of functions continuous on a domain D and $$f_n \rightarrow f$$ uniformly on D. We also have a sequence in D, denoted by $$\{x_n\}$$ where $$x_n \rightarrow x \in D$$. 

If these conditions hold, we have that $$f_n(x_n) \rightarrow f(x)$$. 

The proof of this is as follows:

$$

||f_n(x_n) - f(x) || \leq ||f_n(x_n) - f(x_n)|| + ||f(x_n) - f(x)||

$$

$$

\leq sup_{y \in D}||f_n(y) - f(y)|| + ||f(x_n) - f(x)||

$$

$$

= ||f_n - f||_{\infty} + ||f(x_n) - f(x)||.

$$

So here, the fact that we have uniform continuity, means that $$||f_n - f||_{\infty} \rightarrow 0$$  as $$n \rightarrow \infty$$. 

In other words, the supremum norm goes to 0. Furthermore, since $$f_n$$ are continuous and uniformly converges to f, this means that f is also continuous and hence we have that $$lim {x_n \rightarrow x}f(x_n) = f(x)$$, so then $$||f(x_n) - f(x)|| \rightarrow 0$$. This shows that 

$$

||f_n(x_n) - f(x)|| \rightarrow 0 \; as\; n \rightarrow \infty

$$ for all $$x \in D$$. So relating this back to conditions on the bootstrap, if we don't have $$f_n$$ being continuous, then that means $$f$$ would not be continuous and we would not have $$f(x_n) = f(x)$$ as $$x_n \rightarrow x$$. Furthermore, if we don't have uniform convergence, we would not have $$||f_n - f||_{\infty} \rightarrow 0$$. 



So just drawing parallels to the bootstrap example, it's quite similar where if we let $$f_n = J_n$$ (our test statistic), which is a function of $$F_{n}$$, where in the example above, $$F_n$$ would be $$x_n$$ and $$F_{\theta} = x$$.


---
## Wrapup
So even though it is not an accurate proof, as we still need to generalise this to work for an infinite dimensional vector space, it follows a similar idea on why exactly does the bootstrap work.