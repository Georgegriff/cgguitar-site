---
title: 'Member login'
layout: 'layouts/plain.njk'
headerClassName: 'none'
---
{% set image = hero.image or {src: "images/hero.jpg", "alt": "CG Guitars' Charlie playing guitar on stage"} %}
<div class="login-wrapper">
    <div class="login-widget">
    <div class="login-container">
        <div class="tz-form-login-admin" rel="587340" id="tz-widget-form"></div>
    </div>
    <script type="text/javascript" src="https://app.teacherzone.com/Assets/widget/tz-form-login.js"></script>
        {%- Image image.src, image.alt -%}
    </div>
</div>