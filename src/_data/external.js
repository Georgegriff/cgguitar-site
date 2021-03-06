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
  youtube: {
    apiKey: process.env.YT_API_KEY
  },
  links: [
    {
      text: "Facebook",
      icon: "images/facebook.svg",
      url:  siteMeta.author.facebook
    },
    {
      text: "YouTube",
      icon: "images/youtube.svg",
      url:  siteMeta.author.youtube
    },
    {
      text: "Instagram",
      icon: "images/instagram.svg",
      url:  siteMeta.author.instagram
    },
    {
      text: "Twitter",
      icon: "images/twitter.svg",
      url:  siteMeta.author.twitter
    }
  ],
  genericShare,
  sharing: [
    {
      icon: "images/twitter.svg",
      text: "Share to Twitter",
      url(title, tags = [], page) {
        const twitterUrl = "https://twitter.com/intent/tweet?text=";
        const {text, url} = genericShare.data(title, tags, page);
        return `${twitterUrl}${encodeURIComponent(`${text} ${url}`)}`;
      }
    }
  ]
};
