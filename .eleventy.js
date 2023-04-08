require("dotenv").config();
const nunjucks = require("./nunjucks-plugin");
const path = require("path");
const { DateTime } = require("luxon");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { minify } = require("terser");
const { getPlaylists } = require("./src/_filters/youtube");
const siteMeta = require("./src/_data/metadata.json");
const htmlmin = require("html-minifier");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

const { imageOptimizer } = require("./imageopt");

module.exports = (eleventyConfig) => {
  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, { permalink: false });

  eleventyConfig.addNunjucksAsyncShortcode(
    "Image",
    async (src, alt, ariaHidden) => {
      if (!alt && !ariaHidden) {
        // work around until netlify-cms supports required fields inside of optional object
        console.error(
          `Missing alt on image: ${src}, setting default so build doesn't fail`
        );
        alt = `Uploaded image for CG Guitar`;
      }
      const img = await imageOptimizer(src, { alt, ariaHidden });

      return img;
    }
  );

  eleventyConfig.addNunjucksAsyncShortcode(
    "ImageUrl",
    async (src, sizes, publicPath = "") => {
      const img = await imageOptimizer(src, {
        urlOnly: true,
        widths: sizes,
        publicPath,
      });
      return img;
    }
  );

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
  // cms stuff
  eleventyConfig.addPassthroughCopy({ "./src/_includes/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy({ "./src/admin/scripts": "admin/scripts" });
  // eleventyConfig.addPassthroughCopy({ "./public/css": "css" });

  eleventyConfig.addPassthroughCopy({ "./src/_includes/scss": "css" });
  eleventyConfig.addPassthroughCopy({ "./src/images/svg": "images/svg" });

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });
  let componentCollectionObj;
  eleventyConfig.addCollection("components", (collection) => {
    // potential for clashes with names. may need to type prefix.
    const components = collection.getFilteredByGlob([
      "./src/components/**/*.md",
      "./src/testimonials/**/*.md",
      "./src/playlists/**/*.md",
      "./src/lessons/levels/**/*.md",
    ]);
    componentCollectionObj = components.reduce(
      (componentsCollection, current) => {
        current.outputPath = false;
        const componentType =
          current.data.type || (current.data.tags && current.data.tags[0]);
        componentsCollection[
          `${componentType}__${current.data.name || current.fileSlug}`
        ] = current;
        return componentsCollection;
      },
      {}
    );
    return componentCollectionObj;
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
    return array.slice(n);
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
    debugger;
    console.log(...args);
    return { ...args };
  });

  eleventyConfig.addFilter("hasOutputPath", (entries) => {
    return entries.filter(({ outputPath }) => !!outputPath);
  });

  eleventyConfig.addFilter("ariatel", (number = "") => {
    return [...number].join(" ");
  });

  eleventyConfig.addNunjucksAsyncFilter(
    "fetchYouTubePlaylists",
    async (playlists, callback) => {
      try {
        const data = await getPlaylists(playlists);
        callback(null, data);
      } catch (e) {
        callback(e);
      }
    }
  );

  eleventyConfig.addNunjucksAsyncFilter(
    "fetchYouTubePlaylist",
    async (playlist, callback) => {
      try {
        const data = await getPlaylists([playlist]);
        if (data && data.length) {
          return callback(null, data[0]);
        } else {
          return callback(
            new Error(`No playlist found: ${JSON.stringify(playlist)}`)
          );
        }
      } catch (e) {
        console.error("Failed to fetch playlist", e);
        callback(e);
      }
    }
  );

  eleventyConfig.addNunjucksAsyncFilter("imgmin", (src, callback) => {
    imageOptimizer(src, { urlOnly: true })
      .then((img) => {
        return callback(null, img);
      })
      .catch((e) => {
        return callback(e);
      });
  });

  eleventyConfig.addNunjucksAsyncFilter("ytmax", (src, callback) => {
    imageOptimizer(src, { urlOnly: true, widths: [1280] })
      .then((img) => {
        return callback(null, img);
      })
      .catch((e) => {
        return callback(e);
      });
  });

  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", function (content) {
      if (!this.outputPath) {
        return content;
      }
      if (this.outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
        return minified;
      }

      return content;
    });
  }

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      tempFolderName: ".11ty-vite",
      build: {
        emptyOutDir: false,
      },
      publicDir:
        process.env.NODE_ENV === "production"
          ? path.resolve(__dirname, ".11ty-vite/public")
          : path.resolve(__dirname, "./public"),
      esbuild: {
        jsxFactory: "h",
        jsxFragment: "Fragment",
      },
      resolve: {
        alias: {
          images: path.resolve(__dirname, "../images"),
        },
      },
      plugins: [
        nunjucks({
          env: (env) =>
            import("./src/admin/scripts/nunjucks/env.mjs").then(({ create }) =>
              create(env)
            ),
          precompile: {
            include: [/\.(njk|css|svg|html)$/],
            exclude: [/scripts/, /scss/],
          },
        }),
      ],
    },
  });

  // more cms stuff
  eleventyConfig.addPassthroughCopy({
    // weird but needed to bend vite and 11ty public folders together
    // a long with my own public folder overrides in vite config
    public: "public",
    "./src/_includes/images":
      process.env.NODE_ENV === "production"
        ? "public/admin/images"
        : "admin/images",
    "./src/images/svg":
      process.env.NODE_ENV === "production"
        ? "public/images/svg"
        : "/images/svg",
    "./src/images":
      process.env.NODE_ENV === "production"
        ? "public/admin/images"
        : "admin/images",
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
