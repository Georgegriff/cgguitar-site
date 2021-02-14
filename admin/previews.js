import "./nunjucks-env.js";
import "./tags/Image.js";
import {Component} from "./components/Component.js"
import {Page} from "./components/Page.js";
// React component for netlify-cms api

CMS.registerPreviewTemplate("about", Page);
CMS.registerPreviewStyle("css/reset.css");
CMS.registerPreviewStyle("css/critical.css");
CMS.registerPreviewStyle("./cms-overrides.css")


CMS.registerPreviewTemplate("card", Component({
    type: "card"
}));


CMS.registerPreviewTemplate("quote", Component({
    type: "quote"
}));

CMS.registerPreviewTemplate("testimonial", Component({
    type: "testimonial"
}));
