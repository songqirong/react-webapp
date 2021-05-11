// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, fixBabelImports } = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css",
  })
);
