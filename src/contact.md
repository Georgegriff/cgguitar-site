---
templateEngineOverride: njk,md
layout: layouts/index.njk
pageCriticalStyles:
  - css/contact.css
headerClassName: header-hero-medium
components:
  - type: gridCard
    name: contact-icons
pageJs: contact.js
title: Contact
eleventyNavigation:
  key: Contact
  order: 2
hero:
  title: I'd love to hear from you, please get in touch
  subtitle: Contact me using the options below.
  image:
    src: images/hero.jpg
    alt: CG Guitars' Charlie playing guitar on stage
footerSettings:
  callToAction: false
---
{% set GRID_TEXT_PLACEHOLDER = {"PHONE_PLACEHOLDER": metadata.author.phone | ariatel, "EMAIL_PLACEHOLDER": metadata.author.email } %}
{%- include 'partials/components.njk' -%}
<div class="contained secondary-article">
{%- include 'partials/form.njk' -%}
</div>
