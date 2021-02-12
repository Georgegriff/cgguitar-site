---
permalink: /confirm-email/
eleventyExcludeFromCollections: true
siteUrl: "{{ .SiteURL }}/confirmation/#confirmation_token={{ .Token }}"
---
<!-- netlify will understand this -->
<a href="{{siteUrl}}">Please click here to verify your email address.</a>



