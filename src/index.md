---
templateEngineOverride: md,njk
layout: layouts/index.njk
permalink: "{{ myurl }}/index.html"
gridContent:
  class: video-grid secondary-bg dark-grid
  title: Start learning today
  items:
    - text: My students have found success in both online and in person lessons.
      image: images/student.svg
    - text: Tailored individual lessons for every students needs.
      image: images/note.svg
    - text: I provide extra value though free online demonstrations and tutorials.
      image: images/video.svg
    - text: Many of my students have provided testimonials.
      image: images/person.svg
  video:
    id: BWN45DJCCoQ
    channel: UCReQS8UwfrhDRGTowiXqVKg
components:
  - type: slogan
    name: slogan
  - type: card
    name: cg-guitar-can-help
  - type: levels
    name: 'levels'
  - type: card
    name: home-about-card
mypages:
  - lessons
  - ./
title: Guitar Tuition
eleventyNavigation:
  key: Lessons
  order: 1
pagination:
  data: mypages
  alias: myurl
  size: 1
hero:
  title: Kickstart your guitar lessons today
  subtitle: Available Monday to Friday
  description: Lessons held on Zoom, for the foreseeable.
  image:
    src: images/hero.jpg
    alt: CG Guitars' Charlie playing guitar on stage
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
    - type: secondary
      text: Learn more
      link: "#main-content"
---

{%- include 'partials/components.njk' -%}
{% include 'partials/grid-content.html' %}



