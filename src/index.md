---
templateEngineOverride: md,njk
layout: layouts/index.njk
permalink: "{{ myurl }}/index.html"
headerClassName: header-hero-full
components:
  - type: card
    name: home-page-video-and-info
  - type: slogan
    name: slogan
  - type: card
    name: sign-up
  - type: card
    name: icons-grid
  - type: levels
    name: levels
  - type: card
    name: home-about-card
pageJs: /scripts/index.js
mypages:
  - lessons
  - ./
title: Guitar tuition
eleventyNavigation:
  key: Lessons
  order: 1
pagination:
  data: mypages
  alias: myurl
  size: 1
hero:
  title: Kick-Start Your Guitar Lessons Today
  subtitle: Available Monday to Friday
  description: Online Lessons For Rock & Metal Guitarists
  heroLink:
    description: Already a member?
    text: Log in here.
    href: /login/
  image:
    src: images/harbinger-birmingham-36.jpg
    alt: CG Guitars' Charlie Griffiths playing guitar on stage
  callToAction:
    - type: primary
      text: Book a lesson
      link: "#sign-up"
    - type: secondary
      text: Learn more
      link: "#main-content"
---

{%- include 'partials/components.njk' -%}
