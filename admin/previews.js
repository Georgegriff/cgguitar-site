import "./nunjucks-env.js";
import "./tags/Image.js";
import {Component} from "./components/Component.js"
import {Page} from "./components/Page.js";
// React component for netlify-cms api

CMS.registerPreviewTemplate("about", Page);
CMS.registerPreviewTemplate("components", Component);
CMS.registerPreviewStyle("css/reset.css");
CMS.registerPreviewStyle("css/critical.css");
CMS.registerPreviewStyle("./cms-overrides.css")
