---
title: "5-star rated guitar tuition"
layout: "layouts/index.njk"
templateEngineOverride: njk,md
pageCriticalStyles:
  - /css/media.scss
pageJs: /scripts/media.js
eleventyNavigation:
  key: Testimonials
  order: 3
headerClassName: "header-hero-small"
hero:
  title: HD Online Guitar Lessons
  subtitle: "Like you've never experienced before!"
  description: "See what my students have to say"
  callToAction:
    - type: primary
      text: Book a lesson
      link: /book/#sign-up
    - type: secondary
      text: Get in touch
      link: /contact/
  image:
    src: images/sheets.png
    alt: "Examples of Sheet music sprovided to students"
components:
  - type: gridCard
    name: testimonials-icons
  - type: custom
    name: testimonials
    componentPath: "partials/testimonials.njk"
  - type: playlist
    name: student-performance-2019
  - type: playlist
    name: student-performance-night-2018
  - type: playlist
    name: student-spotlight
---

{%- include 'partials/components.njk' -%}
