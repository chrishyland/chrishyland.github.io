---
title:  "Runge-Kutta Methods Part One"
date:   2019-06-25 09:00:00
layout: post
image: /assets/images/markdown.jpg
headerImage: False
tag:
- Mathematics
- Computer Science
category: blog
author: chrishyland
description: Specifying the slope in Runge-Kutta Methods.
---
## Introduction
Runge-Kutta methods are a family of iterative methods used for solving ordinary differential equations in the setting of Initial Value problems (IVP) where we are given a differential equation $$y'(t) = f(t,y(t))$$ over a time interval $$[t_0,t_1]$$ with a starting point $$y(t_0) = y_0$$. We note that Boundary Value Problems (BVP) are differential equations are different to IVP as there are conditions imposed at the boundaries/extremes of the independent variable. BVP will require different numerical methods. 

The significance of IVP problems is that we are given an initial point and the slope of the function at that point ,from the DE itself. Hence, we want to figure out what is the next point. The algorithm at a high level for Runge-Kutta methods would be taking one step along the slope and picking our next point $$y_*$$ from that step. We then evaluate the slope at that new point $$y_*$$ and step along that new slope. We iterate this process. Hence, the issues we have are:

1) How do we estimate the slope?
2) How far should this step size be?
---
## Introduction to Runge-Kutta Methods

We want to solve differential equations of the form
$$
\frac{dy}{dx} = f(x,y).
$$

The form that we use for all Runge-Kutta methods are:
$$y_{i+1} = y_i + \phi h$$

where h is a step size in x and $$\phi$$ is the slope. An intuitive way of why this form can be seen if we want to solve the differential equation between i to i+1.
$$
\int_{y_{i}}^{y_{i+1}}dy = \int_{x_{i}}^{x_{i+1}}f(x,y)dx
$$
$$
y_{i+1} - y_i = \int_{x_{i}}^{x_{i+1}}f(x,y)dx
$$
$$
y_{i+1} = y_i + \int_{x_{i}}^{x_{i+1}}f(x,y)dx
$$
which matches our form.
---

## Euler's Method
Recall that the form of Runge-Kutta methods are $$y_{i+1} = y_i + \phi h.$$ For Euler's method, we set the slope to be $$\phi = f(x,y) = \frac{dy}{dx}.$$ Hence, the form of the Euler method is 
$$
y_{i+1} = y_i + f(x_i,y_i)h
$$
for a step size h. Hence, we start at the point $$y_0$$ and evaluate the slope $$f(x,y_0)$$. After fixing a step size h, we then arrive at the next point $$y_1$$ by $$y_1 = y_0 + f(x,y_0)h$$.

## Heun's Method
Heun's method is similar to Euler's method except it uses a Predictor and Corrector. That is, it has a different method of calculating the slope $$\phi$$.

The first step is the **predictor** step, which is identical to Euler's method 
$$
y_{i+1}^0 = y_i + f(x_i,y_i)h
$$
Hence we are now at the point $$(x_{i+1},y_{i+1}^0)$$ where $$x_{i+1} = x_i + h$$ and $$y_{i+1}^0$$ is the new value from Euler's method. We can now evaluate to get the slope at our new point $$f(x_{i+1}, y_{i+1}^0)$$. Unlike Euler's method, we don't move along this new slope.

The second step is now we take our original slope $$f(x_i,y_i)$$ and our new slope from our step $$f(x_{i+1}, y_{i+1}^0)$$ and take the average of the two to be our slope $$\phi$$. That is, $$\phi = \frac{f(x_i,y_i) + f(x_{i+1},y_{i+1}^0)}{2}$$. This is known as the **corrector** step. Therefore, our final _actual step_ using Heun's method is 
$$
y_{i+1} = y_i + \frac{f(x_i,y_i) + f(x_{i+1},y_{i+1}^0)}{2}h
$$
where $$y_{i+1}^0 = y_i + f(x_i,y_i)h$$ using Euler's method and $$x_{i+1} = x_i + h$$.
---
## General Runge-Kutta Framework
So we now look at the general form of Runge-Kutta. Recall as always 
$$
y_{i+1} = y_i + \phi h
$$
where $$\phi$$ is the representative slope for the interval h. We analyse $$\phi$$. We can write $$\phi$$ out as 
$$
\phi(x_i,y_i,h) = a_1k_1 + a_2k+2 + .... + a_nk_n
$$
where
$$
k_1 = f(x_i,y_i)
$$
$$
k_2 = f(x_i + p_1h, y_i + q_{1,1}k_1h)
$$
$$
k_3 = f(x_i + p_{2}h, y_i + q_{2,1}k_1h + q_{2,2}k_2h)
$$
$$
k_n = f(x_i + p_{n-1}h, y_i + q_{n-1,1}k_1h + q_{n-1,2}k_2h + ... + q_{n-1,n-1}k_{n-1}h).
$$

Here, **n** refers to the order of the Runge-Kutta method. Looking back from earlier, Euler's method is a $$1^{st}$$-order Runge-Kutta method and Heun's method is a $$2^{nd}$$-order Runge-Kutta method.
---
## 2nd Order Runge-Kutta Methods
We look at 2nd Order Runge-Kutta methods which includes Heun's method in addition to 2 other 2nd order methods. 

Recall that the set up was 
$$
y_{i+1} = y_i + (a_1k_1+a_2k_2)h
$$
where $$k_1 = f(x_i,y_i)$$ and $$k_2 = f(x_i + p_1h, y_i + q_{11}k_1h)$$. The issue is now we need to decide what both $$p_1$$ and $$q_{11}$$ is. Once we have that, we know what $$k_2$$ is. Then we need to decide what $$a_1$$ and $$a_2$$ is. Deciding $$p_1$$, $$q_{11}$$, $$a_1$$, and $$a_2$$ is what leads to alternative methods. 

To figure out what numbers to use, we can use the Taylor series expansion on our set up equation about the point $$y_i$$ on $$a_1k_1 + a_2k_2$$. As a result, we will get the following constraints
$$
\begin{cases}
a_1 + a_2 = 1 \\
a_2p_1 = \frac{1}{2}\\
a_2q_{11} = \frac{1}{2}
\end{cases}
$$
with the 4 unknowns. Hence, we select the unknowns, which is non-unique, as long as it satisfies the constraints.

### 1) Heun's Method
In Heun's method, we set $$a_2 = \frac{1}{2}$$. We can then solve for the rest of the numbers to arrive back as what we did earlier.

### 2) Midpoint Method
In the midpoint method, we set $$a_2 = 1$$/

### 3) Ralston's Method
In Ralston's method, we set $$a_2 = \frac{2}{3}$$.


## 4th Order Runge-Kutta Method
The 4th order Runge-Kutta method is the method that is generally used the most frequently in practice.

The form of the 4th order Runge-Kutta method is 
$$
y_{i+1} = y_i + \frac{1}{6}(k_1+2k_2+2k_3+k_4)h
$$
where we have 
$$
\begin{cases}
k_1 = f(x_i,y_i)\\
k_2 = f(x_i+\frac{1}{2}h,y_i+ \frac{1}{2}k_1h)\\
k_3 = f(x_i+\frac{1}{2}h,y_i+ \frac{1}{2}k_2h)\\
k_4 = f(x_i + h,y_i+ k_3h). 
\end{cases}
$$

**Remark** The tradeoff between using a higher order method is computational cost/complexity in coding up vs accuracy.

## Conclusion
Hence, we have looked at different forms of Runge-Kutta methods by varying the form of the slope $$\phi$$. However, we have not discussed anything about specifying the step size h, which we will do so in the next post, leading to Adaptive Runge-Kutta methods.
