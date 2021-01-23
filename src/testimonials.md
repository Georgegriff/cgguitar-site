---
title: 'Testimonials'
layout: 'layouts/index.njk'
templateEngineOverride: njk,md
eleventyNavigation:
  key: Testimonials
  order: 3
headerClassName: 'header-hero-medium'
hero:
  title: See what my students have to say
  description: "Lessons held on Zoom, for the foreseeable."
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
  image:
    src: /images/sheets.png
    alt: "Examples of Sheet music provided to students"
gridContent:
  items:
    - text: My students have found success in both online and in person lessons.
      image: img/student.svg
    - text: Tailored individual lessons for every students needs.
      image: img/note.svg
    - text: I provide extra value though free online demonstrations and tutorials.
      image: img/video.svg
    - text: Many of my students have provided testimonials.
      image: img/person.svg
---

{% include 'partials/grid-content.html' %}


