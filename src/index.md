---
templateEngineOverride: md,njk
layout: layouts/index.njk
permalink: "{{ myurl }}/index.html"
components:
  - type: slogan
    name: slogan
  - type: gridCard
    name: home-page-video-card
  - type: card
    name: cg-guitar-can-help
  - type: levels
    name: levels
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



