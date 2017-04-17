/**
 * Created by binperson on 2017/4/12.
 */
var mongoose = require('mongoose');

var goodsSchema = new mongoose.Schema({
  "id": String,
  "typename": String,
  "type": Number,
  "name": String,
  "desc": String,
  "price": Number,
  "oldPrice": Number,
  "info": String,
  "shopowner": String
});

var Goods = mongoose.model("Goods",goodsSchema);

module.exports = Goods;
