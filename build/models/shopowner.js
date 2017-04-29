/**
 * Created by binperson on 2017/4/9.
 */

var mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
  "shopphonenum":String,/*店家电话*/
  "shoppassword":String,/*店家密码*/
  'avatar': String,/*店家头像*/
  'pics': [String],/*店家秀图片地址*/
  'name' : String,/*店铺名称*/
  'desc' : String,/*店铺描述*/
  'desctail' : String,/*店铺详细描述*/
  'isdelivery' : Boolean,/*是否可以配送*/
  'deliveryprice' : Number,/*配送费*/
  'minprice' : Number,/*起送价格*/
  'supports' : [Number],/*活动支持*/
  'infos' : [String],/*更多信息*/
  'limit': String,
  'deliveryTime': Number,
  'score': Number,
  'serviceScore': Number,
  'foodScore': Number,
  'rankRate': Number,
  'ratingCount': Number,
  'sellCount': Number,
  'see': Number
});

var Shopowner = mongoose.model("Shopowner",shopSchema);

module.exports = Shopowner;
