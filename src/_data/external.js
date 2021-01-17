const siteMeta = require("./metadata.json");
const helpers = require("./helpers");
const getUrl = (page) => encodeURIComponent(`${siteMeta.url}${page.url}`);

const genericShare = {
  data(title, tags = [], page) {
    const url = `${siteMeta.url}${page.url}`;
    const text = `${title} @${
      siteMeta.author.twitter} ${tags
      .filter(helpers.filterCollectionTags)
      .map((tag) => `#${tag}`)
      .join(" ")}`;
    return {
      text,
      title,
      url
    }
  }
}

module.exports = {
  links: [
    {
      text: "Twitter",
      url:  `https://twitter.com/intent/follow?screen_name=${siteMeta.author.twitter}`
    }
  ],
  genericShare,
  sharing: [
    {
      icon: "img/twitter.svg",
      text: "Share to Twitter",
      url(title, tags = [], page) {
        const twitterUrl = "https://twitter.com/intent/tweet?text=";
        const {text, url} = genericShare.data(title, tags, page);
        return `${twitterUrl}${encodeURIComponent(`${text} ${url}`)}`;
      }
    },
    {
      icon: "img/linkedin.svg",
      text: "Share to LinkedIn",
      url(title, tags = [], page) {
        return `https://www.linkedin.com/shareArticle?mini=true&url=${getUrl(
          page
        )}&title=${encodeURIComponent(title)}&source=griffadev`;
      }
    },
    {
        icon: "img/reddit.svg",
        text: "Share to Reddit",
        url(title, tags = [], page) {
          const baseUrl = "https://www.reddit.com/submit?";
          return `${baseUrl}uri=${getUrl(page)}&title=${encodeURIComponent(title)}`;
        }
    }
  ]
};
