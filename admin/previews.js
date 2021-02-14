import "./nunjucks-env.js";
import "./tags/Image.js";
import {Component} from "./components/Component.js"
import {Page} from "./components/Page.js";
// React component for netlify-cms api

const card = Component({
    type: "card",
    parentComponent: 'main',
    pathToAssets: {image: ["image", "src"]},
    assetsPrefix: "/admin"
})
const playlist = Component({
    type: "playlist",
    templateName: "preview-playlist",
    bodyField: "description",
    parentComponent: 'main',
    assetsPrefix: "/admin"
})

const testimonial = Component({
    type: "testimonial",
    parentComponent: 'main',
    pathToAssets: {image: ["image"]},
    assetsPrefix: "/admin"
})

const quote = Component({
    type: "quote",
    parentComponent: 'main',
    assetsPrefix: "/admin"
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

CMS.registerPreviewTemplate("about", Page({
    assetsPrefix: "/admin"
}));
CMS.registerPreviewStyle("css/reset.css");
CMS.registerPreviewStyle("css/critical.css");
CMS.registerPreviewStyle("./cms-overrides.css")


