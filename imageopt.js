const { promisify } = require("util");
const sizeOf = promisify(require("image-size"));
const path = require('path');
const sharp = require('sharp');


const imageOptimizer = async (src, {alt, ariaHidden, urlOnly, widths = [320, 640, 960, 1200, 1800, 2400]}) => {
    const Image = require("@11ty/eleventy-img");
    const formats = src.endsWith('svg') ? ["svg"] : ["jpeg", "webp"];
    const imgPath = src.startsWith('http') ? src : path.join('src', src)
    let stats = await Image(imgPath, {
      widths,
      formats,
      urlPath: "/images/",
      outputDir: "./dist/images/",
    });
    if(urlOnly && Object.keys(stats).length) {
      const format = Object.keys(stats)[0];
      const sizes = stats[format];
      return sizes[sizes.length - 1].url;
    }
    let placeholderStyle = ''
    let lowestSrc = stats["jpeg"]?.[0];
    if(lowestSrc) {
      const dimensions = await sizeOf(imgPath);
      const placeholder = await sharp(lowestSrc.outputPath)
      .resize({ fit: sharp.fit.inside })
      .blur()
      .toBuffer();
       const base64Placeholder = `data:image/png;base64,${placeholder.toString("base64")}`;
      const containSize = `min(var(--main-width), ${dimensions.width}px) min(calc(var(--main-width) * ${dimensions.height / dimensions.width}), ${dimensions.height}px)`;
      placeholderStyle = `background-size:cover;background-image:url('${base64Placeholder}');contain-intrinsic-size:${containSize}`
    }
   
    const imgHtml = Image.generateHTML(stats,  {
      alt,
      loading: "lazy",
      decoding: "async",
      "aria-hidden": ariaHidden ? "true" : "false",
      style: placeholderStyle
    }, {
      whitespaceMode: "inline"
    })

    return imgHtml;
  }

module.exports.imageOptimizer = imageOptimizer;