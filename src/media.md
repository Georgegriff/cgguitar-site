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
  subtitle: 'Find demonstrations, tutorials and other educational content.'
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
      description: "Free HD Guitar Lessons by Charlie Griffiths (CG Guitar) enjoy and please share!"
    - id: "PLA0cAQ-2uoeoJoFfUz9oq9qhmlnsjFRhU"
      title: Beginner guitar lessons
    - id: "PLA0cAQ-2uoeq_t6PXUWYWD1QhEUY_kMIU"
      title: Griff's Licks
---

{% include "partials/video-playlists.njk" %}
