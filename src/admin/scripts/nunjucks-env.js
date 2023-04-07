//import "https://mozilla.github.io/nunjucks/files/nunjucks.js";
import nunjucks from "nunjucks";
import { Image } from "./tags/Image";
window.nunjucks = nunjucks;
export const env = nunjucks.configure("/admin");
window.env = env;
env.addExtension("Image", new Image());
env.addFilter("slugify", (value) => {
  // good enough
  if (!value) {
    return;
  }
  return `${value}`.toLowerCase();
});
env.addFilter("imgmin", (value) => {
  return value;
});

env.addFilter("head", (array, n) => {
  if (n < 0) {
    return array.slice(n);
  }

  return array.slice(0, n);
});

env.addFilter("skip", (value) => {
  return value;
});

env.addFilter("eleventyNavigation", (value) => {
  return value;
});

env.addGlobal("helpers", {
  // todo see if can reduce duplication, precompile?
  placeholders: (str) => str,
  componentLink: (input) => {
    let link;
    if (input.url) {
      return input.url;
    }
    if (input.page) {
      link = `/${input.page}/`;
    }
    if (input.component) {
      return `${link}#${input.component}`;
    }
    return link;
  },
  isExternalLink: () => false,
});
