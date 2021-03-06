---
title:  "A simple explanation of Docker and Kubernetes"
date:   2019-07-10 09:00:00
layout: post
image: /assets/images/markdown.jpg
headerImage: False
tag:
- Computer Science
category: blog
author: chrishyland
description: A basic explanation of Docker and Kubernetes
---
## Introduction

This is a high level explanation of the difference between Kubernetes and Docker containers and what is their relationship. 

---
So first you have a container, which is just a way to package software and ensure your application's code/libraries/dependencies  will always work no matter what environment/operating system you are on. You can think of it like a virtual machine except alot more lightweight and not having the additional overhead of an operating system. Docker is the most popular library for creating these containers.

The next level of abstraction is microservices, where you have many different apps each doing its own thing. The reason we would want to use such a set up is that if we want to make a change to a particular application, we can simply alter that application and make sure it doesn't affect other application. It is industry standard nowadays to use microservices.

So now if you create a docker container for each of your applications but try to have a microservice architecture, you have an issue now since you have many different containers and you have an issue of how do we coordinate between these applications in different containers.

Kubernetes comes in here and "orchestrates" (fancy way of saying manages) all the containers to work together in sync. Docker also has its own container management tool called Docker Swarm but Kubernetes is just more popular. Examples of things Kubernetes does is
- It ensures the containers talk to each other 

- If a container fails, Kubernetes will distribute the work to other containers or alert other containers that a container is down

- Kubernetes can add/remove containers depending on demand helping to ensure you have just enough processing power 

- Ensure consistency of storage across containers 

- Acts as a load balancer by figuring which container to distribute work to

and many more things!

---

tl;dr, Kubernetes just helps to coordinate your system for when you have multiple docker containers that need to interact with each other and scale up/down your system by adding/removing containers as your demand changes.
