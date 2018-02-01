---
title:  "Classification Analysis Part 1!"
date:   2017-12-30 09:00:00
layout: post
image: /assets/images/markdown.jpg
headerImage: False
tag:
- Data Science
- Statistics
category: blog
author: chrishyland
description: Basic EDA and simple models.
---

_This is the first part of a three part series_. In this part, we will be doing some exploratory data analysis and looking at a few basic models. The Jupyter notebook for this post can be found [here](https://github.com/chrishyland/chrishyland.github.io/blob/master/Notebooks/Pokemon_one/Pokemon_Analysis_One.ipynb) alongside the [dataset](https://github.com/chrishyland/chrishyland.github.io/blob/master/Notebooks/Pokemon.csv).

## What's this all about?

Today we'll be  exploring numerous classification techniques and applying this new tools so that we can classify what type a Pokémon is given their attributes. This sort of problem can be defined as a _classification_ problem whereby we seek to identify which category an observation belongs to. So in our Pokémon example, given any new Pokémon, we want to classify what type of Pokémon it is.

---

## Dataset
The dataset for the first _six_ generation has kindly already been scrapped for us from the all knowing [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page) on [Kaggle](https://www.kaggle.com/alopez247/pokemon/data). For the ease of analysis, only 8 _features_ will be used in training our model as seen below:

---

## Exploratory Data Analysis
Let's play around with the dataset and see the distribution of the attributes of the Pokémon as a whole (using the amazing [seaborn package](https://seaborn.pydata.org/)):

<div class="toleft">
    <img class="image" src="/assets/pokemon_one_post/Pokemon_Analysis_One_4_1.png" alt="Alt Text">
    <figcaption class="caption">Photo by John Doe</figcaption>
</div>

![My helpful screenshot]({{ "/assets/pokemon_one_post/Pokemon_Analysis_One_4_1.png" | absolute_url }})

We can see that the distribution across attributes looks somewhat symmetric, although there are also quite a few noticeable outliers. To better visualise the distribution, we can use a [*swarm plot*](https://www.kaggle.com/ndrewgele/visualizing-pok-mon-stats-with-seaborn):

![My helpful screenshot]({{ "/assets/pokemon_one_post/Pokemon_Analysis_One_5_0.png" | absolute_url }})

From this, there are some noticeable trends such that certain Pokémon types are associated with higher attributes. Finally, we can see the breakdown of the frequency of Pokémon types in our dataset:

![My helpful screenshot]({{ "/assets/pokemon_one_post/Pokemon_Analysis_One_6_0.png" | absolute_url }})

Here, we must note that massive class imbalances, as some Pokémon primary types such as flying aren't that frequent as compared to other more frequent types such as water. This can lead to difficulties in identifying flying type Pokémon.

---

## Modelling
We will need to make some tweaks to the features such that we recast the generation feature, which tells us from which of the 6 generations of Pokémon the observed Pokémon is from, as a set of 5 dummy variables, not 6 to prevent the [dummy variable trap from happening!](http://www.algosome.com/articles/dummy-variable-trap-regression.html)
Additionally, we also transform the Legendary status feature into a numeric dummy variable.

We split the dataset up in a 80-20 training/test data split. The training set will be used to train our models whilst the test dataset _must not be touched until the end of the analysis_ upon which we will have an independent dataset to see how well our models perform.

We have quite a few models to try out! These include:

* Logistic Regression

* Naive Bayes

* Decision Trees

* Random Forest

* Adaptive Boosting

* Gradient Boosting

This post will cover the logistic regression and Naive Bayes in detail, leaving the remaining models to be discussed in the next post. Do note that these models will be covered at a shallow level (don't worry though, more rigorous explanations will come in later posts!)

### Logistic Regression

Don't let the fancy name "logistic" scare you! What the "logistic" part stands for is simply applying a function on our regression, more on this later.

For a general overview before diving in, let us consider the _binary classification_ case where we simply want to classify a single class. What this means is given a Pokémon, is it a fire type Pokémon or _not_ a fire type Pokémon? We won't worry about other types for now as that is known as _multiclass classification_. So if we were given some features/attributes about an unknown Pokémon such as its attack points, health points, and more, will we classify it as a fire type Pokémon or not.

Hopefully from your introductory statistics class, you've seen the humble linear regression with p features at some point:

$$Y = \beta_0 + \beta_1x_1 + ... + \beta_px_p$$

What this mean is given some features about our Pokémon, different values for the features will increase (or decrease) the probability that the Pokémon is a fire type. For an easier example, let us consider the _simple linear regression model_ with only 1 feature \\(x_1\\):

$$Y = \beta_0 + \beta_1x_1$$

Let's suppose that \\(x_1\\) is the attack points of a Pokémon, and that \\(\beta_1\\) is 0.02. Therefore, for every attack point increase in a Pokémon, increases the probability that the Pokémon is a fire type by 0.02. Plug a fixed value in for \\(\beta_0\\) and varying numbers for \\(x_1\\) to see for yourself!

We can however extend from this linear framework and consider _generalised linear models_ whereby we make different assumptions regarding the distribution of Y. This linear regression model is known as the *linear probability model* whereby the response variable Y is a discrete set of values or categories. We now make the assumption that Y is a binary value, whereby it can take on either the value 0 or 1. An example could be where we are trying to classify whether will an individual pass their statistics course. We can then make the assumption that the response value, whether they passed or not, follows the [Bernoulli distribution](https://www.statlect.com/probability-distributions/Bernoulli-distribution). Resultantly, this means that we are attempting to model the conditional probability \\(P(Y=1\|X=x\\)). In plain English, this means, given a certain observation and their values, what is the probability that the individual will pass their course. An example for X=x could be that we have an observation with a family income of 60,000 dollars and they are male, what is the probability that the individual will pass their course P(Y=1). However, there are a few obvious issues with using this model as a classification model:

* There is no guarantee that the the probabilities generated will be between 0 and 1 because if they don't, this violates the axioms of probability!!!. Lots of bad things are gonna happen if we start predicting that certain people will pass a course with more than 100% probability.

* The error variance is not constant with this model. For the technical details, the variance of the Bernoulli distribution is p(x)(1-p(x)) whereby p(x) = P(Y=1\\(\|\\)X=x). From this, we can see that the variance depends on the observed values \\(\textbf{x}\\) of an individual.  This is normally not too much of an error since we can use _generalised least squares_, which helps to solve for heteroskedasticity.

* The linear probability model does not generalise to multi-classes.

* The partial effects are always contant.

Primarily, to get over the first issue, we can apply the *logit transformation* to the linear probability model. This logit transformation is defined as follows:

$$\frac{exp(\beta_0)}{1 + exp(\beta)}$$

So if you try plug in any numbers into the linear probability model, you will notice that every output from the logit transformation will give us a number between 0 and 1, which is exactly what we want! I find that this graph helps to solidify the concept:
![Logit function]({{ "/assets/pokemon_one_post/Logit_function.png" | absolute_url }})
Here, we defined that the linear regression model to be \\(\eta\\) and the logistic function to be \\(\Delta\\) for notation simplicity. From this, we can see that the linear regression model \\(\Delta\\) can give us any value whilst the logistic function will transform the value to be between 0 and 1. Note that we never quite reach 0 or 1 at either end of the graph but it does _converge asymptotically_.

Finally, let us explore more on what we mean by we usually can't have the partial effects constant. As an example, let us imagine we are looking at the probability of someone being happy as a result of eating ramen. The increase in probability of someone going from eating 0 to 1 bowl of ramen is surely not the same probability increase as going from his 5th to 6th bowl of ramen (this example is somewhat related to the idea of _diminishing marginal utility for the Econ geeks_). The logistic regression takes care of this since now the partial effects depends on the level we are at (here the level refers to the number of bowls of ramen we are  eating).

To actually compute the parameters \\(\beta\\), we can use [maximum likelihood estimation](https://onlinecourses.science.psu.edu/stat414/node/191) to get these values. Simply put, we are optimizing the parameters via the likelihood function (more on this in another post!).

In Python (using the amazing sklearn package), all this is simply:


```python
from sklearn.linear_model import LogisticRegression

# Creates logistic regression object.
Logistic_reg = LogisticRegression()

# Training our model on training set.
Logistic_reg.fit(X_train, y_train)

# Making our final predictions on test set.
predictions = Logistic_reg.predict(X_train)
```



In conclusion, we are simply running our usual linear regression except we are then applying a logistic transformation onto it in order to keep the predicted probability values between 0 and 1.

More information about the logistic regression in sklearn can be read on their [site](http://scikit-learn.org/stable/modules/linear_model.html#logistic-regression).

### Naive Bayes
As good pracitioners of data science, it always good to have numerous tools in our tool kit to utilise in different scenarios. Another well known one is the _Naive Bayes_ model.

Now we are going to need some probability theory. Recall that the *product rule* from probability is defined as:

$$P(X \cup Y) = P(X,Y) = P(Y|X)P(X)$$

Translating this into English, this just tells us what the probability of the joint event of X and Y occurring, where X and Y are both events. We can then rearrange this to get:

$$P(Y|X) =  \frac{P(X,Y)}{P(X)}$$

Using some math hacks which you need not concern with, we can arrive at:

$$P(Y|X) =  \frac{P(X|Y)P(Y)}{P(X)}$$

The Naive Bayes classifier is a simple generative model based on the assumption that predictors are conditionally independent given the class label. It is considered "naive" because we do not in fact believe that features are not conditionally independent. A more concrete example would be, let us say we are given a new Pokémon (let's call it Charmanchu), we want to classify whether Charmanchu is a fire type or not. The Naive Bayes assumption in this case would be, if Charmanchu was a fire type Pokémon (Y=1), what is the probability of seeing the observed features of Charmanchu (such as having high attack points but low health points). So intuitively, if fire type Pokémon tend to have high attack points and low health points, then the probability of seeing the observed results P(X\\(\|\\)Y=1) would be quite high. From this, we will be more likely to classify Charmanchu as a fire type Pokémon. So from our Naive Bayes assumption, the class conditional density of P(X\\(\|\\)Y) becomes:

$$P(X|Y) = \Pi_{j=1}^{p} P(X_j|Y)$$

P(X\\(\|\\)Y) is normally tricky to compute since to actually compute the probability, we need to take into account the ways in which the predictors can correlate with one another. Thus naive assumption simply assumes that these predictors are independent with one another, _conditioned on the class_. Therefore, it makes calculations *significantly easier* as we now just need to only consider the probability of the values each predictor can take on. We can make an assumption regarding the distribution of each predictor, whether it be Gaussian, binomial, or any other. From all this, we simply just plug numbers in to whatever formula of the distribution we specified the predictor to be in order to get our class conditional density P(X\\(\|\\)Y).

Naive Bayes makes it hard to overfit the data, which is quite good, and really shines for when we have a large number of features. This relates back to [bias-variance tradeoff](http://scott.fortmann-roe.com/docs/BiasVariance.html) since the assumption of class-conditional independence leads to more biased probabilities but also reduces the variance, which can be substantial if we have numerous features that are correlated. We estimate the parameters for the Naive Bayes model via maximum likelihood estimation, just like in the case of the logistic regression.

Back to our Charmanchu example. Let us say we would like to classify it as either a fire type Pokémon or not. Recall that from our derivations, we have that:

$$P(Y|X) =  \frac{P(X|Y)P(Y)}{P(X)}$$

where from our Naive assumption, we have that:

$$P(X|Y) = \Pi_{j=1}^{p} P(X_j|Y)$$

So the probability of Charmanchu being a fire type Pokémon would be represented by the probability P(Y=1\\(\|\\)x) whilst the probability of not being a fire type Pokémon would be P(Y=0\\(\|\\)x). Therefore we have 2 equations:

$$P(Y=1|X) =  \frac{P(X|Y)P(Y)}{P(X)}$$

$$P(Y=0|X) =  \frac{P(X|Y)P(Y)}{P(X)}$$

Notice that the denominator is the same in both cases and simply scales the probability. We can simply drop the denominator as a result and only focus the numerator.

$$P(Y=1|X) =  P(X|Y)P(Y)$$

$$P(Y=0|X) =  P(X|Y)P(Y)$$

Here, we will classify Charmanchu as being a fire type Pokémon if the probability of being a fire type Pokémon is higher (this makes intuitive sense). So in mathematical terms, this would mean that

$$P(Y=1|x) > P(Y=0|x)$$

Hence, we simply classify Charmanchu into the class with the highest probability.

In Python, the steps are quite similar to the logistic regression:

```python
from sklearn.naive_bayes import GaussianNB
# Creates Naive Bayes object.
naive_bayes = GaussianNB()
# Training our model on training set.
naive_bayes.fit(X_train, y_train)

# Making our final predictions on test set.
predictions = naive_bayes.predict(X_train)
```


## Conclusion
We've been able to construct some basic models and now will move onto move complex models.

Thank you for reading this post and do email me if you have any questions! Stay tune for part two of this series.
