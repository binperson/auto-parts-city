/**
 * Created by binperson on 2017/4/28.
 */
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  "buyerphonenum":String,/*买家电话*/
  "shopid":String,/*店家*/
  "info": String,
  "score": Number,
  "comment": String,
  "totalPrice": Number,
  "paytime": Number,
  "commenttime": Number,
  "serviceScore": Number,
  "goodsScore": Number,
  "avatar": String,
  "see": Number
});

var Order = mongoose.model("Order",orderSchema);

module.exports = Order;
