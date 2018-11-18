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

_This post assumes that the reader has a basic idea of what bootstrapping entails._

Recall that the bootstrap is when you sample with replacement from the data you currently have. The big idea is that the empirical distirbution generated from this will converge to the true distribution and hence any test statistics you get from this test will also be the correct distribution.

Generally, you would resort to the bootstrap when you have unknown parameters in your model and hence the need to use these simulation techniques in order to figure out what is actually going on with the data.

---
First lets get some notation out of the way.

We are interested in the test statistic $$\gamma(x) \in \mathbb{R}$$. The distribution of this test statistic may depend on 

  1) Sample size n;

  2) Distribution F;

  3) Parameter of the distribution F which we denote as $$\theta$$.


Resultantly, we have a distribution of the test statistic being $$J_n(.,F_{\theta})$$. That is, for any $$c \in \mathbb{R}$$, we have that

$$
J_n(c,F_{\theta}) = P[\gamma(x) \leq c | x_i \sim i.i.d. \; F_{\theta} \; \text{ for i = 1,2,...,n}].
$$


In terms of notation, $$J_n$$ is the distribution of the test statistic for sample size n, $$J_{\infty}$$ is the distribution of the test statistic as sample size goes to $$\infty$$, $$F_{\theta}$$ is the actual CDF/distribution of interest with parameter $$\theta$$, and $$F_n$$ is the empirical CDF from the data. 

---

We have may have the scenario of where $$\gamma$$ is asymptotically pivotal, that is, as $$n \rightarrow \infty$$, we now have the asymptotic distribution. However, we shouldn't always rely on asymptotic results in finite samples. Sometimes it doesn't make sense to appeal to asymptotic results when you only have a sample size of 30 for example.

 Hence, we want to look at simulation techniques on non-pivotal quantities, $$\textbf{regardless if they're asymptotically pivotal}$$. However, if we do have an asymptotic pivot, then we can state even stronger results. Therefore, it is always desirable to study asymptotical pivots if given the option. 

 ---

 First we introduce the 2 main types of bootstrapping techinques, the parametric and non-parametric bootstrap.


### Parametric Bootstrap

 Suppose we have a dataset x and we want to perform inference on the test statistic $$\gamma$$ (so this could be the OLS regressor coefficient for example). Furthermore, the key difference between this and the non-parametric bootstrap is that we have a fully specified DGP that's just missing a few parameters. 

 Here, $$\gamma$$ depends on the $$\theta$$ of the underlying distribution $$F_{\theta}$$. So what we can do here is to estimate $$\theta$$ with $$\hat{\theta}$$, which could come in the form of MLE or the method of moments. From that, we simply plug our $$\hat{\theta}$$ into the DGP $$F_{\theta}$$ to get $$F_{\hat{\theta}}$$ as if it was the actual parameter and sample from our DGP! 

### Nonparametric Bootstrap

 Unlike the parametric bootstrap, in the nonparametric bootstrap, we do not have a fully specified DGP. Hence what we do instead is to sample with replacement from the data and analyse the empirical CDF. The idea is that the more we resample, we can appeal to Glivenko-Cantelli theorem and suppose that the empirical CDF $$F_n$$ converges to the true CDF $$F_{\theta}$$.

 ---

So we have somewhat similar conditions for each bootstrap technique. We list them below.

- $$F_n \rightarrow F_{\theta}$$ 
- $$J_n(.,F_{\theta}) \rightarrow J_{\infty}(.,F_{\theta})$$

The first one means that we need the empirical CDF to converge to the true CDF. The second one means that the limiting distribution $$J_{\infty}$$ exists for the test statistic distribution $$J_n$$.

Combining these two conditions, it allows us to arrive at 

$$J_n(.,F_{n}) \rightarrow J_{\infty}(.,F_{\theta})$$

In otherwards, the test statistic distribution converges to the true distribution of the test statistic under the correct DGP $$F_{\theta}$$.

---
Now we seek to give a more rigorous proof of all this,

(Assume we are in finite dimensional spaces, not in infinite ones as that requires further generalisation).

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

---

So here, the fact that we have uniform continuity means that 

$$||f_n - f||_{\infty} \rightarrow 0$$  

as $$n \rightarrow \infty$$. 

In other words, the supremum norm goes to 0. Furthermore, since $$f_n$$ are continuous and uniformly converges to f, this means that f is also continuous and hence we have that 

$$lim {x_n \rightarrow x}f(x_n) = f(x)$$

so then 

$$||f(x_n) - f(x)|| \rightarrow 0.$$ 

This shows that 

$$
||f_n(x_n) - f(x)|| \rightarrow 0 \; as\; n \rightarrow \infty
$$ 

for all $$x \in D$$. So relating this back to conditions on the bootstrap, if we don't have $$f_n$$ being continuous, then that means $$f$$ would not be continuous and we would not have 

$$f(x_n) = f(x)$$

as $$x_n \rightarrow x$$. Furthermore, if we don't have uniform convergence, we would not have 

$$||f_n - f||_{\infty} \rightarrow 0.$$


So just drawing parallels to the bootstrap example, it's quite similar where if we let $$f_n = J_n$$ (our test statistic), which is a function of $$F_{n}$$, where in the example above, $$F_n$$ would be $$x_n$$ and $$F_{\theta} = x$$.

---
## Wrapup
So even though it is not an accurate proof, as we still need to generalise this to work for an infinite dimensional vector space, it follows a similar idea on why exactly does the bootstrap work.