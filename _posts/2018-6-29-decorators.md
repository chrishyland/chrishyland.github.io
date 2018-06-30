---
title: Introduction to Bash Scripting
date:   2018-06-29 10:00:00
layout: post
tag:
- Computer Science
category: blog
author: chrishyland
description: Crash course on Decorators.
---

# Decorators

Decorators are a good introduction to metaprogramming. What this means is that a part of the program tries to modify another part of the program at compile time.

Let's say we had the following function. 
```python
def chosen_pokemon():
  return "Pikachu!"
```

 A decorator will take this function and add some extra code to this function. An example of a decorator for our above function would be:

```python
 def wrap_poke(pokemon):
  def choose_pokemon():
    return "I choose you {}".format(str(pokemon))
  return choose_pokemon
```

Notice that the wrap\_gen function returns the inner function choose_pokemon without the (). This means that we aren't actually executing that function but merely returning the state (kinda like generators but not quite).

So now we can combine our decorator with our first function like so:

```python
  def wrap_poke(pokemon):
  """
  Note that argument is a function.
  """
  def choose_pokemon():
    return "I choose you {}".format(str(pokemon))
  return choose_pokemon
  
def chosen_pokemon():
  return "Pikachu!"
  
# Note that we didn't execute chose_pokemon since no ()
our_function = wrap_poke(chosen_pokemon)

# To call our wrap_poke function:
our_function()
```
> I choose you Pikachu!

The alternative and more common styling of the above is to just the @ symbol like below.

```python
def wrap_poke(pokemon):
  def choose_pokemon():
    return "I choose you {}".format(str(pokemon))
  return choose_pokemon
  
@wrap_poke
def chosen_pokemon():
  return "Pikachu!"
  
# Executing function.
print(chosen_pokemon())
```

> I choose you Pikachu!

With this wrapping functionality, this allow for flexibility now as we can define new functions and simply wrap them up with our decorators like so:

```python
@wrap_poke
def chosen_pokemon_two():
  return "Squirtle!"

# Execute function.
print(chosen_pokemon_two())
```
> I choose you Squirtle!

So this works for other functions! 

---

## So what is actually happening here?
Decorators are a way for us to call **higher-order functions**, which are basically functions that either take a function in as an argument or returns a function as a result. Hence, decorators are a way for us to take a function and extend its behaviour without modifying the source code directly. 

## Where to from here?
Decorators are used for code that you want to "wrap" with additional functionality. Numerous cases and examples can be found in Django, synchronization, telling the time, and more!

