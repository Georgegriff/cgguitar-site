---
templateEngineOverride: md,njk
layout: layouts/index.njk
headerClassName: header-hero-full
components:
  - type: card
    name: home-page-video-and-info
  - type: slogan
    name: slogan
  - type: card
    name: more-info
  - type: gridCard
    name: icon-info-card
  - type: levels
    name: levels
  - type: card
    name: home-about-card
title: Guitar tuition
eleventyNavigation:
  key: Lessons
  order: 1
permalink: "{{ myurl }}/index.html"
mypages:
  - lessons
  - ./
pagination:
  data: mypages
  alias: myurl
  size: 1
hero:
  title: Kick-Start Your Guitar Lessons Today
  subtitle: Available Monday to Friday
  description: Lessons held on online, for the foreseeable.
  image:
    src: images/hero.jpg
    alt: CG Guitars' Charlie Griffiths playing guitar on stage
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
    - type: secondary
      text: Learn more
      link: "#main-content"
---

{%- include 'partials/components.njk' -%}



