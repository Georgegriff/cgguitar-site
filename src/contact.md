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
hero:
  title: I'd love to hear from you, please get in touch
  subtitle: Contact me using the options below.
  image:
    src: images/hero.jpg
    alt: "CG Guitars' Charlie playing guitar on stage"
gridContent:
  class: "grid-small contained"
  items:
    - text: <a href="#main-content">Fill out the contact form below</a>
      image: img/edit.svg
    - text: <a href="tel:+447861538564"aria-label="or call telephone number, PHONE_PLACEHOLDER"><b>or</b> call +447861538564</a>
      image: img/phone.svg
    - text: <a target="_top" href="mailto:EMAIL_PLACEHOLDER"><b>or</b> email EMAIL_PLACEHOLDER</a>
      image: img/email.svg
footer:
  callToAction: false
---
{% set GRID_TEXT_PLACEHOLDER = {"PHONE_PLACEHOLDER": metadata.author.phone | ariatel, "EMAIL_PLACEHOLDER": metadata.author.email } %}
{%- include 'partials/grid-content.html' -%}
<div class="contained secondary-article">
{%- include 'partials/form.njk' -%}
</div>
