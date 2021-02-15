---
templateEngineOverride: md,njk
layout: layouts/index.njk
pageCriticalStyles:
  - css/media.css
headerClassName: header-hero-medium
components:
  - type: gridCard
    name: videos-icons
  - type: playlist
    name: guitar-lessons
  - type: playlist
    name: beginner-guitar-lessons
  - type: playlist
    name: griffs-licks
pageJs: media.js
title: Videos
eleventyNavigation:
  key: Videos
  order: 4
hero:
  title: Check out my latest videos
  description: Find demonstrations, tutorials and other educational content.
  subtitle: Enjoy and please share!
  image:
    src: images/hero.jpg
    alt: CG Guitars' Charlie playing guitar on stage
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
---

{%- set GRID_TEXT_PLACEHOLDER = {"YT_PLACEHOLDER": metadata.author.youtube, "INSTA_PLACEHOLDER": metadata.author.instagram} -%}
{%- include 'partials/components.njk' -%}