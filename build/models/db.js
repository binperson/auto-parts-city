/**
 * Created by binperson on 2017/4/9.
 */
'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/city');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('数据库成功打开');
});

module.exports = db;
