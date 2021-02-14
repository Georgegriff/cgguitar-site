import "./nunjucks-env.js";
import "./tags/Image.js";
import {Component} from "./components/Component.js"
import {Page} from "./components/Page.js";
// React component for netlify-cms api

const card = Component({
    type: "card",
    parentComponent: 'main'
})
const playlist =Component({
    type: "playlist",
    templateName: "preview-playlist",
    bodyField: "description",
    parentComponent: 'main'
})

const testimonial = Component({
    type: "testimonial",
    parentComponent: 'main'
})

const quote = Component({
    type: "quote",
    parentComponent: 'main'
})
const componentDefinitions = {
    playlist,
    card,
    testimonial,
    quote
}

// register all  preview components for stand alone previews
Object.keys((componentDefinitions)).forEach((name) => {
    CMS.registerPreviewTemplate(name, componentDefinitions[name]);
})

CMS.registerPreviewTemplate("about", Page);
CMS.registerPreviewStyle("css/reset.css");
CMS.registerPreviewStyle("css/critical.css");
CMS.registerPreviewStyle("./cms-overrides.css")


