const tagFilters = ["all", "nav",];
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
      const newValue  = `${prefix}${keyStr}="${attrs[key]}"`
      str += ` ${newValue}`
      return str;
    }, '')
    return str;
  }
};
