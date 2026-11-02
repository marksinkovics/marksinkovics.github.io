---
title: Projects
icon: fas fa-folder-open
order: 1
---

{% assign projects = site.projects | where: "type", "main" | sort: "order" -%}
{% for project in projects -%}
- [{{ project.title }}]({{ project.url | relative_url }}){% if project.subtitle %}: {{ project.subtitle }}{% endif %}
{% endfor %}
