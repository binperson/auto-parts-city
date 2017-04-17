/**
 * Created by binperson on 2017/4/9.
 */
const Shopowner = require("../models/shopowner");
const Goods = require("../models/goods");

const formidable = require("formidable");
const md5 = require("md5");
const path = require('path');
const fs = require('fs');

exports.doLogin = function(req,res,next){
  let form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    let shopphonenum = fields.shopphonenum;
    let shoppassword = fields.shoppassword;
    let jiamihou = md5(md5(shoppassword)+"binperson");
    Shopowner.find({"shopphonenum":shopphonenum},function(err,result){
      if(err){
        res.send("-1");
        return;
      }
      if(result.length===0){
        let mo = ["moren0.jpg","moren1.jpg","moren2.jpg","moren3.jpg"];
        let more = mo[Math.floor(Math.random()*3)];
        Shopowner.create({
          "shopphonenum":shopphonenum,
          "shoppassword":jiamihou,
          'avatar': more
        },function(err,shopphonenum){
          if (err) {
            res.send("-1");
            return;
          }
          req.session.login = "1";
          req.session.shopphonenum = shopphonenum;
          res.send("1");
          return;
        });
      }else{
        if(jiamihou==result[0].shoppassword){
          req.session.login = "1";
          req.session.shopphonenum = result[0].shopphonenum;
          res.send('1');
          return
        }else{
          res.send("-2");
          return;
        }
      }

    })
  });
}

exports.doSetshow = function (req,res,next) {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname+'/../upload/show');
  form.parse(req,function(err,fields,files){


    Shopowner.find({ "shopphonenum":'18172655594' }, function(err,result){
      if(err){
        res.send("-1");
        return;
      }
      let rlength = result[0].pics.length;
      let oldpath = files.file.path;
      let newpath = path.normalize(__dirname+'/../upload/show')+'/'+'18172655594'+rlength+'.jpg';
      fs.rename(oldpath,newpath,function(err) {
        if (err) {
          res.send('失败');
          return;
        }

        let pics = [];
        /*if(result[0].pics === undefined){
          pics.push('/show/18172655940.jpg');
          Shopowner.update({"shopphonenum":'18172655594'},{'pics': pics},function () {
            res.send('1');
            return;
          });
        } else {
          pics = result[0].pics;
          pics.push('/show/1817265594' + result[0].pics.length + '.jpg');
          Shopowner.update({"shopphonenum":'18172655594'},{'pics': pics},function () {
            res.send('1');
            return;
          });
        }*/
        pics = result[0].pics;
        pics.push('/show/1817265594' + rlength + '.jpg');
        Shopowner.update({"shopphonenum":'18172655594'},{'pics': pics},function (err,result1) {
          res.send('1');
          return;
        });
      });
    });
  })
}

exports.doCreateshop = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){

      console.log(fields);
      let arr = ['在线支付满28减5','汽配无限活力全场8折起','爱车精彩套餐','该商家支持发票,请下单写好发票抬头','已加入“汽配保”计划,性能安全保障'];
      let supports = [];
      let infos = [];
      fields.supports.forEach(function (item, index, array) {
        for(let i = 0; i < arr.length; i++){
          if(item === arr[i]){
            supports.push(i);
          }
        }
      });
      fields.infos.forEach(function (item, index, array) {
        console.log(item);
        infos.push(item.value);
      });

      fields.supports = supports;
      fields.infos = infos;
      console.log(fields);

      Shopowner.update({"shopphonenum":'18172655594'},{
        name: fields.name,
        desc: fields.desc,
        desctail: fields.desctail,
        isdelivery: fields.isdelivery,
        deliveryprice: fields.deliveryprice,
        minprice: fields.minprice,
        supports: supports,
        infos: infos
      },function (err,result) {
        res.send('1');
        return;
      });
  });
}

exports.doCreategoods = function (req,res,next) {
  let form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    console.log(files);
    console.log(fields);
    fields.shopowner = '18172655594';
    Goods.create(fields,function(err,result){
      if (err) {
        res.send("-1");
        return;
      }
      res.send("1");
      return;
    });
  });
}

exports.shop = function (req, res, next) {
  Shopowner.find({"shopphonenum":'18172655594'},function(err,result){
    let shop = {};
    shop.name = result[0].name;
    shop.description = result[0].desc;
    shop.deliveryTime = 38;//送达时间字段
    shop.score = 0;
    shop.serviceScore = 0;
    shop.foodScore = 0;
    shop.rankRate = 0;
    shop.minPrice = result[0].minprice;
    shop.deliveryPrice = result[0].deliveryprice;
    shop.ratingCount = 0;
    shop.sellCount = 0;
    shop.bulletin = result[0].desctail;
    let oldsupports = result[0].supports;
    let arr = ['在线支付满28减5','汽配无限活力全场8折起','爱车精彩套餐','该商家支持发票,请下单写好发票抬头','已加入“汽配保”计划,性能安全保障'];
    shop.supports = [];
    oldsupports.forEach(function (item, index, array) {
      let supports = {};
      supports.type = item;
      supports.description = arr[item];
      shop.supports.push(supports);
    });
    shop.avatar = result[0].avatar;
    shop.pics = result[0].pics;
    shop.infos = result[0].infos;
    res.json({
      errno: 0,
      data: shop
    })

  });
}

exports.goods = function (req,res,next) {
  Goods.find({'shopowner': '18172655594'}, function (err, result) {
    let goods = [];
    let ogood = {};
    ogood.name = result[0].typename;
    ogood.type = -1;
    let foods = [];
    let ofood = {};
    ofood.name = result[0].name;
    ofood.price = result[0].price;
    ofood.oldPrice = result[0].oldPrice;
    ofood.description = result[0].desc;
    ofood.sellCount = 0;
    ofood.rating = 0;
    ofood.info = result[0].info;
    ofood.icon = 'icondefault.jpg';
    ofood.image = 'imgdefault.jpg';
    ofood.ratings = [];
    foods.push(ofood);
    ogood.foods = foods;
    goods.push(ogood);
    res.json({
      errno: 0,
      data: goods
    });


  })
}

exports.ratings = function (req,res,next) {
  let ratings = [];
  let orating = {};
  orating.username = 'binperson';
  orating.rateTime = 1469281964000;
  orating.deliveryTime = 90;
  orating.score = 5;
  orating.rateType = 0;
  orating.text = '配件不错,以后也会常来,强烈推荐.';
  orating.avatar = '/avatar/moren3.jpg';
  let recommend = ['个性轮胎'];
  orating.recommend = recommend;
  ratings.push(orating);
  res.json({
    errno: 0,
    data: ratings
  });
}
