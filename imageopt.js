const path = require("path");
const sharp = require("sharp");
const Image = require("@11ty/eleventy-img");

const imageOptimizer = async (
  src,
  {
    alt,
    ariaHidden,
    urlOnly,
    widths = [320, 640, 960, 1200, 1800, 2400],
    publicPath = "",
  }
) => {
  const formats = src.endsWith("svg") ? ["svg"] : ["jpeg", "webp"];
  const imgPath = src.startsWith("http")
    ? src
    : path.join("src/_includes", src);
  let stats = await Image(imgPath, {
    widths,
    formats,
    urlPath: "/images/",
    outputDir: `./dist/${publicPath}images/`,
  });
  if (urlOnly && Object.keys(stats).length) {
    const format = Object.keys(stats)[0];
    const sizes = stats[format];
    return sizes[sizes.length - 1].url;
  }
  let placeholderStyle = "";
  const hasJpg = stats["jpeg"];
  if (hasJpg && hasJpg.length && !src.startsWith("http")) {
    let lowestSrc = hasJpg[0];
    const placeholder = await sharp(lowestSrc.outputPath)
      .resize({ fit: sharp.fit.inside })
      .blur()
      .toBuffer();
    const base64Placeholder = `data:image/png;base64,${placeholder.toString(
      "base64"
    )}`;
    placeholderStyle = `background-position:center;background-size:cover;background-image:url('${base64Placeholder}')`;
  }

  const imgHtml = Image.generateHTML(
    stats,
    {
      alt,
      loading: "lazy",
      decoding: "async",
      "aria-hidden": ariaHidden ? "true" : "false",
      sizes: widths.map((w) => w),
      style: placeholderStyle,
    },
    {
      whitespaceMode: "inline",
    }
  );

  return imgHtml;
};

module.exports.imageOptimizer = imageOptimizer;
