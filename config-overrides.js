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
        target: "https://recruitmentapi.persion.cn",
        changeOrigin: true,
        wss: true,
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
      ["@api"]: resolve(__dirname, "src/api"),
      ["@utils"]: resolve(__dirname, "src/utils"),
    }),
    addCustomize()
  ),
  devServer: overrideDevServer(devServerConfig(), watchAll()),
};
