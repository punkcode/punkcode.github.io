---
title: DIY Guides
eleventyNavigation:
  key: Guides
  title: DIY Guides
  excerpt: A series of short videos/articles with practical tips for ethical and sustainable web development.
  order: 1
pagination:
  data: collections.guides
  size: 7
  alias: guides
---
Short videos with practical tips for ethical and sustainable web development. Creating a better product, happier people, and peace on Earth. Why isn't this working?

<section>
  {% for guide in guides %}
  - [{{ guide.data.title }}]({{ guide.url }})
  {% endfor %}

  {% if pagination.href.previous %}
  <a href="{{ pagination.href.previous }}">Previous Page</a>
  {% endif %}
  {% if pagination.href.next %}
  <a href="{{ pagination.href.next }}">Next Page</a>
  {% endif %}
</section>