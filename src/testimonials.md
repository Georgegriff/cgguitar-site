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
components:
   - type: gridCard
     name: testimonials-icons
   - type: custom
     name: testimonials
     componentPath: 'partials/testimonials.njk'
---

{%- include 'partials/components.njk' -%}



