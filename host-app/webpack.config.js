const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { camelCase } = require("camel-case");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const federatedRemotes = {
  "@ahowardtech/checkout": "^2.0.0",
};

const localRemotes = {
  "@ahowardtech/checkout": `${camelCase(
    "@ahowardtech/checkout"
  )}@http://localhost:3001/browser/remote-entry.js`,
};

const deps = {
  ...federatedRemotes,
  ...require("./package.json").dependencies,
};

const unpkgRemote = (name) =>
  `${camelCase(name)}@https://unpkg.com/${name}@${
    deps[name]
  }/dist/browser/remote-entry.js`;

const remotes = Object.keys(federatedRemotes).reduce(
  (remotes, lib) => ({
    ...remotes,
    [lib]: unpkgRemote(lib),
  }),
  {}
);

const federationConfig = {
  name: "host-app",
  filename: "remote-entry.js",
  remotes: process.env.LOCAL_MODULES === "true" ? localRemotes : remotes,
  exposes: {},
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
    "styled-components": {
      singleton: true,
      requiredVersion: deps["styled-components"],
    },
    "@rocket-science/event-client": {
      singleton: true,
      requiredVersion: deps["@rocket-science/event-client"],
    },
    "@zod": {
      singleton: true,
      requiredVersion: deps["zod"],
    },
  },
};

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx",
          target: "es2015",
        },
      },
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
    ],
  },
  infrastructureLogging: {
    level: "log",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new FederatedTypesPlugin({
      federationConfig,
    }),
  ],
};
