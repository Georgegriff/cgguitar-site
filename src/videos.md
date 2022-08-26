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
    name: student-performance-night-2018
  - type: playlist
    name: student-performance-2019
  - type: playlist
    name: griffs-licks
  - type: playlist
    name: guitar-demonstrations
  - type: playlist
    name: Interviews
  - type: playlist
    name: musical-works
  - type: playlist
    name: rock-school-debut
  - type: playlist
    name: rock-school-grade-1
  - type: playlist
    name: rock-school-acoustic-grade-1
  - type: playlist
    name: rock-school-grade-2
  - type: playlist
    name: rock-school-grade-3
  - type: playlist
    name: rock-school-grade-6
  - type: playlist
    name: rock-school-grade-8
  - type: playlist
    name: student-spotlight
pageJs: media.js
title: Videos
eleventyNavigation:
  key: Videos
  order: 4
hero:
  title: Check out my latest videos
  description: Find demonstrations, tutorials and other musical content.
  subtitle: Enjoy and please share!
  image:
    src: images/hero.jpg
    alt: CG Guitars' Charlie playing guitar on stage
  callToAction:
    - type: primary
      text: Book a lesson
      link: /book/#sign-up
    - type: secondary
      text: Get in touch
      link: /contact/
---

{%- set GRID_TEXT_PLACEHOLDER = {"YT_PLACEHOLDER": metadata.author.youtube, "INSTA_PLACEHOLDER": metadata.author.instagram, "FB_PLACEHOLDER": metadata.author.facebook} -%}
{%- include 'partials/components.njk' -%}