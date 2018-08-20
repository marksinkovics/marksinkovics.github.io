---
layout: page
title: Projects
permalink: /projects/
---

{% for project in site.projects %}
  <ul>
    <li><a href="{{ project.url }}">{{ project.title }}</a>
    {% if project.subtitle %}
        <span> - {{ project.subtitle }}</span>
    {% endif %}
    </li>
  </ul>
{% endfor %}
