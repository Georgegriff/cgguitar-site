---
title: '5-star rated guitar tuition'
layout: 'layouts/index.njk'
templateEngineOverride: njk,md
pageCriticalStyles:
  - css/media.css
pageJs: media.js
eleventyNavigation:
  key: Testimonials
  order: 3
headerClassName: 'header-hero-medium sheets'
hero:
  title: See what my students have to say
  description: "Lessons held on Zoom, for the foreseeable."
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
     componentPath: 'partials/testimonials.njk'
   - type: playlist
     name: student-performance-2019
   - type: playlist
     name: student-performance-night-2018
   - type: playlist
     name: student-spotlight
---

{%- include 'partials/components.njk' -%}



