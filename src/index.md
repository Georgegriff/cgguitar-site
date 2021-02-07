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
levels:
  title: CG Guitar can help, no matter your skill level
  description: Whether you're looking to start guitar lessons for the first time or you need help and advice on how to develop your playing.<br/> CG Guitar is the right place for you! 1:1, group classes and workshops available.
  items:
   - title: Beginner
     text: Play music from the first lesson! Kick start your guitar playing with enjoyable and frustration free methods.
     image: /images/testimonials/annep.jpg
     quote: Charlie’s energy and enthusiasm are infectious, and I have been so impressed by my son’s progress.
   - title: Intermediate
     text: Effective practice regimes, coaching to build a solid foundation of technique and repertoire, ways to improve your improvisation and composition skills.
     image: /images/testimonials/sepett.jpg
     quote: Charlie has been teaching my son for about 5 years, taking him from complete novice through to playing some pretty impressive rock songs.
   - title: Advanced
     text: Appropriate coaching and mentoring to study music/guitar in further education, to prepare for live performances and advice on ways to take your playing to the next level.
     image: /images/testimonials/johno.jpg
     quote: Charlie has tailored the lessons to cover advanced topics such as, playing with odd time signatures, music theory and improvisation skills.
gridContent:
  class: 'video-grid secondary-bg dark-grid'
  title: Start learning today
  items:
    - text: My students have found success in both online and in person lessons.
      image: img/student.svg
    - text: Tailored individual lessons for every students needs.
      image: img/note.svg
    - text: I provide extra value though free online demonstrations and tutorials.
      image: img/video.svg
    - text: Many of my students have provided testimonials.
      image: img/person.svg
  video:
    id: BWN45DJCCoQ
    channel: UCReQS8UwfrhDRGTowiXqVKg
aboutSection:
  items:
    - type: card
      title: Who is CG Guitar?
      link:
        url: '/about/#a-little-bit-more'
        text: Learn more
      image:
        src: '/images/about-alt.jpg'
        alt: 'Charlie on stage with his band Harbinger'
      content:
        - CG Guitar is the creation of guitarist Charlie Griffiths.
        - Playing guitar at the age of 13, since then he has performed in a number of bands that have required him to play a variety of genres.
        - Playing in a breadth of genres, brings tons of experience, knowledge and advice to share.

---

{% include 'partials/logos-section.html' %}
{% include 'partials/grid-content.html' %}
{% include 'partials/testimonial-levels.html' %}
{% include 'partials/about-article.njk' %}


