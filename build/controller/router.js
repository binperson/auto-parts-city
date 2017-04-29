/**
 * Created by binperson on 2017/4/9.
 */
const Shopowner = require("../models/shopowner");
const Goods = require("../models/goods");
const Buyer = require("../models/buyer")
const Order = require("../models/order");

const formidable = require("formidable");
const md5 = require("md5");
const path = require('path');
const fs = require('fs');

exports.dobuyLogin = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let buyerphonenum = fields.buyerphonenum;
    let buyerpassword = fields.buyerpassword;
    let jiamihou = md5(md5(buyerpassword) + "binperson");
    Buyer.find({"buyerphonenum": buyerphonenum}, function (err, result) {
      if (err) {
        res.send("-1");
        return;
      }
      if (result.length === 0) {
        let mo = ["moren0.jpg", "moren1.jpg", "moren2.jpg", "moren3.jpg"];
        let more = mo[Math.floor(Math.random() * 3)];
        Buyer.create({
          "buyerphonenum": buyerphonenum,
          "buyerpassword": jiamihou,
          'avatar': more,
        }, function (err, result1) {
          if (err) {
            res.send("-1");
            return;
          }
          req.session.login = "1";
          req.session.buyerphonenum = buyerphonenum;
          res.send("1");
          return;
        });
      } else {
        if (jiamihou == result[0].buyerpassword) {
          req.session.login = "1";
          req.session.buyerphonenum = result[0].buyerphonenum;
          res.send('1');
          return
        } else {
          res.send("-2");
          return;
        }
      }

    })
  });
}

exports.doLogin = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let shopphonenum = fields.shopphonenum;
    let shoppassword = fields.shoppassword;
    let jiamihou = md5(md5(shoppassword) + "binperson");
    Shopowner.find({"shopphonenum": shopphonenum}, function (err, result) {
      if (err) {
        res.send("-1");
        return;
      }
      if (result.length === 0) {
        let mo = ["moren0.jpg", "moren1.jpg", "moren2.jpg", "moren3.jpg"];
        let more = mo[Math.floor(Math.random() * 3)];
        Shopowner.create({
          "shopphonenum": shopphonenum,
          "shoppassword": jiamihou,
          'avatar': more,
          'limit': '0',
          'deliveryTime': 120,
          'score': 0,
          'serviceScore': 0,
          'foodScore': 0,
          'rankRate': 0,
          'ratingCount': 0,
          'sellCount': 0,
          'see': 0
        }, function (err, result1) {
          if (err) {
            res.send("-1");
            return;
          }
          req.session.login = "1";
          req.session.shopphonenum = shopphonenum;
          res.send("1");
          return;
        });
      } else {
        if (jiamihou == result[0].shoppassword) {
          req.session.login = "1";
          req.session.shopphonenum = result[0].shopphonenum;
          res.send('1');
          return
        } else {
          res.send("-2");
          return;
        }
      }

    })
  });
}

exports.doSetshow = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + '/../upload/show');
  form.parse(req, function (err, fields, files) {

    var shopphonenum = req.session.shopphonenum;
    Shopowner.find({"shopphonenum": shopphonenum}, function (err, result) {
      if (err) {
        res.send("-1");
        return;
      }
      let rlength = result[0].pics.length;
      let oldpath = files.file.path;
      let newpath = path.normalize(__dirname + '/../upload/show') + '/' + shopphonenum + rlength + '.jpg';
      fs.rename(oldpath, newpath, function (err) {
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
        pics.push('/show/' + shopphonenum + rlength + '.jpg');
        Shopowner.update({"shopphonenum": shopphonenum}, {'pics': pics}, function (err, result1) {
          res.send('1');
          return;
        });
      });
    });
  })
}

exports.doCreateshop = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    console.log(fields);
    let arr = ['在线支付满28减5', '汽配无限活力全场8折起', '爱车精彩套餐', '该商家支持发票,请下单写好发票抬头', '已加入“汽配保”计划,性能安全保障'];
    let supports = [];
    let infos = [];
    fields.supports.forEach(function (item, index, array) {
      for (let i = 0; i < arr.length; i++) {
        if (item === arr[i]) {
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
    var shopphonenum = req.session.shopphonenum;
    Shopowner.update({"shopphonenum": shopphonenum}, {
      name: fields.name,
      desc: fields.desc,
      desctail: fields.desctail,
      isdelivery: fields.isdelivery,
      deliveryprice: fields.deliveryprice,
      minprice: fields.minprice,
      supports: supports,
      infos: infos,
      limit: '1'
    }, function (err, result) {
      res.send('1');
      return;
    });
  });
}

exports.doCreategoods = function (req, res, next) {
  let shopphonenum = req.session.shopphonenum;
  Goods.find({}, function (err, result) {
    if (err) {
      console.log(1);
      return
    }
    let goodsindex = 0;
    if (result.length > 0) {
      goodsindex = result[result.length - 1].goodsindex + 1;
    }
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(files);
      console.log(fields);
      fields.goodsindex = goodsindex;
      fields.image = type1[i].image;
      fields.shopowner = shopphonenum;
      Goods.create(fields, function (err, result1) {
        if (err) {
          res.send("-1");
          return;
        }
        console.log(result1);
        res.json({
          errno: 0,
          id: result1._id
        })
        return;
      });
    });
  });

}

exports.addPic = function (req, res, next) {
  let id = req.params.id;
  console.log(id);
  console.log('#####');
  let form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + '/../upload/goods');
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send("-1");
      return;
    }
    let oldpath = files.file.path;
    let newpath = path.normalize(__dirname + '/../upload/goods') + '/' + id + '.jpg';
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.send('失败');
        return;
      }

      let pics;

      pics = id + '.jpg';
      Goods.update({"_id": id}, {'image': pics}, function (err, result1) {
        res.send('1');
        return;
      });

    });
  })
}

exports.shop = function (req, res, next) {
  Shopowner.find({}, function (err, result) {
    let shops = [];
    for (let i = 0; i < result.length; i++) {
      let shop = {};
      shop.id = result[i]._id;
      shop.name = result[i].name;
      shop.shopphonenum = result[i].shopphonenum;
      shop.isdelivery = result[i].isdelivery;
      shop.description = result[i].desc;
      shop.deliveryTime = result[i].deliveryTime;//送达时间字段
      shop.score = result[i].score;
      shop.serviceScore = result[i].serviceScore;
      shop.foodScore = result[i].foodScore;
      shop.rankRate = result[i].rankRate;
      shop.minPrice = result[i].minprice;
      shop.deliveryPrice = result[i].deliveryprice;
      shop.ratingCount = result[i].rankRate;
      shop.sellCount = result[i].rankRate;
      shop.bulletin = result[i].desctail;
      let oldsupports = result[i].supports;
      let arr = ['在线支付满28减5', '汽配无限活力全场8折起', '爱车精彩套餐', '该商家支持发票,请下单写好发票抬头', '已加入“汽配保”计划,性能安全保障'];
      shop.supports = [];
      oldsupports.forEach(function (item, index, array) {
        let supports = {};
        supports.type = item;
        supports.description = arr[item];
        shop.supports.push(supports);
      });
      shop.avatar = result[i].avatar;
      shop.pics = result[i].pics;
      shop.infos = result[i].infos;
      shops.push(shop);
    }
    res.json({
      errno: 0,
      data: shops
    })

  });
}

exports.oshop = function (req, res, next) {
  let shopphonenum = req.session.shopphonenum;
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let id = fields.id;
    Shopowner.find({'shopphonenum': shopphonenum}, function (err, result) {
      if (err) {
        res.send('-2');
        return;
      }
      if (result.length === 0) {
        res.send("-1");
        return;
      }
      let shop = {};
      shop.shopphonenum = result[0].shopphonenum;
      shop.id = result[0]._id;
      shop.name = result[0].name;
      shop.isdelivery = result[0].isdelivery;
      shop.description = result[0].desc;
      shop.deliveryTime = result[0].deliveryTime;//送达时间字段
      shop.score = result[0].score;
      shop.serviceScore = result[0].serviceScore
      shop.foodScore = result[0].foodScore;
      shop.rankRate = result[0].rankRate;
      shop.minPrice = result[0].minprice;
      shop.deliveryPrice = result[0].deliveryprice;
      shop.ratingCount = result[0].ratingCount;
      shop.sellCount = result[0].sellCount;
      shop.bulletin = result[0].desctail;
      let oldsupports = result[0].supports;
      let arr = ['在线支付满28减5', '汽配无限活力全场8折起', '爱车精彩套餐', '该商家支持发票,请下单写好发票抬头', '已加入“汽配保”计划,性能安全保障'];
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
  });
}
exports.shopone = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let id = fields.id;
    Shopowner.find({'_id': id}, function (err, result) {
      if (err) {
        res.send('-2');
        return;
      }
      if (result.length === 0) {
        res.send("-1");
        return;
      }
      let shop = {};
      shop.shopphonenum = result[0].shopphonenum;
      shop.id = result[0]._id;
      shop.name = result[0].name;
      shop.isdelivery = result[0].isdelivery;
      shop.description = result[0].desc;
      shop.deliveryTime = result[0].deliveryTime;//送达时间字段
      shop.score = result[0].score;
      shop.serviceScore = result[0].serviceScore
      shop.foodScore = result[0].foodScore;
      shop.rankRate = result[0].rankRate;
      shop.minPrice = result[0].minprice;
      shop.deliveryPrice = result[0].deliveryprice;
      shop.ratingCount = result[0].ratingCount;
      shop.sellCount = result[0].sellCount;
      shop.bulletin = result[0].desctail;
      let oldsupports = result[0].supports;
      let arr = ['在线支付满28减5', '汽配无限活力全场8折起', '爱车精彩套餐', '该商家支持发票,请下单写好发票抬头', '已加入“汽配保”计划,性能安全保障'];
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
  });
}

exports.goods = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let shopphonenum = fields.shopphonenum;
    Goods.find({'shopowner': shopphonenum}, function (err, result) {
      let goods = [];
      let type1 = [];
      let type2 = [];
      let type3 = [];
      let type4 = [];
      let type5 = [];
      let good1 = {};
      good1.name = "热销榜";
      good1.type = 0;
      good1.foods = [];
      let good2 = {};
      good2.name = "最新单品";
      good2.type = 1;
      good2.foods = [];
      let good3 = {};
      good3.name = "爱车一族";
      good3.type = 2;
      good3.foods = [];
      let good4 = {};
      good4.name = "汽配DIY";
      good4.type = 3;
      good4.foods = [];
      let good5 = {};
      good5.name = "炫车一夏";
      good5.type = 4;
      good5.foods = [];
      for (let i = 0; i < result.length; i++) {
        let ogood = {};
        ogood = result[i];
        if (result[i].typename === "热销榜") {
          type1.push(ogood);
        }
        if (result[i].typename === "最新单品") {
          type2.push(ogood);

        }
        if (result[i].typename === "爱车一族") {
          type3.push(ogood);

        }
        if (result[i].typename === "汽配DIY") {
          type4.push(ogood);

        }
        if (result[i].typename === "炫车一夏") {
          type5.push(ogood);

        }

      }

      for (let i = 0; i < type1.length; i++) {
        let ofood = {};
        ofood.name = type1[i].name;
        ofood.price = type1[i].price;
        ofood.oldPrice = type1[i].oldPrice;
        ofood.description = type1[i].desc;
        ofood.sellCount = 0;
        ofood.rating = 0;
        ofood.info = type1[i].info;
        ofood.icon = type1[i].image;
        ofood.image = type1[i].image;
        ofood.ratings = [];
        good1.foods.push(ofood);
      }
      for (let i = 0; i < type2.length; i++) {
        let ofood = {};
        ofood.name = type2[i].name;
        ofood.price = type2[i].price;
        ofood.oldPrice = type2[i].oldPrice;
        ofood.description = type2[i].desc;
        ofood.sellCount = 0;
        ofood.rating = 0;
        ofood.info = type2[i].info;
        ofood.icon = type2[i].image;
        ofood.image = type2[i].image;
        ofood.ratings = [];
        good2.foods.push(ofood);
      }
      for (let i = 0; i < type3.length; i++) {
        let ofood = {};
        ofood.name = type3[i].name;
        ofood.price = type3[i].price;
        ofood.oldPrice = type3[i].oldPrice;
        ofood.description = type3[i].desc;
        ofood.sellCount = 0;
        ofood.rating = 0;
        ofood.info = type3[i].info;
        ofood.icon = type3[i].image;
        ofood.image = type3[i].image;
        ofood.ratings = [];
        good3.foods.push(ofood);
      }
      for (let i = 0; i < type4.length; i++) {
        let ofood = {};
        ofood.name = type4[i].name;
        ofood.price = type4[i].price;
        ofood.oldPrice = type4[i].oldPrice;
        ofood.description = type4[i].desc;
        ofood.sellCount = 0;
        ofood.rating = 0;
        ofood.info = type4[i].info;
        ofood.icon = type4[i].image;
        ofood.image = type4[i].image;
        ofood.ratings = [];
        good4.foods.push(ofood);
      }

      for (let i = 0; i < type5.length; i++) {
        let ofood = {};
        ofood.name = type5[i].name;
        ofood.price = type5[i].price;
        ofood.oldPrice = type5[i].oldPrice;
        ofood.description = type5[i].desc;
        ofood.sellCount = 0;
        ofood.rating = 0;
        ofood.info = type5[i].info;
        ofood.icon = type5[i].image;
        ofood.image = type5[i].image;
        ofood.ratings = [];
        good5.foods.push(ofood);
      }

      goods.push(good1);
      goods.push(good2);
      goods.push(good3);
      goods.push(good4);
      goods.push(good5);
      res.json({
        errno: 0,
        data: goods
      });

    });


  })
}

exports.ratings = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    Order.find({"shopid": fields.shopid}, function (err, result) {
      let ratings = [];
      for (let i = 0; i < result.length; i++) {
        let orating = {};
        orating.username = result[i].buyerphonenum;
        orating.score = (result[i].serviceScore + result[i].goodsScore)/2;
        orating.rateType = 0;
        orating.rateTime = result[i].commenttime;
        orating.deliveryTime = parseInt((result[i].commenttime - result[i].paytime)/60/1000);
        orating.text = result[i].comment
        orating.avatar = '/avatar/' + result[i].avatar;
        let recommend = [];
        orating.recommend = recommend;
        ratings.push(orating);
      }
      res.json({
        errno: 0,
        data: ratings
      });
    });
  });


}


exports.posts = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(fields);
    console.log(files)
  })
}

exports.limits = function (req, res, next) {
  if (req.session.shopphonenum === 'undefined') {
    res.send('-1');
    return;
  }
  Shopowner.find({"shopphonenum": req.session.shopphonenum}, function (err, result) {
    if (result.length === 0) {
      res.send('-1');
      return;
    }
    var bc = result[0].limit;
    res.send(bc);
  });
}

exports.doChangeinfo = function (req, res, next) {
  let shopphonenum = req.session.shopphonenum;
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(fields);
    console.log(fields.supports !== undefined);
    if (fields.supports !== undefined) {
      let arr = ['在线支付满28减5', '汽配无限活力全场8折起', '爱车精彩套餐', '该商家支持发票,请下单写好发票抬头', '已加入“汽配保”计划,性能安全保障'];
      let supports = [];
      fields.supports.forEach(function (item, index, array) {
        for (let i = 0; i < arr.length; i++) {
          if (item === arr[i]) {
            supports.push(i);
          }
        }
      });
      fields.supports = supports;
    }

    if (fields.infos !== undefined) {
      let infos = [];
      fields.infos.forEach(function (item, index, array) {
        console.log(item);
        infos.push(item.value);
      });
      fields.infos = infos;
    }

    Shopowner.find({"shopphonenum": shopphonenum}, function (err, result) {
      Shopowner.update({"shopphonenum": shopphonenum}, fields, function (err, result1) {
        res.send('1');
        return;
      });
    });
  });
}

exports.goodsinfo = function (req, res, next) {
  let shopphonenum = req.session.shopphonenum;
  Goods.find({'shopowner': shopphonenum}, function (err, result) {
    console.log(result);
    res.json({
      errno: 0,
      data: result
    })
  });
}

exports.deletegoods = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    Goods.remove(fields, function (err) {
      if (err) {
        console.log('删除失败');
        res.send('-1');
      }
      res.send('1');
    });
  });

}

exports.myself = function (req, res, next) {
  let buyerphonenum = req.session.buyerphonenum;
  Buyer.find({"buyerphonenum": buyerphonenum}, function (err, result) {
    if (result.length > 0) {
      res.json({
        errno: 0,
        name: result[0]._id,
        imglink: result[0].avatar
      })
      return;
    }
    res.send('1');
    return;
  });
}

exports.addorder = function (req, res, next) {
  let buyerphonenum = req.session.buyerphonenum;
  if (buyerphonenum === undefined) {
    res.send('-1');
    return;
  }
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    Buyer.find({"buyerphonenum": buyerphonenum}, function (err, result) {
      let avatar = result[0].avatar;
      let paytime = Date.now();
      Order.create({
        "paytime": paytime,
        "buyerphonenum": buyerphonenum,
        "shopid": fields.id,
        'info': fields.info,
        "totalPrice": fields.totalPrice,
        'avatar': avatar
      }, function (err, result1) {
        res.send('1');
        return;
      });
    });


  });
}

exports.getorder = function (req, res, next) {
  let buyerphonenum = req.session.buyerphonenum;
  if (buyerphonenum === undefined) {
    res.send('-1');
    return;
  } else {
    Order.find({"buyerphonenum": buyerphonenum}, function (err, result) {
      res.json({
        errno: 0,
        data: result
      });
    });
  }

}

exports.commit = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let time = Date.now();
    let serviceScore = fields.serviceScore;
    let goodsScore = fields.goodsScore;
    Order.update({"_id": fields._id}, {
      'serviceScore': serviceScore,
      'goodsScore': goodsScore,
      'comment': fields.comment,
      'commenttime': time
    }, function (err, result) {
      console.log(result);
      Order.find({"_id": fields._id}, function (err, result1) {
        let id = result1[0].shopid
        Order.find({"shopid": id}, function (err, result2) {
          let score = 0;
          let serviceScore = 0;
          let foodScore = 0;
          let sellCount = 0;
          let ratingCount = result2.length;
          for (let i = 0; i < result2.length; i++) {
            serviceScore = serviceScore + result2[i].serviceScore;
            foodScore = foodScore + result2[i].goodsScore;
          }
          serviceScore = serviceScore / result2.length;
          foodScore = foodScore / result2.length;
          score = (serviceScore + foodScore) / 2;
          Shopowner.find({"_id": id}, function (err, result3) {
            sellCount = result3[0].sellCount;

            sellCount++;
            Shopowner.update({"_id": id},
              {
                'score': score,
                'serviceScore': serviceScore,
                'foodScore': foodScore,
                'sellCount': sellCount,
                'ratingCount': ratingCount
              }, function (err, result4) {
                res.send('1');
                return;
              });
          });
        })
      });


    });
  });
}

exports.orderTable = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let shopphonenum = req.session.shopphonenum;
    Shopowner.find({'shopphonenum': shopphonenum}, function (err, result) {
      if (result.length > 0) {
        let id = result[0]._id;
        Order.find({'shopid': id}, function (err, result1) {
          res.json({
            errno: 0,
            data: result1
          });
        })
      } else {
        res.send('-1');
        return;
      }

    })
  });
}


