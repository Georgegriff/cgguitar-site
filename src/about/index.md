---
title: 'About'
layout: 'layouts/index.njk'
templateEngineOverride: njk,md
pageCriticalStyles: ['css/media.css']
eleventyNavigation:
  key: About
  order: 5
pageJs: 'media.js'
headerClassName: 'header-hero-small'
hero:
  title: A little about CG Guitar
  subtitle: Continue reading if you'd like to know more
  image:
    src: images/hero.jpg
    alt: "CG Guitars' Charlie playing guitar on stage"
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
components:
  - type: card
    name: who-is-cg-guitar
  - type: card
    name: quote-about
  - type: card
    name: a-little-bit-more
  - type: card
    name: home-about-card
aboutSection:
  items:
    - type: playlist
      title: Musical Works
      id: 'PLA0cAQ-2uoepYOLbiHYk4spJB6ugE7_v8'
    - type: card
      direction: 'reverse'
      title: 'Band & Session Work'
      image:
        src: '/images/session.jpg'
        alt: 'Charlie on stage with his function band'
      content:
        - I’m available to hire for Session Work.
        - If you’re looking for a band for your event or function please feel free to get in touch.
    - type: quote
      content: Along with the band side of guitar playing I have been hired to play in theatrical productions such as The Wedding Singer, Grease & Rock The Ages, to name a few, and to perform guitar parts on other artist/band’s records and during live performances.
    - type: playlist
      title: Session work and function band
      id: 'PLA0cAQ-2uoerotCQc5YBpI2cC-MemAWt7'
---

<article class="about-section no-padding">
{%- include 'partials/components.njk' -%}
</article>



