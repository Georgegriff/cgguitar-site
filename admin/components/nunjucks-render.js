const debounce = (fn, delay) => {
    return function() {
        fn.args = arguments
        fn.timeout_id && clearTimeout(fn.timeout_id)
        fn.timeout_id = setTimeout(function() { return fn.apply(fn, fn.args) }, delay)
    }
};

export const nunjucksRender = (templateName, type, data, body) => {
    return window.env.render(`partials/components/${templateName}.njk`, {
        // todo find if data is markdown or not
        [type]: {
            data,
            templateContent: marked(body)
        }
    });
}


export const debouncedRender = () => debounce(nunjucksRender, 300);