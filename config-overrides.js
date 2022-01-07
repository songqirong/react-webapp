const { resolve, join } = require('path');
const paths = require('react-scripts/config/paths');
const {
  override,
  fixBabelImports,
  watchAll,
  overrideDevServer,
  addPostcssPlugins,
  addWebpackAlias,
} = require('customize-cra');
const addCustomize = () => (config) => {
  // 更改输出文件
  const dist_path = join(__dirname, 'dist');
  paths.appBuild = dist_path;
  config.output.path = dist_path;
  return config;
};
const devServerConfig = () => (config) => ({
  ...config,
  // proxy: {
  //   "/api": {
  //     target: "http://localhost:8095",
  //     changeOrigin: true,
  //     wss: true,
  //   },
  // },
});
module.exports = {
  webpack: override(
    // 按需引入antd-nobile
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
    // 自动转换（px => rem）
    addPostcssPlugins([require('postcss-px2rem')({ remUnit: 75 })]),
    // 起别名
    addWebpackAlias({
      ['@']: resolve(__dirname, 'src'),
      ['src']: resolve(__dirname, 'src'),
      ['@components']: resolve(__dirname, 'src/components'),
      ['@redux']: resolve(__dirname, 'src/redux'),
      ['@api']: resolve(__dirname, 'src/api'),
      ['@utils']: resolve(__dirname, 'src/utils'),
    }),
    addCustomize(),
  ),
  devServer: overrideDevServer(devServerConfig(), watchAll()),
};
