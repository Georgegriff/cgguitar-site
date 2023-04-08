const { precompile, Environment } = require("nunjucks");
const path = require("path");

module.exports = function nunjucks(options = {}) {
  const envFn = options.env;

  const precompileOptions = options.precompile;
  if (!precompileOptions) {
    throw new Error("The 'precompile' option is required");
  }

  return {
    name: "nunjucks-precompile",
    resolveId(importee, importer) {
      if (importee.startsWith("nunjucks-precompile:")) {
        // Extract the template path from the importee
        const templatePath = importee.slice("nunjucks-precompile:".length);
        const resolvedPath = path.resolve(importer, templatePath);

        // Return a unique ID for the precompiled template module
        return `${resolvedPath}.nunjucks.precompiled.js`;
      }

      // Let Rollup handle all other imports normally
      return null;
    },

    async load(id) {
      const env =
        typeof envFn === "function" ? await envFn(new Environment()) : envFn;

      if (id.endsWith(".nunjucks.precompiled.js")) {
        // Generate the precompiled template module based on the ID
        const templatePath = id.slice(0, -".nunjucks.precompiled.js".length);
        const precompiledCode = precompile(templatePath, {
          ...precompileOptions,
          env: env,
          wrapper: (compiled, opts) => {
            const output = compiled
              .map(({ name, template }) => {
                const compiledFn = `(function() {\n${template}\n})()`;
                return `"${name}": ${compiledFn}`;
              })
              .join(",\n");
            const generatedCode = `export default {\n${output}\n};`;
            return generatedCode;
          },
        });

        // Return the precompiled module code
        return precompiledCode;
      }

      // Let Rollup handle all other modules normally
      return null;
    },
  };
};
