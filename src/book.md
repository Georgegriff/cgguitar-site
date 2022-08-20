---
title: Book a lesson
layout: layouts/index.njk
headerClassName: header-hero-small
eleventyNavigation:
  key: Book a lesson
  order: 6
hero:
  title: Book a lesson today!
  subtitle: Check my availability on the sign up form.
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
  heroLink:
    description: Already a member?
    text: Log in here
    href: /login/
components:
  - type: card
    name: sign-up
---

<article class="about-section no-padding book-page">
{%- include 'partials/components.njk' -%}
</article>