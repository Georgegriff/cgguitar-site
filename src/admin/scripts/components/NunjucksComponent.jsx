import { nunjucksRender } from "./nunjucks-render";

export const NunjucksComponent = ({
  data,
  body,
  type,
  element,
  templateName = type,
  parentComponent = "div",
}) => {
  // nunjucks auto fetches partials which i copy into admin dir
  let html;
  try {
    let render = nunjucksRender;
    html = render(templateName, type, data, body);
  } catch (e) {
    console.error(e);
    html = `<div>${body}, data: ${JSON.stringify(data)}</div>`;
  }
  const Component = element || parentComponent;

  return <Component dangerouslySetInnerHTML={{ __html: html }}></Component>;
};
