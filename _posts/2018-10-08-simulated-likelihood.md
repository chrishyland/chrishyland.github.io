---
title: Simulated Maximum Likelihood
date:   2018-10-08 10:00:00
layout: post
tag:
- Econometrics
- Computer Science
category: blog
author: chrishyland
description: An introduction to SML
---
# Introduction
### Terminology

We give a quick refresher of maximum likelihood. 


Here, we have a dataset y, which consist of $$y_1, y_2, ..., y_n$$. An important part is that y comes from a fully specified parameteric DGP, which has a k-dimensional parameter vector $$\theta$$. From that, we can define a density function 

$$f(y|\theta)$$ 

which is y as a function of $$\theta$$. We can define a likelihood as the PDF where we now look at $$\theta$$ as a function of y.

The maximum likelihood estimator of $$\theta$$ is

$$
\hat{\theta} = argmax_{\theta \in \Theta}f(y|\theta).
$$

In other words, the $$\theta$$ that maximizes the likelihood.

##### Likelihood Function

The likelihood function under the assumption of i.i.d sampling is the product of likelihoods. 
$$
f(y|\theta) = \prod_{i=1}^nf_i(y_i|\theta,y_1,...,y_{i-1}).
$$


Each $$f_i$$ is the likelihood contribution of the i-th observation. This is usually a small number and multiplying lots of small number is computationally expensive. Hence, we work with the loglikelihood function as it is easier to work this summing loglikelihoods.

$$
\ell(y|\theta) = ln\;f(y|\theta) = \sum_{i=1}^n\ell_i(y_i|\theta,y_1,...,y_{i-1})
$$

Due to the monotonicity of the log function, the loglikelihood and likelihood functions are maximised by the same value of $$\theta$$.

We denote the gradient (score) as

$$
g(\theta) = \frac{\partial \ell (y|\theta)}{\partial \theta}
$$

is a $$k X 1$$ vector.

---


### Simulated Maximum Likelihood

We may come across issues when we can't even compute the likelihood function $$\ell$$. In particular, this arises when we have intractable integrals, like in the case of each likelihood looking:

$$
f(y_i|\theta) = \int_{\mathcal{D}}v(y_i|\theta,\eta_i)p(\eta_i)d\eta
$$

with p being the density function with support $$\mathcal{D}$$. v(.) is the density of $$y_i$$ assuming both $$\theta$$ and $$\eta_i$$ are known. Simulated Maximum Likelihood approximates the integral using $$\textbf{monte carlo integration}$$, where we hope that the Monte Carlo error isn't too bad. Note that we are given a distribution with PDF $$p(\eta_i)$$ which we want to use. From that, there is usually only 1 choice of a function v(.) that works well with it, notice that this does not mean there is an unique v(.), just an "optimal" v(.). From this, if v(.) is nice and smooth, we set the subsimulator to be v(.) or else if it is not, we instead need to approximate it.

---

So the procedure for doing this is as follows. 

First, we draw $$\eta_i^{(s)}$$ from the distribution with the density p and find a function $$\tilde{f}$$, which is known as the $$\textbf{subsimulator}$$, where we require that

$$
E\big[\tilde{f}(y_i|\theta,\eta_i)\big] \approx f(y_i|\theta).
$$

In other words, the expectation of our subsimulator gives us something similar to our function v(.). The best case of this would be if we could let $$\tilde{f} = v$$, our function that we are integrating over. However, this may cause issues at times, especially if the resulting $$\hat{\ell}$$ being discontinuous can cause issues with our optimisation routines, so using a different subsimulator that is smooth can help us dramatically. However, using a different subsimulator will increase the bias and hence we shouldn't oversmooth it and therefore try pick a subsimulator that is smooth but also as close to v as possible.

From this, we then compute the $$\textbf{simulator}$$ using Monte Carlo Integration, 

$$
\hat{f}(y_i|\theta,\eta_i^S) = \frac{1}{S}\sum_{s=1}^S\tilde{f}(y_i|\theta, \eta_i^{(s)})
$$

where we have that 

$$\eta_i^{S} = \big(\eta_i^{(1)},\eta_i^{(2)},...,\eta_i^{(S)}\big)'$$

In other words, the simulator is the average of the subsimulator being applied onto random draws of $$\eta$$ from the distribution with a PDF of $$p(\eta)$$.

Finally, we compute the _approximate likelihood_ with 

$$\hat{\ell}(y|\theta, \eta^S) = \sum_{i=1}^nln\hat{f}(y_i|\theta,\eta_i^S)$$

As $$\hat{f}$$ is not necessarily the right likelihood function, we instead call it an approximate likelihood function. Furthermore, this approximate likelihood depends on draws of $$\eta$$ which are random, hence it'll be different for each set of $$\eta$$ we draw. However, if we draw a large sample of $$\eta$$, we should get the same $$\eta$$ draws and hence this should not vary greatly. In particular, we need that $$\sqrt{n}/S \rightarrow 0$$ as $$S \rightarrow \infty$$, so that we get efficiency. We now maximimise this $$\hat{\ell}$$ as if it was the original likelihood $$\ell$$, in order to find $$\hat{\theta}$$ using techniques we discussed earlier. 

Note that when maximising, we need to ensure we use the same $$\eta^S$$ for every $$\theta$$ or else we are changing the approximate likelihood as it depends on $$\eta$$.

In terms of asymptotitcs, we need that $$\hat{f} \rightarrow f$$ as $$n \rightarrow \infty$$ and $$S \rightarrow \infty$$, so that $$\hat{\theta} \rightarrow \theta$$ as a result of consistency. Hence, we need to pick the right subsimulator. On top of that, if we want $$\textbf{efficiency}$$, we require that $$\frac{\sqrt{n}}{S} \rightarrow 0$$. The asymptotic distribution of $$\hat{\theta}$$ is the same. 

Hence, in finite samples, the bias can be extremely severe if we use subsimulator that are not equal to v, that is, $$\tilde{f} \neq v$$. The only case when we should do this is to prevent numerical problems. Furthermore, as a result of Monte Carlo integration used in this, we can use antithetic acceleration or if the function to sample from f to generate $$\eta$$ is difficult to sample from, we can use importance sampling.