require('dotenv').config()
const { DateTime, Duration } = require("luxon");
const { promisify } = require("util");
const sizeOf = promisify(require("image-size"));
const fs = require("fs");
const pluginPWA = require("eleventy-plugin-pwa");
const path = require('path');
const sharp = require('sharp');
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const { minify } = require("terser");
const {getPlaylists} = require("./src/_filters/youtube");
const siteMeta = require("./src/_data/metadata.json");

module.exports = (eleventyConfig) => {
  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  const imageOptimizer = async (src, {alt, ariaHidden, urlOnly}) => {
    const Image = require("@11ty/eleventy-img");
    const formats = src.endsWith('svg') ? ["svg"] : ["jpeg", "webp"];
    const imgPath = src.startsWith('http') ? src : path.join('src', src)
    let stats = await Image(imgPath, {
      widths: [320, 640, 960, 1200, 1800, 2400],
      formats,
      urlPath: "/images/",
      outputDir: "./dist/images/",
    });
    if(urlOnly && Object.keys(stats).length) {
      const format = Object.keys(stats)[0];
      return stats[format][0].url;
    }
    let placeholderStyle = ''
    let lowestSrc = stats["jpeg"]?.[0];
    if(lowestSrc) {
      const dimensions = await sizeOf(imgPath);
      const placeholder = await sharp(lowestSrc.outputPath)
      .resize({ fit: sharp.fit.inside })
      .blur()
      .toBuffer();
       const base64Placeholder = `data:image/png;base64,${placeholder.toString("base64")}`;
      const containSize = `min(var(--main-width), ${dimensions.width}px) min(calc(var(--main-width) * ${dimensions.height / dimensions.width}), ${dimensions.height}px)`;
      placeholderStyle = `background-size:cover;background-image:url('${base64Placeholder}');contain-intrinsic-size:${containSize}`
    }
   
    const imgHtml = Image.generateHTML(stats,  {
      alt,
      loading: "lazy",
      decoding: "async",
      "aria-hidden": ariaHidden ? "true" : "false",
      style: placeholderStyle
    }, {
      whitespaceMode: "inline"
    })

    return imgHtml;
  }


  eleventyConfig.addNunjucksAsyncShortcode("Image", async (src, alt, ariaHidden) => {
    if (!alt) {
      throw new Error(`Missing accessibility description on image on ${src}`);
    }
    const img = await imageOptimizer(src, {alt, ariaHidden});

    return img
  });


  eleventyConfig.addNunjucksAsyncShortcode("ImageUrl", async (src, templateFn) => {
    const img = await imageOptimizer(src, {urlOnly: true})
    const val = templateFn(img);
    return val;
  });

  // Remember old renderer, if overridden, or proxy to default renderer
  const defaultLinkRender =
    markdownLibrary.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  markdownLibrary.renderer.rules.link_open = function (
    tokens,
    idx,
    options,
    env,
    self
  ) {
    // If you are sure other plugins can't add `target` - drop check below
    const link = tokens[idx];
    var aIndex = link.attrIndex("target");
    const hrefIndex = link.attrIndex("href");
    if (hrefIndex > -1) {
      const href = link.attrs[hrefIndex][1];
      const isRelativeUrl =
 href &&
 (href.startsWith("/") ||
   href.startsWith("#") ||
   href.startsWith(siteMeta.url));
      if (isRelativeUrl) {
 return defaultLinkRender(tokens, idx, options, env, self);
      } else {
 link.attrPush(["rel", "noopener"]); // add new attribute
      }
    }
    if (aIndex < 0) {
      link.attrPush(["target", "_blank"]); // add new attribute
    } else {
      link.attrs[aIndex][1] = "_blank"; // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultLinkRender(tokens, idx, options, env, self);
  };

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addPassthroughCopy("src/images/manifest");
  //eleventyConfig.addPassthroughCopy({ "src/**/images/*.*": "images" });
  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addPlugin(pluginPWA);
    eleventyConfig.addPassthroughCopy({"build/scripts": "scripts"});
  }

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addFilter("sitemapDateTimeString", (dateObj) => {
    const dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
    if (!dt.isValid) {
      return "";
    }
    return dt.toISO();
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Get the last `n` elements of a collection.
  eleventyConfig.addFilter("skip", (array, n) => {
    return array.slice(n)
  });

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      try {
 if (process.env.NODE_ENV === "production") {
   const minified = await minify(code);
   callback(null, minified.code);
 } else {
   callback(null, code);
 }
      } catch (err) {
 console.error("Terser error: ", err);
 // Fail gracefully.
 callback(null, code);
      }
    }
  );

  eleventyConfig.addFilter("debugger", (...args) => {
    //tip!
    console.log(...args);
    debugger;
    return {...args};
  });

  eleventyConfig.addFilter("ariatel", (number = '') => {
    return [...number].join(' ')
  });

  eleventyConfig.addNunjucksAsyncFilter("fetchYouTubePlaylists", async (playlists, callback) => {
    const data = await getPlaylists(playlists);
    callback(null, data);
  })


  eleventyConfig.addNunjucksAsyncFilter("fetchYouTubePlaylist", async (playlist, callback) => {
    const data = await getPlaylists([playlist]);
    if(data && data.length) {
      callback(null, data[0]);
    } else {
      callback(new Error(`No playlist found: ${JSON.stringify(playlist)}`));
    }
  })

  const YouTube = require("./src/_includes/components/youtube");
  eleventyConfig.addShortcode("youtube", (id) => {
    return YouTube({ id });
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
