require('dotenv').config()
const { DateTime, Duration } = require("luxon");
const fs = require("fs");
const pluginPWA = require("eleventy-plugin-pwa");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const { minify } = require("terser");
const {getPlaylists} = require("./src/_filters/youtube");
const siteMeta = require("./src/_data/metadata.json");
const htmlmin = require('html-minifier');
const {imageOptimizer} = require('./imageopt');

module.exports = (eleventyConfig) => {
  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  eleventyConfig.addNunjucksAsyncShortcode("Image", async (src, alt, ariaHidden) => {
    if (!alt) {
      throw new Error(`Missing accessibility description on image on ${src}`);
    }
    const img = await imageOptimizer(src, {alt, ariaHidden});

    return img
  });

  eleventyConfig.addNunjucksAsyncShortcode("ImageUrl", async (src, templateFn) => {
    const img = await imageOptimizer(src, {urlOnly: true})
    const val = templateFn ? templateFn(img) : img;
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

  eleventyConfig.addPassthroughCopy({"src/images": "admin/images"});
  eleventyConfig.addPassthroughCopy("admin");
  // cms css
  eleventyConfig.addPassthroughCopy({"src/_includes/css": "admin/css"});
  eleventyConfig.addPassthroughCopy({"src/_includes/partials": "admin/partials"});


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
let componentCollectionObj;
eleventyConfig.addCollection('components', (collection) => {
  // potential for clashes with names. may need to type prefix.
  const components = collection.getFilteredByGlob([
  "./src/components/**/*.md",
  "./src/testimonials/**/*.md",
  "./src/playlists/**/*.md",
  "./src/lessons/levels/**/*.md"
]);
  componentCollectionObj =  components.reduce((componentsCollection, current) => {
      current.outputPath = false;
      const componentType = current.data.type || (current.data.tags && current.data.tags[0]);
      componentsCollection[`${componentType}__${current.data.name || current.fileSlug}`] = current;
      return componentsCollection
  }, {})
  return componentCollectionObj;
})

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
    return {...args};
  });


  eleventyConfig.addFilter("hasOutputPath", (entries) => {
    return entries.filter(({outputPath}) => !!outputPath)
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
      return callback(null, data[0]);
    } else {
      return callback(new Error(`No playlist found: ${JSON.stringify(playlist)}`));
    }
  })

  eleventyConfig.addNunjucksAsyncFilter("imgmin", (src, callback) => {
      imageOptimizer(src, {urlOnly: true})
      .then((img) => {
          return callback(null, img);
      }).catch((e) => {
        return callback(e);
      })
  });

  eleventyConfig.addNunjucksAsyncFilter("ytmax", (src, callback) => {
    imageOptimizer(src, {urlOnly: true, widths: [1280]})
    .then((img) => {
        return callback(null, img);
    }).catch((e) => {
      return callback(e);
    })
});

if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      // Eleventy 1.0+: use this.inputPath and this.outputPath instead
      if(!outputPath) {
        return content;
      }
      if( outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }

      return content;
    });
}

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
