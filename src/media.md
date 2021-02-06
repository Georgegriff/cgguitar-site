---
title: 'Media'
layout: 'layouts/index.njk'
templateEngineOverride: md,njk
pageCriticalStyles: ['css/media.css']
eleventyNavigation:
  key: Media
  order: 4
pageJs: 'media.js'
headerClassName: 'header-hero-medium'
hero:
  title: Check out my latest videos
  description: 'Find demonstrations, tutorials and other educational content.'
  subtitle: 'Enjoy and please share!'
  image:
    src: images/hero.jpg
    alt: "CG Guitars' Charlie playing guitar on stage"
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
videos:
  playlists:
    - id: "PLA0cAQ-2uoeo4d-k69kkTkekL300dFIwl"
      title: Guitar lessons
      description: "Free HD Guitar Lessons by Charlie Griffiths (CG Guitar)"
    - id: "PLA0cAQ-2uoeoJoFfUz9oq9qhmlnsjFRhU"
      title: Beginner guitar lessons
    - id: "PLA0cAQ-2uoeq_t6PXUWYWD1QhEUY_kMIU"
      title: Griff's Licks
gridContent:
  class: "grid-small contained"
  items:
    - text: <a href="#main-content">Watch some of my videos below</a>
      image: img/video.svg
    - text: <a target="_blank" href="YT_PLACEHOLDER">Subscribe to my YouTube channel</a>
      image: img/youtube.svg
    - text: <a target="_blank" href="INSTA_PLACEHOLDER">Follow me on Instagram</a>
      image: img/instagram.svg
---

{% set GRID_TEXT_PLACEHOLDER = {"YT_PLACEHOLDER": metadata.author.youtube, "INSTA_PLACEHOLDER": metadata.author.instagram } %}
{%- include 'partials/grid-content.html' -%}
{% include "partials/video-playlists.njk" %}
