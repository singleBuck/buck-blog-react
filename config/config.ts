import { IConfig } from 'umi-types'
import path from 'path'
import proxy from './proxy'
const { REACT_APP_ENV } = process.env

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  hash: true,
  // 浏览器兼容版本
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 9,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'singleBuck',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  alias: {
    '@': path.resolve(__dirname, '../src'),
    'assets': path.resolve(__dirname, '../src/assets'),
    'components': path.resolve(__dirname, '../src/components')
  },
  publicPath: './',
  proxy: proxy[REACT_APP_ENV || 'dev'],
  cssLoaderOptions: {
    localIdentName: '[local]'
  }
};

export default config;
