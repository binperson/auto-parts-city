/**
 * Created by binperson on 2017/5/16.
 */
var mongoose = require('mongoose');

var informationSchema = new mongoose.Schema({
  'pic': String/*资讯图片地址*/
});
var Information = mongoose.model("Information",informationSchema);

module.exports = Information;
