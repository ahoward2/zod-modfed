const custom = require("../webpack.config.js")[0];

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    { name: "@storybook/addon-essentials", options: { actions: false } },
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    };
  },
};
