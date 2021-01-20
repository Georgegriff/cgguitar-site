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
      text: "Facebook",
      icon: "img/facebook.svg",
      url:  `https://www.facebook.com/${siteMeta.author.facebook}`
    },
    {
      text: "YouTube",
      icon: "img/youtube.svg",
      url:  `https://www.youtube.com/channel/${siteMeta.author.youtube}`
    },
    {
      text: "Instagram",
      icon: "img/instagram.svg",
      url:  `https://instagram.com/${siteMeta.author.instagram}`
    },
    {
      text: "Twitter",
      icon: "img/twitter.svg",
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
    }
  ]
};
