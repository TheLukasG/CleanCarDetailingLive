// https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
exports.onCreateWebpackConfig = (helper) => {
  const { stage, actions, getConfig } = helper;
  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};

// ---------------------------------------------------------
// ADD THIS PART: Create pages from JSON in content/pages
// ---------------------------------------------------------

const path = require("path");
const fs = require("fs");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const pagesDir = path.resolve("./content/pages");

  if (!fs.existsSync(pagesDir)) return;

  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith(".json"));

  files.forEach(file => {
    const slug = file.replace(".json", "");
    const data = JSON.parse(fs.readFileSync(path.join(pagesDir, file)));

    createPage({
      path: slug === "index" ? "/" : `/${slug}`,
      component: path.resolve("./src/templates/page-template.js"),
      context: {
        title: data.title,
        slug
      },
    });
  });
};
