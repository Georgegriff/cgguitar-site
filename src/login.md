---
title: 'Member Log in'
layout: 'layouts/plain.njk'
headerClassName: 'none'
eleventyNavigation:
  key: Members
  order: 5
---
{% set image = hero.image or {src: "images/hero.jpg", "alt": "CG Guitars' Charlie playing guitar on stage"} %}
<div class="login-wrapper">
    <div class="login-widget">
    <div class="login-container">
        <div class="tz-form-login-admin" rel="587340" id="tz-widget-form"></div>
         <p style="margin:auto; width: 555px;" class="site-padded">Not a member yet? <a class="dark-link" aria-label="Not a member yet?" href="/#sign-up">Sign up today!</a></p>
    </div>
    {%- Image image.src, image.alt -%}
</div>
<script type="text/javascript" src="https://app.teacherzone.com/Assets/widget/tz-form-login.js"></script>