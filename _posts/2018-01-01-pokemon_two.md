---
title: Classification Analysis Part 2!
date:   2018-01-01 09:00:00
layout: post
tag:
- Data Science
- Statistics
category: blog
author: chrishyland
description: More complex Models.
---

_This is the second part of a three part series_. In this part, we will be analysing a few more complex models. I would highly recommend checking out [part one of this series](https://chrishyland.github.io/data%20science/statistics/2017/12/29/pokemon-one.html) if you haven't done so before reading this part.


## Decision Trees
A Decision tree is actually quite an intuitive idea. In this example, we are referring to decision trees for _classification_ problems (although the idea is quite similar for _regression problems_). Let's say we have our Pokémon dataset whereby we are only looking at the scenario whereby the Pokémon is a fire type Pokémon or not. A decision tree is simply a set of rules to follow to then help classify.

Suppose we had a dataset whereby the response variable is whether an individual cheated on their taxes or not, (exciting stuff, I know). We also have a bunch of features associated with each observation such as their marital status, taxable income, and whether they have claimed a tax refund.

<img  src="/assets/pokemon_two_post/Dataset.jpg" alt="Drawing"  style="width: 400px; height: 400px; margin: 0 auto;"/>

From this, we can construct a decision tree. Here's an example:

<img  src="/assets/pokemon_two_post/Decision-Tree.jpg" alt="Drawing"  style="width: 400px; height: 400px;text-align:center;"/>

Decision trees are regular trees upside down, so at the top of the tree here, this is known as the _root node_. We start off here. This node asks the questions whether did the person claim a tax refund or not. So now, let's say you got your dream job at the tax department and you are tasked to investigate whether did Robert cheat on his taxes this year. A machine learning enthusiast you are, you decide to employ a decision tree in order to aid your investigation. After constructing your decision tree, you first ask the question, did Robert claim a tax refund. If he did, we traverse down the left side and we get to a new node called the _leaf node_. Here, there are no more nodes after this node and therefore terminates our traversal down the tree. Here, this node says "Don't Cheat", so therefore we classify that Robert did not cheat on his taxes (very naive I know, but this was just to illustrate a basic example). However, if Robert did not claim a tax refund, then we would have traversed down the right side of the tree until we reach the next node, which then asks whether is Robert married. We then keep on repeating the process until we reach a leaf node and therefore have a classification for Robert.

Note that if the predictor is continuous, then we go left if it's less than or right if it's greater than a certain threshold value (more on how to choose this value in future posts). If the predictor is a categorical one, we then construct _edges_ using the different categories the predictor can take one. On a final note, if this was a regression problem, such as how much will an individual earn from Bitcoin, we would assign the value to be the average of the observations with the same or similar features.

"*So how are these trees constructed?*"

Good question!

We won't delve into the theory for this post but we will in a future post. Quite simply, we seek to split the data via predictors that will generate the _"purest"_ splits.

Here's a clearer example.

<img  src="/assets/pokemon_two_post/Dataset_Two.jpg" alt="Drawing"  style="width: 400px; height: 400px;text-align:center;"/>

Looking at this dataset, we are aiming to predict whether will someone have an affair or not. Hence, we wish to "ask a question" such that it'll give us a definitive answer on how to classify an individual. So if we ask the question "is the individual divorced", we can the split the dataset into 2 subsets, one for individual who answers yes to that question and another for those who answers no. From this, our subsets looks like this:


![Decision Tree]({{ "/assets/pokemon_two_post/Pure-Split.jpg" | absolute_url }})

We can see that for those who answers no to our question (the answer on the right), we can see that all those individuals did not have an affair (as seen from the no's in the affair column). On the left hand side, for those who got a divorced, we can see that that almost all of them will have said yes to our question, except for one individual. Hence, we now need to ask another question for that subset of data to further split it up and isolate that single yes observation.  

As usual, the way we would run this in Python would be:

```python
from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(random_state=0)
tree.fit(X_train, y_train)
tree.predict(X_test)
```


_So why Decision Trees?_

Decision trees can capture non-linear and complex relationships within the dataset unlike linear regression. However, noticeable drawbacks include that the trees are not robust, therefore a small change to the dataset can tremendously affect the tree. Furthermore, decision trees do not have predictive capabilities that are as powerful as other models.

## Bagged Trees

So now, before we go further, I'd like to first introduce 2 ideas known as _bagging_ and _boosting_. Here, we employ the technique called _bagging_, whereby similar to the _bootstrapping_ technique, we sample observations *with replacement* from the original dataset D, to create n new datasets. We then run decision trees on each one using different features as the point in which to split the data. We then take in a new input and take the average value for regression problem or the majority vote for a classification problem. Here, the idea is that with these independent samples, when we take the average, this leads to dramatically lower variance.

![Bagging]({{ "/assets/pokemon_two_post/bagging.png" | absolute_url }})

From this, we can use _bagged trees_ to have multiple decision trees rather than just 1 decision tree. We just train our decision trees on the new datasets created and then take the majority vote on what the trees believe the observation to be.


## Random Forest
A random forest is an improvement on _bagged trees_. However, random forest only allows a _random selection of features_ to be used to split the data for each decision tree. This may sound strange since we are now using less data for each tree we create in the bagged trees model. However, the rationale for doing this is that it prevents one single strong predictor being used to to split the data again and again. If there is a single predictor that is constantly used to split the data, this causes us to have all our trees looking identical with one another. Resultantly, our trees will be highly correlated and in fact not reduce variance which we hoped for with bagged trees. Note that here, we are assuming that the other predictors are therefore strong predictors themselves and that this will lead to overall reduced variance. In other words, if we actually do only have 1 good predictor whilst the rest are useless, then random forest isn't the way to go and we can simply use bagged trees.


##Boosting

_Boosting_ works by having trees grow _sequentially_ or using information from previously grown trees. Instead of bootstrapping, each tree is fitted on a modified dataset. We fit the trees to the residual. We need to however be extremely wary of overfitting, so a _hyperparameter_ (a parameter that we need to choose before running the algorithm) includes the number of trees to actually use. We also have a shrinkage parameter for how fast our trees can learn. Additionally, the number of splits in each tree.

Here's a good image highlighting the difference between bagging and boosting.
![Bagging vs Boosting]({{ "/assets/pokemon_two_post/bagging_and_boosting.png" | absolute_url }})

## Adaptive Boosting
_Boosting_ is related to bagging in the sense we sample observations *with replacement* from the original dataset D, except now, we don't have an equal probability of selecting any observation and instead let observations that were misclassified incorrectly last time have a higher probability of being sampled the next time round. So a good way to think about is that if we are asking someone a multiple rounds of series of questions repeatedly until they get all of them right, if they get a question wrong a few times, then that question will appear more frequently in the next round of questions until the person is able to answer the question correctly. Hence, in Adaptive Boosting, we fit a sequence of _weak learners_ on a series of observations that are sampled with replacement, whereby observations which were misclassified previously are given a higher weight of being resampled again. This leads to a lower bias but higher variance compared to the random forest technique (which also involves bagging).

Notice that for bagging techniques, we can train models simultaneously (or in parallel to one another) whilst for boosting, we need to train models one after another (or sequentially).

To instantiate our Adaptive Boosting classifier object, we simply go:
```python
from sklearn.ensemble import AdaBoostClassifier
clf = AdaBoostClassifier()
```

We have quite a few parameters to set for our Adaptive Boosting classifier. The ones of key importance for now are:

* n_estimators: This tells us the number of weak learners we will use to construct our model. We don't want this to be too high or else we will be overfitting.

* learning_rate: This tells us the rate at which the model will learn.

* base_estimator: This is the underlying estimator that is used to construct the model. The default setting is a Decision Tree but we can use other estimators too!


## Conclusion
We've been able to construct some more basic models and now will move onto move complex models.

Thank you for reading this post and do email me if you have any questions! Stay tune for part three of this short series.
