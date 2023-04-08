import nunjucks from "nunjucks";
import templates from "nunjucks-precompile:../../../../src/_includes";
import { create } from "./nunjucks/env.mjs";
export const env = create(
  new nunjucks.Environment(new nunjucks.PrecompiledLoader(templates))
);

window.env = env;
