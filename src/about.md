---
title: 'About'
layout: 'layouts/index.njk'
templateEngineOverride: md,njk
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
gridContent:
  class: "grid-small contained"
  items:
    - text: <a href="#main-content">Watch some of my videos below</a>
      image: img/video.svg
    - text: <a target="_blank" href="YT_PLACEHOLDER">Subscribe to my YouTube channel</a>
      image: img/youtube.svg
    - text: <a target="_blank" href="INSTA_PLACEHOLDER">Follow me on Instagram</a>
      image: img/instagram.svg
logosSection:
  items:
    - text: CG Guitar is the creation of guitarist Charlie Griffiths.
    - text: Playing guitar at the age of 13, he has performed in a number of bands that have allowed him to play a variety of genres.
    - text: His Music Performance degree and playing in a breadth of genres brings tons of experience, knowledge and advice to share.

aboutSection:
  items:
    - type: card
      title: Who is CG Guitar?
      image:
        src: '/images/about-alt.jpg'
        alt: 'Charlie on stage with his band Harbinger'
      content:
        - CG Guitar is the creation of guitarist Charlie Griffiths. 
        - Playing guitar at the age of 13, since then he has performed in a number of bands that have required him to play a variety of genres.
        - Playing in a breadth of genres, brings tons of experience, knowledge and advice to share.
    - type: card
      direction: 'reverse'
      title: A little bit more
      image:
        src: '/images/harbinger.jpg'
        alt: 'Charlie on stage with his band Harbinger'
      content:
        - Charlie graduated from The Academy of Contemporary Music as a Bachelor of Music with a First Class Honours in Professional Music Performance in 2013.
        - During his degree in 2012 he started teaching at Goodall Guitar School in which has now led him on to running his own teaching business, CG Guitar.
        - As well as running CG Guitar he is an active member of the band Harbinger.
    - type: quote
      content: I enjoy writing and performing a variety of styles. I am currently an active member of signed UK Metal group Harbinger that I have toured extensively with plus function band No More Ashes that regularly gets hired for weddings, parties and various other functions.
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

{% include 'partials/about-article.njk' %}


