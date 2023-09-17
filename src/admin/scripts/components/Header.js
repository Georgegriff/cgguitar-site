import { env } from "../nunjucks-env";

export const HeaderPreview = ({ entry, getAsset }) => {
  const heroEntry = entry.getIn(["data", "hero"]);
  if (!heroEntry) {
    return;
  }
  const hero = heroEntry.toJSON();
  try {
    const image = heroEntry.getIn(["image", "src"]);
    const heroImage = getAsset(image);
    hero.image.src = heroImage;
  } catch (e) {
    console.error(e);
    return;
  }

  // nunjucks auto fetches partials which i copy into admin dir
  const html = env.render("partials/header.njk", {
    hero,
  });
  const headerComponent = h("div", {
    // YOLO
    dangerouslySetInnerHTML: { __html: html },
  });
  return headerComponent;
};
CMS.registerPreviewTemplate("header", HeaderPreview);
