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
  description: 'Find various demonstrations, tutorials and other educational content.'
  image:
    src: images/hero.jpg
    alt: "CG Guitars' Charlie playing guitar on stage"
videos:
  playlists:
    - id: "PLA0cAQ-2uoeo4d-k69kkTkekL300dFIwl"
      title: Guitar Lessons
      description: "Free HD Guitar Lessons by Charlie Griffiths (CG Guitar) enjoy and please share!"
---

{% include "partials/video-playlists.njk" %}
