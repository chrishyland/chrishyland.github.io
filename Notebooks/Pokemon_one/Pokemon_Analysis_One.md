

```python
import pandas as pd
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
data = pd.read_csv('Pokemon.csv')
data = data.set_index('#')
```


```python
data.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Name</th>
      <th>Type 1</th>
      <th>Type 2</th>
      <th>Total</th>
      <th>HP</th>
      <th>Attack</th>
      <th>Defense</th>
      <th>Sp. Atk</th>
      <th>Sp. Def</th>
      <th>Speed</th>
      <th>Generation</th>
      <th>Legendary</th>
    </tr>
    <tr>
      <th>#</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Bulbasaur</td>
      <td>Grass</td>
      <td>Poison</td>
      <td>318</td>
      <td>45</td>
      <td>49</td>
      <td>49</td>
      <td>65</td>
      <td>65</td>
      <td>45</td>
      <td>1</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Ivysaur</td>
      <td>Grass</td>
      <td>Poison</td>
      <td>405</td>
      <td>60</td>
      <td>62</td>
      <td>63</td>
      <td>80</td>
      <td>80</td>
      <td>60</td>
      <td>1</td>
      <td>False</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Venusaur</td>
      <td>Grass</td>
      <td>Poison</td>
      <td>525</td>
      <td>80</td>
      <td>82</td>
      <td>83</td>
      <td>100</td>
      <td>100</td>
      <td>80</td>
      <td>1</td>
      <td>False</td>
    </tr>
    <tr>
      <th>3</th>
      <td>VenusaurMega Venusaur</td>
      <td>Grass</td>
      <td>Poison</td>
      <td>625</td>
      <td>80</td>
      <td>100</td>
      <td>123</td>
      <td>122</td>
      <td>120</td>
      <td>80</td>
      <td>1</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Charmander</td>
      <td>Fire</td>
      <td>NaN</td>
      <td>309</td>
      <td>39</td>
      <td>52</td>
      <td>43</td>
      <td>60</td>
      <td>50</td>
      <td>65</td>
      <td>1</td>
      <td>False</td>
    </tr>
  </tbody>
</table>
</div>



## EDA


```python
data2 = data.copy(deep=True)
del data2['Legendary']
del data2['Generation']
del data2['Total']
```


```python
%matplotlib inline
sns.boxplot(data=data2)
plt.title("Pokemon Stats Overview")
```




    <matplotlib.text.Text at 0x11b21b668>




![png](Pokemon_Analysis_One_files/Pokemon_Analysis_One_4_1.png)



```python
# Many thanks to: https://www.kaggle.com/ndrewgele/visualizing-pok-mon-stats-with-seaborn for this graph.
pkmn = pd.melt(data2, id_vars=["Name", "Type 1", "Type 2"], var_name="Stat")
sns.set_style("whitegrid")
with sns.color_palette([
    "#8ED752", "#F95643", "#53AFFE", "#C3D221", "#BBBDAF",
    "#AD5CA2", "#F8E64E", "#F0CA42", "#F9AEFE", "#A35449",
    "#FB61B4", "#CDBD72", "#7673DA", "#66EBFF", "#8B76FF",
    "#8E6856", "#C3C1D7", "#75A4F9"], n_colors=18, desat=.9):
    plt.figure(figsize=(12,10))
    plt.ylim(0, 275)
    sns.swarmplot(x="Stat", y="value", data=pkmn, hue="Type 1", split=True, size=7)
    plt.title('Attributes across Pokémon types')
    plt.legend(bbox_to_anchor=(1, 1), loc=2, borderaxespad=0.);
```


![png](Pokemon_Analysis_One_files/Pokemon_Analysis_One_5_0.png)



```python
types = pkmn['Type 1']

colors = [
    'yellowgreen',
    'gold',
    'lightskyblue',
    'lightcoral',
    'yellow',
    'lightgreen',
    'silver',
    'white',
    'pink'
]

explode = np.arange(len(types.unique())) * 0.01
plt.figure(figsize=(20,30))
types.value_counts().plot.pie(
    explode=explode,
    colors=colors,
    title="Types of Pokemon",
    autopct='%1.1f%%',
    shadow=True,
    startangle=90,
    figsize=(9,8)
)
plt.title("Percentage Types of Pokemon", y=1.1)
plt.tight_layout()
```


![png](Pokemon_Analysis_One_files/Pokemon_Analysis_One_6_0.png)


## Feature Engineering


```python
# Not interested in type 2.
del data['Type 2']
del data['Total']

# Create a binary response variable for each type and generation.
type1 = data.pop('Type 1')
response_values = pd.get_dummies(type1)
dummies_list = []
for x in response_values:
    word = 'Type_1_' + x
    dummies_list.append(word)
response_values.columns = dummies_list

gen = data.pop('Generation')
dummies_2 = pd.get_dummies(gen)
dummies1list = []
for x in dummies_2:
    word = 'Generation_' + str(x)
    dummies1list.append(word)
dummies_2.columns = dummies1list
```


```python
# Finalising the dataset.
data = pd.concat([data, dummies_2], axis=1)

# Set the base case as a normal pokemon from the 6th generation.
del response_values['Type_1_Normal']
del data['Generation_6']
del data['Name']
#Converts the boolean column into a column of 0's and 1's.
data.Legendary = data.Legendary.astype(int)
```

## Modelling


```python
from sklearn.model_selection import train_test_split
from sklearn import preprocessing

# Creating training and test set with 80-20 split.
X_train, X_test, y_train, y_test = train_test_split(data, response_values, test_size = 0.2, random_state = 100)

# Normalise the features for some models
norm_train = preprocessing.normalize(X_train)
norm_test = preprocessing.normalize(X_test)
```

Models to try out are:

* Logistic Regression
* Naive Bayes
* Decision Trees
* Random Forest
* Adaptive Boosting
* Gradient Boosting


```python
from sklearn.metrics import confusion_matrix, accuracy_score

def predictingModel(model):
    '''Computes accuracy and confusion matrices for models without normalised features.'''
    accuracy = []
    confusion_matrices = []
    for y_type in y_train:
        model.fit(X_train, (y_train[y_type]))
        pred = model.predict(X_test)
        confusion_matrices.append(confusion_matrix(y_test[y_type],pred))
        accuracy.append(accuracy_score(y_test[y_type],pred))
    return accuracy, confusion_matrices
```


```python
def predictingModel2(model):
    '''Computes accuracy and confusion matrices for models with normalised features.'''
    accuracy = []
    confusion_matrices = []
    for y_type in y_train:
        model.fit(norm_train, (y_train[y_type]))
        pred = model.predict(norm_test)
        confusion_matrices.append(confusion_matrix(y_test[y_type],pred))
        accuracy.append(accuracy_score(y_test[y_type],pred))
    return accuracy, confusion_matrices
```

#### Logistic Regression


```python
from sklearn.linear_model import LogisticRegression

# Logistic regression object.
Logistic_reg = LogisticRegression(random_state=15)
LG_A, LG_C = predictingModel(Logistic_reg)
```

#### Naive Bayes


```python
from sklearn.naive_bayes import GaussianNB

# Creates Naive Bayes object.
naive_bayes = GaussianNB()
# Making our final predictions on test set.
NB_A, NB_C = predictingModel2(naive_bayes)
```
