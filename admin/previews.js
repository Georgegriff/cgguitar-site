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
    element: "youtube-playlist",
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

const slogan = Component({
    type: "slogan",
    parentComponent: 'main',
    assetsPrefix: "/admin"
})

const levels = Component({
    type: "levels",
    parentComponent: 'main',
    assetsPrefix: "/admin"
})

const gridCard = Component({
    type: "gridCard",
    parentComponent: 'main',
    assetsPrefix: "/admin"
})

const custom = Component({
    type: "custom",
    parentComponent: 'main',
    pathToAssets: {image: ["image"]},
    assetsPrefix: "/admin"
})

const componentDefinitions = {
    playlist,
    card,
    testimonial,
    quote,
    slogan,
    levels,
    gridCard,
    custom
}

// register all  preview components for stand alone previews
Object.keys((componentDefinitions)).forEach((name) => {
    CMS.registerPreviewTemplate(name, componentDefinitions[name]);
})

CMS.registerPreviewTemplate("about", Page({
    assetsPrefix: "/admin"
}));
CMS.registerPreviewTemplate("home", Page({
    assetsPrefix: "/admin"
}));

CMS.registerPreviewTemplate("testimonials", Page({
    assetsPrefix: "/admin"
}));

CMS.registerPreviewTemplate("contact", Page({
    assetsPrefix: "/admin"
}));

CMS.registerPreviewTemplate("videos", Page({
    assetsPrefix: "/admin"
}));

CMS.registerPreviewStyle("css/reset.css");
CMS.registerPreviewStyle("css/critical.css");
CMS.registerPreviewStyle("css/media.css");
CMS.registerPreviewStyle("./cms-overrides.css")


