---
templateEngineOverride: njk,md
layout: layouts/index.njk
pageCriticalStyles:
  - css/media.css
headerClassName: header-hero-small
components:
  - type: card
    name: who-is-cg-guitar
  - type: quote
    name: quote-about
  - type: card
    name: a-little-bit-more
  - type: playlist
    name: musical-works
  - type: playlist
    name: vlogs
  - type: quote
    name: about-session-work-quote
  - type: card
    name: about-band-and-session
  - type: quote
    name: Professionalism-Quote-William-Kitchener
  - type: playlist
    name: session-work-playlist
  - type: playlist
    name: Interviews
pageJs: media.js
title: About
eleventyNavigation:
  key: About
  order: 5
hero:
  title: A little about CG Guitar
  subtitle: Continue reading if you'd like to know more
  image:
    src: images/hero.jpg
    alt: CG Guitars' Charlie playing guitar on stage
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
---

<article class="about-section no-padding">
{%- include 'partials/components.njk' -%}
</article>



