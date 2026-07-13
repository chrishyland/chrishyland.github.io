---
title: "Resources"
description: "Lecture notes and study resources by C. Chris Hyland: graduate microeconomics, macroeconomics, and econometrics notes from the University of Oxford."
layout: single
permalink: /resources/
author_profile: true
---

<!-- Resources live in _data/resources.yml — edit that file to add or update items. -->

{% for group in site.data.resources %}
## {{ group.section }}

<ul class="resources">
  {% for item in group.items %}
  <li class="resource">
    <a href="{{ item.file | relative_url }}">{{ item.title }}</a>
    <span class="paper__badge">PDF</span>
    {% if item.note %}<span class="resource__note">{{ item.note }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>
{% endfor %}
