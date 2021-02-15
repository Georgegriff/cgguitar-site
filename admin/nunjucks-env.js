import "https://mozilla.github.io/nunjucks/files/nunjucks.js";
window.env = nunjucks.configure('/admin')
window.env.addFilter('slug', (value) => {
  // good enough
  return value.toLowerCase();
})
window.env.addGlobal('helpers', {
    // todo see if can reduce duplication, precompile?
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
      }
})
