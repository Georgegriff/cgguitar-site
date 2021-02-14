---
title: 'Testimonials'
layout: 'layouts/index.njk'
templateEngineOverride: njk,md
eleventyNavigation:
  key: Testimonials
  order: 3
headerClassName: 'header-hero-medium sheets'
hero:
  title: See what my students have to say
  description: "Lessons held on Zoom, for the foreseeable."
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
  image:
    src: images/sheets.png
    alt: "Examples of Sheet music sprovided to students"
gridContent:
  items:
    - text: My students have found success in both online and in person lessons.
      image: images/student.svg
    - text: Tailored individual lessons for every students needs.
      image: images/note.svg
    - text: I provide extra value though free online demonstrations and tutorials.
      image: images/video.svg
    - text: Many of my students have provided testimonials.
      image: images/person.svg
---

{% include 'partials/grid-content.html' %}
{% include 'partials/testimonials.njk' %}



