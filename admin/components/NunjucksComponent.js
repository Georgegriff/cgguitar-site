export const NunjucksComponent = ({data, body, type, name, element,templateName = type, parentComponent = 'div'}) => {
    // nunjucks auto fetches partials which i copy into admin dir
    let html;
    try {
        html = window.env.render(`partials/components/${templateName}.njk`, {
            // todo find if data is markdown or not
            [type]: {
                data,
                templateContent: marked(body)
            }
        });
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
