---
templateEngineOverride: njk,md
layout: layouts/index.njk
pageCriticalStyles:
  - /css/contact.scss
headerClassName: header-hero-small
components:
  - type: gridCard
    name: contact-icons
pageJs: /scripts/contact.js
title: Contact
eleventyNavigation:
  key: Contact
  order: 2
hero:
  callToAction:
    - type: primary
      text: Book a lesson
      link: /book/#sign-up
  title: I'd love to hear from you, please get in touch!
  description: or, contact me using the options below.
footerSettings:
  callToAction: false
---

{% set GRID_TEXT_PLACEHOLDER = {"EMAIL_PLACEHOLDER": metadata.author.email } %}
{%- include 'partials/components.njk' -%}

<div class="contained secondary-article">
{%- include 'partials/form.njk' -%}
</div>
