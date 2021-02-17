import "https://mozilla.github.io/nunjucks/files/nunjucks.js";
window.env = nunjucks.configure('/admin')
window.env.addFilter('slug', (value) => {
  // good enough
  if(!value) {
    return;
  }
  return `${value}`.toLowerCase();
})
window.env.addFilter('imgmin', (value) => {
  return value;
})

window.env.addFilter('ariatel', (value) => {
  return value;
})

window.env.addFilter('skip', (value) => {
  return value;
})

window.env.addFilter('eleventyNavigation', (value) => {
  return value;
})
window.env.addGlobal('helpers', {
  // todo see if can reduce duplication, precompile?
    placeholders:(str) => str,
    componentLink: (input) => {
        let link;
        if(input.url) {
          return input.url;
        }
        if(input.page) {
          link = `/${input.page}/`;
        }
        if(input.component) {
          return `${link}#${input.component}`;
        }
        return link
      },
      isExternalLink: () => false
})
