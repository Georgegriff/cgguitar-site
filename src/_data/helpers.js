const tagFilters = ["all", "nav",];
const {encode} = require('html-entities');
module.exports = {
  filterCollectionTags: (tag) => !tagFilters.includes(tag),
  get year() {
    return new Date().getFullYear()
  },
  placeholders: (text, placeholderVals) => {
    if(!placeholderVals) {
      return text;
    }
    const keys = Object.keys(placeholderVals);
    return keys.reduce((t, current) => {
      if(t.includes(current)) {
        t = t.replace(new RegExp(current, 'g'), placeholderVals[current])
      }
      return t
    }, text)
  },
  spread: (attrs = {}, prefix="", convertCamel = true) => {
    const str = Object.keys(attrs).reduce((str, key)=> {
      let keyStr = key;
      if (convertCamel) {
        keyStr = keyStr.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
      }
      const attrValue = `${attrs[key]}`;
      const newValue  = `${prefix}${keyStr}="${encode(attrValue)}"`
      str += ` ${newValue}`
      return str;
    }, '')
    return str;
  },
  quoteStartTemplate: (url) => {
    return `:root { --quote-image-start: url(${url});}`;
  },
  quoteEndTemplate: (url) => {
    return `:root { --quote-image-end: url(${url});}`;
  },
  production: process.env.NODE_ENV === "production"
};
