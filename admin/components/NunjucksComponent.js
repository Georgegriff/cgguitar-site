export const NunjucksComponent = ({data, body, type, name}) => {
    // nunjucks auto fetches partials which i copy into admin dir
    let html;
    try {
        html = window.env.render(`partials/components/${type}.njk`, {
            // TODO standardize so works out the box with collections
            componentData: data,
            componentContent: body,
            componentInfo: {name}
        });
    } catch(e) {
        console.error(e);
        html = `<div>${body}, data: ${JSON.stringify(data)}</div>`
    }
    const component = h("div", {
      // YOLO
      dangerouslySetInnerHTML: {__html:html}
    });
    return component
};
