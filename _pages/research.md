---
title: "Research"
layout: single
permalink: /research/
author_profile: true
---

<!-- Papers live in _data/papers.yml — edit that file to add or update papers. -->

## Working Papers

{% for paper in site.data.papers.working_papers %}
{% include paper.html paper=paper %}
{% endfor %}

## Publications

{% for paper in site.data.papers.publications %}
{% include paper.html paper=paper %}
{% endfor %}

## Work in Progress

{% for paper in site.data.papers.work_in_progress %}
{% include paper.html paper=paper %}
{% endfor %}
