/**
 * Created by binperson on 2017/4/27.
 */
var mongoose = require('mongoose');

var buyerSchema = new mongoose.Schema({
  "buyerphonenum":String,/*买家电话*/
  "buyerpassword":String,/*买家密码*/
  "avatar": String
});

var Buyer = mongoose.model("Buyer",buyerSchema);

module.exports = Buyer;
