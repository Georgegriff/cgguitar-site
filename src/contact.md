---
title: 'Contact'
layout: 'layouts/index.njk'
templateEngineOverride: njk,md
eleventyNavigation:
  key: Contact
  order: 3
headerClassName: 'header-hero-medium'
pageJs: 'contact.js'
pageCriticalStyles: ['css/contact.css']
mainClass: 'contained'
hero:
  title: I'd love to hear from you, please get in touch
  description: Contact me using the options below.
  image:
    src: images/hero.jpg
    alt: "CG Guitars' Charlie playing guitar on stage"
gridContent:
  class: "grid-small"
  items:
    - text: Fill out the contact form below
      image: img/edit.svg
    - text: <span class="visually-hidden" aria-label="or call telephone number, PHONE_PLACEHOLDER"></span><span aria-hidden="true"><b>or</b> call +447861538564</span>
      image: img/phone.svg
    - text: <a target="_top" href="mailto:EMAIL_PLACEHOLDER"><b>or</b> email EMAIL_PLACEHOLDER</a>
      image: img/email.svg
footer:
  callToAction: false
---
{% set GRID_TEXT_PLACEHOLDER = {"PHONE_PLACEHOLDER": metadata.author.phone | ariatel, "EMAIL_PLACEHOLDER": metadata.author.email } %}
{%- include 'partials/grid-content.html' -%}
{%- include 'partials/form.njk' -%}
