/**
 * Created by binperson on 2017/5/9.
 */
var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
  "name":String,/*电话*/
  "password":String,/*密码*/
  "avatar": String
});

var Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;
