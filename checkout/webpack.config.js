const path = require("path");
const { camelCase } = require("camel-case");
const { merge } = require("webpack-merge");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const pkg = require("./package.json");
const name = camelCase(pkg.name);

const deps = require("./package.json").dependencies;

const baseConfig = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".md"],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx$/,
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
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
};

const federationConfig = {
  name,
  filename: "remote-entry.js",
  remotes: {},
  exposes: {
    "./Cart": "./src/components/Cart",
  },
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
      requiredVersion: "^2.0.0",
    },
  },
};

const browserConfig = {
  output: {
    path: path.resolve("./dist/browser"),
  },
  plugins: [
    new FederatedTypesPlugin({
      federationConfig,
    }),
  ],
};

module.exports = [merge(baseConfig, browserConfig)];
