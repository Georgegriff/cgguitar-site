export function throttle(callback, wait, immediate = false) {
    let timeout = null 
    let initialCall = true
    
    return function() {
      const callNow = immediate && initialCall
      const next = () => {
        callback.apply(this, arguments)
        timeout = null
      }
      
      if (callNow) { 
        initialCall = false
        next()
      }
  
      if (!timeout) {
        timeout = setTimeout(next, wait)
      }
    }
  }
export const nunjucksRender = (templateName, type, data, body) => {
    return window.env.render(`partials/components/${templateName}.njk`, {
        // todo find if data is markdown or not
        [type]: {
            data,
            templateContent: marked(window.env.renderString(body))
        }
    });
}


export const debouncedRender = () => throttle(nunjucksRender, 300);