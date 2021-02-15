const tagFilters = ["all", "nav",];
const {encode} = require('html-entities');
module.exports = {
  filterCollectionTags: (tag) => !tagFilters.includes(tag),
  get year() {
    return new Date().getFullYear()
  },
  placeholders: (text, placeholderVals) => {
    if(!placeholderVals) {
      return text;
    }
    const keys = Object.keys(placeholderVals);
    return keys.reduce((t, current) => {
      if(t.includes(current)) {
        t = t.replace(new RegExp(current, 'g'), placeholderVals[current])
      }
      return t
    }, text)
  },
  spread: (attrs = {}, prefix="", convertCamel = true) => {
    const str = Object.keys(attrs).reduce((str, key)=> {
      let keyStr = key;
      if (convertCamel) {
        keyStr = keyStr.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
      }
      const attrValue = `${attrs[key]}`;
      const newValue  = `${prefix}${keyStr}="${encode(attrValue)}"`
      str += ` ${newValue}`
      return str;
    }, '')
    return str;
  },
  quoteStartTemplate: (url) => {
    return `:root { --quote-image-start: url(${url});}`;
  },
  quoteEndTemplate: (url) => {
    return `:root { --quote-image-end: url(${url});}`;
  },
  production: process.env.NODE_ENV === "production",
  mergeComponent(componentOne, componentTwo) {
    componentOne.templateContent =`${componentTwo.templateContent}${componentOne.templateContent}`
    componentOne.data =  {
      ...componentTwo.data,
      ...componentOne.data
    }
    return componentOne;
  },
  componentLink: (input) => {
    let link;
    if(input.url) {
      return input.url;
    }
    if(input.page) {
      link = `/${input.page}/`;
    }
    if(input.component) {
      return `${link}#${input.component}`;
    }
    return link
  },
  getComponent(collection, name, type) {
    let component = collection[`${type}__${name}`];
    if(!component) {
      throw new Error(`Component: ${name} not found in collection for type: ${type}`)
    }
    return component
  },
  filterComponents(components, collection) {
    if(!components) {
      return []
    }
    return components.map((componentData) => {
        const {name, type} = componentData;
        if(type === "custom") {
          return componentData;
        }
        const component = this.getComponent(collection, name, type);
        const componentType = component.data.type || (component.data.tags && component.data.tags[0]);
        if(!type) {
          throw new Error(`Type not found for: ${name} make collection or add type`)
        }
        component.componentPath = `partials/components/${componentType}.njk`
        return component;
    });
  }
};
