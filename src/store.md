---
title: "Store"
templateEngineOverride: md,njk
layout: "layouts/plain.njk"
headerClassName: "none"
eleventyNavigation:
  key: Store
  order: 4
---

{% set image = hero.image or metadata.defaultHero %}

<h1 class="visually-hidden">Store</h1>
<div class="login-wrapper">
  <div class="login-widget relative store-widget">
  <div class="card-width-container">
      <div style="margin-right: auto;">
       <h2>Purchase video lessons or vouchers</h2>
        <p class="subtitle">Select from a category to purchase lessons.</p>
      </div>
      <div class="login-container flex-widget-container store-container">
          <div class="login-title-wrap">
        {%- Image image.src, image.alt -%}

</div>
   <div data-owner-name="CG Guitar" class="tz-form-singup" id="tz-form-singup" rel="587340" data-type="300"></div>
      </div>
    </div>
    </div>
</div>

<script type="text/javascript" src="https://app.teacherzone.com/Assets/widget/store-widget/tz-store-widget.js"></script>
