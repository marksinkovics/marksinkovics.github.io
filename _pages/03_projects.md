---
layout: page
title: Projects
permalink: /projects/
---

{% for project in site.projects %}
  <ul>
  {% if project.type == "main" %}
      <li><a href="{{ project.url }}">{{ project.title }}</a>
      {% if project.subtitle %}
          <span> - {{ project.subtitle }}</span>
      {% endif %}
      </li>
  {% endif %}
  </ul>
{% endfor %}
