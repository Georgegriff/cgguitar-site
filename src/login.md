---
title: "Member Log in"
layout: "layouts/plain.njk"
headerClassName: "none"
preload:
  - as: "style"
    href: "https://app.teacherzone.com/Assets/widget/tz-form-login.css"
  - as: "script"
    href: "https://app.teacherzone.com/Assets/widget/tz-form-login.js"
eleventyNavigation:
  key: Members
  order: 5
---

{% set image = hero.image or metadata.defaultHero %}

<h1 class="visually-hidden">Members</h1>
<h2 class="visually-hidden">Sign in or register below</h2>
<div class="login-wrapper relative">
    <div class="login-widget">
    <div class="login-container">
        <div class="tz-form-login-admin" rel="587340" id="tz-widget-form"></div>
         <p style="margin:auto; max-width: 555px; padding:1rem 0;" class="site-padded">Not a member yet? <a class="dark-link" aria-label="Not a member yet?" href="/#sign-up">Sign up today!</a></p>
    </div>
    {%- Image image.src, image.alt -%}
</div>
<script type="text/javascript" src="https://app.teacherzone.com/Assets/widget/tz-form-login.js"></script>
