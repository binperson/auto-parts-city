require('./check-versions')()

var config = require('../config') //运行时或开发时的一些配置
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable//需要代理的接口

var app = express()
var router = require('./controller');
var db = require("./models/db.js");
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use("/avatar",express.static("./build/avatar"));
app.use("/",express.static("./build/upload"));

app.post('/posts',router.posts)
app.post('/dologin',router.doLogin);
app.post('/dobuylogin',router.dobuyLogin);
app.post('/dosetshow',router.doSetshow);
app.post('/docreateshop',router.doCreateshop);
app.post('/docreategoods',router.doCreategoods);
app.post('/dochanginfo', router.doChangeinfo);
app.post('/deletegoods', router.deletegoods);
app.post('/addPic/:id', router.addPic);
app.post('/shopone', router.shopone);
app.post('/goods',router.goods);
app.post('/addorder',router.addorder);
app.post('/commit', router.commit);
app.post('/orderTable', router.orderTable)
app.post('/ratings', router.ratings);
app.post('/passshop', router.passshop);
app.post('/deleteshop', router.deleteshop);
app.post('/addinformation', router.addinformation);
app.post('/infodelete', router.infodelete);
app.post('/exit',router.exit);
app.post('/search', router.search);

app.get('/oshop',router.oshop);
app.get('/shop',router.shop);
app.get('/goodsinfo',router.goodsinfo)
app.get('/limits', router.limits)
app.get('/myself', router.myself)
app.get('/getorder', router.getorder);
app.get('/information', router.getinformation);




var compiler = webpack(webpackConfig)//得到compiler给devMiddleware中间件用

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})//app.js放在内存里

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})//代理转发

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))



var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
