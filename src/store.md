---
title: 'Store'
templateEngineOverride: md,njk
layout: 'layouts/plain.njk'
headerClassName: 'none'
eleventyNavigation:
  key: Store
  order: 4
---
{% set image = hero.image or {src: "images/hero.jpg", "alt": "CG Guitars' Charlie playing guitar on stage"} %}
<h1 class="visually-hidden">Store</h1>
<div class="login-wrapper"> 

  ## Purchase video lessons or vouchers
  <div class="login-widget relative">
      <div class="login-container flex-widget-container">
          <div class="login-title-wrap">
  
  <p class="subtitle">Select from a category below.</p>
</div>
   <div data-owner-name="CG Guitar" class="tz-form-singup" id="tz-form-singup" rel="587340" data-type="300"></div>
      </div>
      {%- Image image.src, image.alt -%}
    </div>
</div>

<script type="text/javascript" src="https://app.teacherzone.com/Assets/widget/store-widget/tz-store-widget.js"></script>