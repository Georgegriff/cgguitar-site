import { nunjucksRender } from "./nunjucks-render.js";


export const NunjucksComponent = ({data, body, type, name, element,templateName = type, parentComponent = 'div', debouncedRender}) => {
    // nunjucks auto fetches partials which i copy into admin dir
    let html;
    try {
        let render = debouncedRender ? debouncedRender : nunjucksRender;
        html = render(templateName, type, data, body)
    } catch(e) {
        console.error(e);
        html = `<div>${body}, data: ${JSON.stringify(data)}</div>`
    }
    const component = h(element || parentComponent, {
      // YOLO
      dangerouslySetInnerHTML: {__html:html}
    });
    return component
};
