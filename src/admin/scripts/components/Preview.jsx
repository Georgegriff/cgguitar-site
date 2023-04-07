import { env } from "../nunjucks-env";

const helpers = {
  // todo see if can reduce duplication, precompile?
  placeholders: (str) => str,
  componentLink: (input) => {
    let link;
    if (input.url) {
      return input.url;
    }
    if (input.page) {
      link = `/${input.page}/`;
    }
    if (input.component) {
      return `${link}#${input.component}`;
    }
    return link;
  },
  isExternalLink: () => false,
};

export const Preview = () => {
  const html = ""; //env.render(path, { ...data, helpers });
  // TODO this isn't using layouts, would need to fix that a lot of effort
  // to make this work with the children pattern i have too...
  // might be doable with 2 react components using children maybe.
  return (
    <div>
      <link rel="stylesheet" href="/fonts/fonts.css" />
      <link rel="stylesheet" href="/css/reset.scss" />
      <link rel="stylesheet" href="/css/critical.scss" />
      {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
    </div>
  );
};
