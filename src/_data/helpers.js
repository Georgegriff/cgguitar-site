const tagFilters = ["all", "nav",];
module.exports = {
  filterCollectionTags: (tag) => !tagFilters.includes(tag),
  get year() {
    return new Date().getFullYear()
  }
};
