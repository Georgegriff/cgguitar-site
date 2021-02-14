---
title: 'Guitar Tuition'
layout: 'layouts/index.njk'
templateEngineOverride: md,njk
eleventyNavigation:
  key: Lessons
  order: 1
pagination:
  data: mypages
  alias: myurl
  size: 1
mypages:
  - lessons
  - ./
permalink: '{{ myurl }}/index.html'
hero:
  title: Kickstart your guitar lessons today
  subtitle: "Available Monday to Friday"
  description: "Lessons held on Zoom, for the foreseeable."
  image:
    src: images/hero.jpg
    alt: "CG Guitars' Charlie playing guitar on stage"
  callToAction:
    - type: primary
      text: Get in touch
      link: /contact/
    - type: secondary
      text: Learn more
      link: "#main-content"
logosSection:
  class: 'padded'
  items:
    - title: Enjoy
      text: Play music from the first lesson! Kick start your guitar playing with enjoyable and frustration free methods.
    - title: Learn
      text: Coaching and mentoring to study music or guitar in further education, prepare for live performances and advice taking  your playing to the next level.
    - title: Achieve
      text: Effective practice regimes, build a solid foundation of technique and repertoire, with ways to improve your improvisation and composition skills.
    - title: Perform
      text: Whether you’re looking to start guitar lessons for the first time or you need help on how to develop your playing, CG Guitar is the right place for you.
gridContent:
  class: 'video-grid secondary-bg dark-grid'
  title: Start learning today
  items:
    - text: My students have found success in both online and in person lessons.
      image: images/student.svg
    - text: Tailored individual lessons for every students needs.
      image: images/note.svg
    - text: I provide extra value though free online demonstrations and tutorials.
      image: images/video.svg
    - text: Many of my students have provided testimonials.
      image: images/person.svg
  video:
    id: BWN45DJCCoQ
    channel: UCReQS8UwfrhDRGTowiXqVKg
aboutSection:
  items:
    - type: card
      title: Who is CG Guitar?
      link:
        url: '/about/#quote-about'
        text: Learn more
      image:
        src: '/images/about-alt.jpg'
        alt: 'Charlie on stage with his band Harbinger'
      content:
        - CG Guitar is the creation of guitarist Charlie Griffiths.
        - Playing guitar at the age of 13, since then he has performed in a number of bands that have required him to play a variety of genres.
        - Playing in a breadth of genres, brings tons of experience, knowledge and advice to share.
components:
  - type: card
    name: home-about-card
---

{% include 'partials/logos-section.html' %}
{% include 'partials/grid-content.html' %}
{% include 'partials/testimonial-levels.html' %}
{%- include 'partials/components.njk' -%}



