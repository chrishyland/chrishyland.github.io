---
title: Cochrane-Orcutt Procedure
date:   2018-10-21 10:00:00
layout: post
tag:
- Econometrics
category: blog
author: chrishyland
description: A self discussion on the Cochrane-Orcutt procedure
---



### Cochrane what? What is the purpose of even doing this procedure? Can't I just regress $$y_t$$ on $$x_t$$ and be done with it?

Recall that if we have serial correlation/autocorrelation with our error terms, then we would have that inferences on our $$\beta$$ parameters won't turn out well. In particular, the standard errors would be too small, leading to large test statistics (since you divide $$\beta$$ by the standard error), and hence this can lead to "easier" rejections of the null that $$\beta = 0$$. (On a side note, you can use the Breusche-Godfrey test to check whether does this serial correlation exist). 

So what the Cochrane Orcutt procedure will do is that it will take your $$y_t$$ and $x_t$ variable and construct new variables $$\tilde{y}_t$$ and $$\tilde{x}_t$$ such that when you regress these 2 variables on each other, your serial correlation problems are solved and you can now do inferences like before!



### Wow that's amazing! So how do I go about doing this?

It's simple! First, you need to construct your new variables duh. 



### Okay... How do I go about doing that?

Oops, my bad. So first of all, we just run our usual OLS regression of the original $$y_t$$ and $$x_t$$, so that we have

$$

y_t = \alpha + \beta x_t + e_t

$$

where $$e_t$$ is our residual terms from the regression.



### I suspect that the residuals will be involved in the construction of these new variables?

Right you are! So after running our regression above, we need to then save our residuals $$e_t$$. Then, we can run an AR(1) model on our residuals to get

$$

e_t = \rho e_{t-1} + v_t

$$

So now we need to keep track of the coefficient of the slope in this regression, that is, we need to save that $$\rho$$ term.



### Alright! What next?

Now we can construct our variables! Recall that differencing our variable is taking our data and subtracting the lag from it. That is, an ordinary differencing would be 

$$

y_t - y_{t-1}

$$

where in Stata, you can do this by generating a new variable from taking your variable and subtracting the lag of it (I think going L.variable will get the lag using that L command).



However, we are doing quasi-differencing, so what we instead do is multiply our lag term by the $$\rho$$ from our earlier AR(1) of the residuals. So what we have is

$$

\tilde{y}_t = y_t - \rho y_{t-1}.

$$

and

$$

\tilde{x}_t = x_t - \rho x_{t-1}.

$$

We now have our quasi-differenced variables $$\tilde{y}_t$$ and $$\tilde{x}_t$$!



### Awesome! So do I just regress them on each other now?

Yep! So now in our regression, we would have

$$

\tilde{y}_t = \tilde{\alpha} + \beta \tilde{x}_t + v_t

$$

### So what's up with the coefficients now?

So fortunately for us, the $$\beta$$ on $$\tilde{x}_t$$ will be the same $$\beta$$ as in our original regression with $$x_t$$! Hence, we can just do inference as before! A small caveat is that our intercept is now different as it is now $$(1 - \rho)\alpha$$ or something like that, but don't worry about that.



### Wait, my coefficient is different for $$\beta$$???

That's okay! It might be different by a tad bit, but fortunately this estimator is still unbiased and its effectively the same as doing inference on the original $$\beta$$.

---


I may have told a little white lie when I said that the result from the Cochrane-Orcutt procedure will give you the same (similar) value of $$\beta$$ as the OLS estimator. 

When we use $$\hat{\rho}$$, this is a consistent estimator of $$\rho$$ and you are also correct in that this whole procedure results in a Feasible GSL estimator $$\beta_j$$. It is also a good point that you mentioned that we can only use $$\hat{\rho}$$, not $$\rho$$ itself and that FGLS estimator will not be unbiased but it is consistent. However, we have given up the unbiased property but what we get in returns is that this estimator is asymptotically more efficient than just using OLS if serial correlation holds. Also, our standard errors will be corrected and will be larger, making inferences more valid. It is a trade-off, but we are happy with this tradeoff because remember, being unbiased is not always the ultimate goal as I highlighted here.

For the purposes of most cases, the $$\hat{\beta}$$ from Cochrane-Orcutt and OLS should be the same (or really really similar). However, there are cases where they aren't because for this FGLS estimator, we also require the condition that 

$$Cov[(x_{t-1} + x_{t+1}, u_t] = 0$$

so instead of $$u_t$$ uncorrelated with $$x_t$$, it also needs to be uncorrelated with $$x_{t-1}$$ and $$x_{t+1}$$. So when OLS and FGLS gives significantly different results, we should use OLS because the OLS model is likely to still be consistent whilst the FGLS is now producing misleading results.


---

### Long story short

For the purposes of most cases, the Cochrane-Orcutt procedure and OLS should give you the same (or really similar results). In this case, you use the estimates from Cochrane-Orcutt as they are more efficient and asymptotically valid (but they are biased like you mentioned.)

However, there are cases where they will give you dramatically different results and in those cases, just stick with OLS because it's quite likely that the assumption outline earlier does not hold for the Cochrane-Orcutt procedure. There are ways to check on whether are these differences significant enough to warrant just using OLS instead but this is way beyond the scope of this post.

---

Thanks!