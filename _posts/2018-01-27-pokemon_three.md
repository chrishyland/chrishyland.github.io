---
title: Classification analysis Part 3!
date:   2018-01-27 01:00:00
layout: post
tag:
- Data Science
- Statistics
category: blog
author: chrishyland
description: Evaluation of models.
---

_This is the final part of a three part series_. In this part, we will be evaluating all our previous models using different metrics. I would highly recommend checking out [part one of this series](https://chrishyland.github.io/data%20science/statistics/2017/12/29/pokemon-one.html) and [part two](https://chrishyland.github.io/data%20science/statistics/2018/01/01/pokemon_two.html) if you haven't done so before reading this part.

## Model Evaluation

So, let us suppose we have our Charmander and we wish to classify her into a class or predict the type of Pokémon she is. Imagine we simply want to only classify whether is a Pokémon a fire type or _not_ a fire type Pokémon. After running your usual classification models on our dataset full of different Pokémon, we have our predictions for each Pokémon. Now, how can we quantify whether were our predictions any good at all? This is the focus of this post and we will delve into the different metrics one can use for doing so. Note that here we already know whether the Pokémon is a fire type or not, and you may ask yourself "why even bother running these models if we already know whether it is a fire type or not?". Good point! The reason is that if our model works well on this dataset, then hopefully it is generalisable and will be able to predict future Pokémon's type outside of our dataset.

## Confusion Matrix

A very nice way to summarise the accuracy of our predictions is through something called a _confusion matrix_. A _confusion matrix_ simply shows the number of correct and incorrect misclassifications on a more granular level. Here, we can visualise a confusion matrix as a matrix grid as seen below:

<img  src="/assets/pokemon_three_post/confusion_matrix.png" alt="Drawing"  style="width: 400px; height: 300px;text-align:center;"/>

Now it may get confusing as sometimes the entries can get swapped around depending on which confusion matrix you look at. So let's step through this matrix in particular slowly. n=165 will refer to the fact we have 165 Pokémon in our dataset in which we are trying to predict whether it is a fire type Pokémon or not (note that if we predict it to not be a fire type Pokémon, it doesn't then tell us what type it actually is which may needed in some scenarios).

The column headers (prediction) can be interpreted as the prediction we made whilst the rows (actual) tells us what whether the Pokémon was actually a fire type or not. So the top left quadrant refers to us making a correct prediction of the Pokémon _NOT_ being a fire type, from the column it is in, whilst the actual type is _NOT_ a fire type, as seen from the row. Hence, we have made a *correct* prediction of the Pokémon _NOT_ being a fire type! We call this a *True Negative* (TN) as we have made a prediction that the Pokémon was *not* (hence where the word negative comes from) a fire type Pokémon, which was correct! From this, we see that we have 50 Pokémon where we have correctly predicted that it was _not_ a fire type Pokémon.

Now we can work through this much faster.

Here, the bottom right quadrant is known as a *True Positive* (TP). This means that if we classified Charmander as a fire type, and she is indeed a fire type, then we classified her into the right class. We have just made a *correct* prediction of Charmander being a fire type! This is just simply the opposite case of the true negative.

Furthermore, the top right quadrant is known as a *False Positive*. We predicted a Pokémon to be a fire type Pokémon as seen from the column, where instead it was actually _not_ a fire type Pokémon as seen from the row. We have made an *incorrect* prediction that the Pokémon *was* a fire type Pokémon.

Finally, the bottom left quadrant is known as a *False Negative* whereby we predicted the Pokémon to not be a fire type Pokémon when instead it was actually a fire type Pokémon. Hence, we have failed to correctly identify that it was a fire type Pokémon.

So to recap:
* True Positive: Correctly predicted that the Pokémon was a fire type Pokémon.
* True Negative: Correctly predicted that the Pokémon was _not_ a fire type Pokémon.
* False Positive: Incorrectly predicted that the Pokémon was a fire type Pokémon.
* False Negative: Incorrectly predicted that the Pokémon was _not_ a fire type Pokémon.

With this foundation, we can now go on to build metrics that we will want to use!

<img src="/assets/pokemon_three_post/charmander.png" alt="Drawing" align="middle" style="width: 200px;"/>

## Accuracy
This is usually the most intuitive metric, as we tend to use it quite frequently in everyday life. Simply put, this looks at the fraction of accurate predictions our model has made from identifying both fire type and non fire type Pokémon. Simply put, this is the true positives + the true negatives over all the metrics.

$$\frac{True Positive + True Negative}{TP + TN + FP + FN}$$

Whilst this seems reasonably fine as a starting point, note that there are lots of flaws with this model which can mislead you. One such example is that if we had a _class imbalance_ such that we are trying to predict something rare that occurs once every 100 observations, we can still achieve 99% accuracy by just classifying everything as negative. A more concrete example could be a fatal disease that is present in only 1 out of every 100 people. Our medical equipment could simply declare everyone to not have the disease and have correctly identified 99 people as not having the disease. Resultantly, the model has an accuracy of 99%! However, that is indeed a terrible model for the one person who doesn't have it and perhaps we are concerned about identifying that one person. Hence, the biggest flaw imo with this statistic is the way that it can mislead people regarding the strength of the model. Hence, we must take a more nuanced approach to using metrics.


## Sensitivity
What this metric refers to is how sensitive is our model in identifying fire type Pokémon? Phrased differently, if a Pokémon is indeed a fire type Pokémon, how well is our model able to notice and identify that it is a fire type Pokémon. Therefore, sensitivity can then be stated as, out of all the fire type Pokémon Pokémon, how many did we accurately identified as a fire type Pokémon. Referring to what we discussed earlier, we can describe this as the fraction of True Positives over Actual Positives (True Positive + False Negative) or in other words:

$$\frac{TP}{TP+FN}$$

A point of confusion is why False Negative is used instead of False Positive. Remember that False Negative refers to us predicting the Pokémon to NOT be a fire type when in fact it was. Therefore, False Negatives tells us how many more fire types there are that we did not correctly identify. Meanwhile, False Positives says that how many Pokémon did we identify as fire type, but instead were not. Therefore the Pokémon itself is not a fire type and hence it does not contribute to the total number of fire type Pokémon.

FYI, there are many names for sensitivity that you may come across such as _recall_ and _true positive rate_. So whenever you see these names instead, know that they refer to sensitivity.

## Specificity
This is the opposite to sensitivity. How well is our model able to identify non fire type Pokémon out of all the possible non fire type Pokémon. Or in otherwords, the True Negative out of Actual Negatives (True Negative + False Positive).

$$\frac{TN}{TN+FP}$$

We use False Positives here for the inverse reason of using False Negatives in when computing the _sensitivity_. Now why might we be concern of this sort of metric? There are a few scenarios when we want to use this metric such as identifying cars that will _not_ pass safety inspections, companies that will _not_ have a profitable quarter, and more! Quite frankly though, it's really how you frame the question as to when to use specificity or sensitivity.

### Trade-off Between Sensitivity and Specificity
Just a little note here that like all things, there is always a trade-off. In this case, we also have a trade-off between the sensitivity and specificity of our model.

One extreme example for illustration purpose is as follow. If we want a model with high sensitivity, that is, we want to identify as many of the fire type Pokémon as possible, the model can then simply predict every Pokémon to be a fire type. Looking at this, we have undoubtedly correctly identify all fire Pokémon since we have identified everything as fire type Pokémon. This gives a maximum value of 1 for the sensitivity since we have correctly identified all fire types. However, we have also incorrectly misclassified every Pokémon that is not a fire type. Therefore, we have not identified any Pokémon whose type is _not_ a fire type. From this, the number of _true negatives_ are 0. Hence, the specificity is given a minimum value of 0.

We can also reverse the scenario whereby if we classify every Pokémon as not a fire type, the specificity shoots up to 1 whilst sensitivity plummets to 0 for the opposite reasons as above.

Hence, we can see that for anywhere in the middle, increases in the sensitivity/specificity will lead to a decrease in the specificity/sensitivity.

## Precision
The precision measures how accurate are your positive classifications. Simply put, out of all the predictions we made that a Pokémon is a fire type, how many of those predictions were accurate? In other words, this is the number of true positives over total positive predictions we have made (true positives + false positives). This can be represented by:

$$\frac{TP}{TP+FP}$$

This may seem quite a reasonable metric at first but it can still be misleading. One notable scenario is when we find out that the model tends to stay on the safe side when making positive classifications. A clear example is that for a sample size of 100, it could've just made one positive classification for the one observation whereby the model is _extremely_ sure that it is a fire type. This then undoubtedly minimises the number of incorrect positive errors. Resultantly, we have the precision formula giving us \\(\frac{1}{1})\\ for a maximum value of 1 if we only made 1 positive prediction, which was correct. This can have alot of potential consequences as there could have been 30 other Pokémon in the dataset that are fire types but our model didn't classify them as such since it wasn't extremely sure that they were fire types. This can be an issue for things whereby worst case scenarios are really threatening such as when screening for cancer, even if there's only a 30% chance of cancer, you'd rather have your body identified for cancer than risk not having it identified for cancer and then later spreading.

## Conclusion
Hopefully this post has introduced you to a few potential metrics to use next time you run your models! Whilst there are still quite a few other metrics such as the ROC curve which are highly utilised, I believe that these metrics are a decent foundation to learn about other metrics. Hope that this mini-series has been a good introductory level of the steps involved in a typical process of data science classification!
