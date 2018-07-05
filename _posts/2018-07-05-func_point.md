---
title: Introduction to Function Pointers
date:   2018-07-05 8:00:00
layout: post
tag:
- Computer Science
category: blog
author: chrishyland
description: "It's not polite to point."
---

## Introduction
> Function pointers are literally pointers to functions.

Function pointers are just what their name suggests, they are pointers to functions! In particular, a function pointer points to code (rather than data like what we are normally used to) and stores the start of executable code. Let’s just get straight to some code.

```C
void print_stuff(int a)
{
  printf("Hi there, I am %d\n", a);
}

int main()
{
  // Pointer is void type and points to print_stuff function.
  // (int) lets us know what TYPE are the arguments for the function.
  void (*func_ptr)(int) = &print_stuff;
  
  // To call the function, we go:
  (*func_ptr)(20);
  // Here, we dereferenced the pointer and also passed in inputs for it.
  // Note this also works even if we removed the *
}
```
>Hi there, I am 20

Note that when we declared our function pointer, it is extremely important that we have those brackets around \*func_ptr or else it will be confused for a declaration of a function that returns void pointers. 

A clearer illustration of when we would use a function pointer would be when we don’t know what the functions are at compile time.

```C
#include <stdio.h>

// Here we declare a function.
void do_stuff(int x);

int main()
{
    void (*func_ptr)(int) = &do_stuff;
    (*func_ptr)(4);
}

void do_stuff(int x)
{
  printf("Done stuff with %d\n",x);
}
```

> Done stuff with 4

So why else might we be bothered with function pointers?
* Efficiency
* Elegance
* Runtime binding whereby we can change the function up depending on what we feed the function at runtime

Note that with these pointers, we do not need to de-allocate memory as we are not pointing to memory.

---

Here's another example just to drill this home:
```C
// Our function
int add_numbers(int x, int y)
{
  return x + y;
}

// Our FUNCTION POINTER:
int (*func_ptr)(int, int);

// Again, this points to a function that returns an int and takes in 2 ints as arguments.

// Now to point it to a function:
func_ptr = &add_numbers;

// To actually use this function pointer:
int sum = (*func_ptr)(5, 10);

// Here, we dereference our function pointer and pass in our arguments for the function.

// Altenrative
int sum = func_ptr(5, 10);
```

## Summary
Function pointers are just an address referring to an area of memory with executable code.