# 11ty-web-components-scaffold

This template is a collection on configurations that i've taken from my own website, which may be useful. Much of it is similar/ the same as https://github.com/11ty/eleventy-base-blog with extra stuff sprinkled on top.

For something more production ready checkout https://github.com/modernweb-dev/rocket
I may switch to their tooling at some point myself :)

> There has been little effort to tidy up a lot of the config, it's just what I find to be useful at the time for getting me started fast, by cloning this repo.


This repository provides:

- A Simple dev server that supports modern JS
- A build process of using JS/Web Components
- SCSS Support
- Basic navigation
- Image optimization
- Meta tag configuration
- Web Font configuration
- Sitemap configuration.
- An example of how to work with Web Components with a YouTube embed.
- Basic Netlify config sitemap submission

My personal site has some additional configuration for things such as:
https://github.com/Georgegriff/griffadev

- Twitter embeds
- Live Code Demos Web Component
- Blog tags
- Blog series
- Blog pagination
- RSS/JSON Feed

# Developing

```
npm install
```

Dev

```
npm start
```

Prod

```
npm run build
```

# Configuration

Sitemap: replace `YOUR_SITE_URL` in netlify.toml


# Netlify cms

Run `npm run netlify`

