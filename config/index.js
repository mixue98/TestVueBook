// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,   //true如果在config -> index.js 中的 build 代码中的 productionSourceMap的值设为false ，打包后文件体积可以减少百分之八十

  
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    //  //有两处 / 和./  此处从/改为./
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8056,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',  
    proxyTable: {
     '/login': 'http://192.168.213.245:8080/demo3/',
     '/register': 'http://192.168.213.245:8080/demo3',
     '/findBooksByPage': 'http://192.168.213.245:8080/demo3',
     '/addToCart': 'http://192.168.213.245:8080/demo3',
     '/findAllCartByPage': 'http://192.168.213.245:8080/demo3',
     '/removeToCart': 'http://192.168.213.245:8080/demo3',
     '/findAllAddress': 'http://192.168.213.245:8080/demo3',
     '/deleteAddress': 'http://192.168.213.245:8080/demo3',
     '/addAddress': 'http://192.168.213.245:8080/demo3',
     '/removeByQuery': 'http://192.168.213.245:8080/demo3',
     '/updateUser': 'http://192.168.213.245:8080/demo3',
     '/findUser': 'http://192.168.213.245:8080/demo3',
     '/updatePwd': 'http://192.168.213.245:8080/demo3',
     '/updateAddress': 'http://192.168.213.245:8080/demo3',
     '/findAllOrdersByPage': 'http://192.168.213.245:8080/demo3',
     '/findBooksByClassify': 'http://192.168.213.245:8080/demo3',
     '/findAllOrdersByState': 'http://192.168.213.245:8080/demo3',
     '/calculateTatolById': 'http://192.168.213.245:8080/demo3',
     '/showPaid': 'http://192.168.213.245:8080/demo3',
     '/addToOrders': 'http://192.168.213.245:8080/demo3',
     '/payment': 'http://192.168.213.245:8080/demo3',
     '/addPayPwd': 'http://192.168.213.245:8080/demo3',
     '/checkPayPwd': 'http://192.168.213.245:8080/demo3',
     '/deleteOrders': 'http://192.168.213.245:8080/demo3',
     '/updateOrder': 'http://192.168.213.245:8080/demo3',
     '/findOrderItem': 'http://192.168.213.245:8080/demo3',
     '/addComment': 'http://192.168.213.245:8080/demo3',
     '/createcode': 'http://192.168.213.245:8080/demo3',
     '/validate': 'http://192.168.213.245:8080/demo3',
     '/forgetPwd': 'http://192.168.213.245:8080/demo3',
     '/addBooks': 'http://192.168.213.245:8080/demo3',
     '/updateBook': 'http://192.168.213.245:8080/demo3',
     '/removeBook': 'http://192.168.213.245:8080/demo3',
     '/findAllBooks': 'http://192.168.213.245:8080/demo3',
     '/searchBook': 'http://192.168.213.245:8080/demo3',
      '/booksItem': 'http://192.168.213.245:8080/demo3',
      '/findComment': 'http://192.168.213.245:8080/demo3',
      '/findAllOrder': 'http://192.168.213.245:8080/demo3',
      '/findAllOrderByState': 'http://192.168.213.245:8080/demo3',
      '/updateState': 'http://192.168.213.245:8080/demo3',
      '/managerRegister': 'http://192.168.213.245:8080/demo3',
      '/managerLogin': 'http://192.168.213.245:8080/demo3'
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
