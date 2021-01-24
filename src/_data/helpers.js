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
  }
};
