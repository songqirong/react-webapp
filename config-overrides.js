const { resolve } = require("path");
const {
  override,
  fixBabelImports,
  watchAll,
  overrideDevServer,
  addPostcssPlugins,
  addWebpackAlias,
} = require("customize-cra");
const addCustomize = () => (config) => {
  return config;
};
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: "http://localhost:9120",
        changeOrigin: true,
        secure: false,
      },
    },
  };
};
module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd-mobile",
      style: "css",
    }),
    addPostcssPlugins([require("postcss-px2rem")({ remUnit: 75 })]),
    addWebpackAlias({
      ["@"]: resolve(__dirname, "src"),
      ["src"]: resolve(__dirname, "src"),
      ["@components"]: resolve(__dirname, "src/components"),
      ["@redux"]: resolve(__dirname, "src/redux"),
    }),
    addCustomize()
  ),
  devServer: overrideDevServer(devServerConfig(), watchAll()),
};
