import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home/home';
import index from '@/components/index/index';
import find from '@/components/find/find';
import me from '@/components/me/me';
import shop from '@/components/shop/shop';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';
import manager from '@/components/manager/manager';
import mlogin from '@/components/mlogin/mlogin';
import mindex from '@/components/mindex/mindex';
import createshop from '@/components/createshop/createshop';
import sellershow from '@/components/sellershow/sellershow';
import creategoods from '@/components/creategoods/creategoods';
import shopinfo from '@/components/shopinfo/shopinfo';
import goodsinfo from '@/components/goodsinfo/goodsinfo';
import login from '@/components/login/login';
import comment from '@/components/comment/comment';
import order from '@/components/order/order';
import sellmanager from '@/components/sellmanager/sellmanager';
import checkseller from '@/components/checkseller/checkseller';
import addinformation from '@/components/addinformation/addinformation';

Vue.use(Router);

export default new Router({
  history: true,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: 'index',
        name: 'index',
        component: index
      }, {
        path: 'find',
        name: 'find',
        component: find,
        children: [{
          path: 'comment/:id',
          name: 'comment',
          component: comment
        }]
      }, {
        path: 'me',
        name: 'me',
        component: me
      }, {
        path: 'login',
        name: 'login',
        component: login
      }]
    },
    {
      path: '/shop/:id',
      name: 'shop',
      component: shop,
      children: [{
        path: 'goods',
        name: 'goods',
        component: goods
      },
        {
          path: 'ratings',
          name: 'ratings',
          component: ratings
        },
        {
          path: 'seller',
          name: 'seller',
          component: seller
        }
      ]
    },
    {
      path: '/manager',
      name: 'manager',
      component: manager,
      children: [{
        path: 'login',
        name: 'login',
        component: mlogin
      },
        {
          path: 'index',
          name: 'index',
          component: mindex,
          children: [{
            path: 'createshop',
            name: 'createshop',
            component: createshop
          },
            {
              path: 'show',
              name: 'show',
              component: sellershow
            },
            {
              path: 'creategoods',
              name: 'creategoods',
              component: creategoods
            }, {
              path: 'shopinfo',
              name: 'shopinfo',
              component: shopinfo
            }, {
              path: 'goodinfo',
              name: 'goodinfo',
              component: goodsinfo
            }, {
              path: 'order',
              name: 'order',
              component: order
            }, {
              path: 'sellmanager',
              name: 'sellmanager',
              component: sellmanager
            }, {
              path: 'checkseller',
              name: 'checkseller',
              component: checkseller
            }, {
              path: 'addinformation',
              name: 'addinformation',
              component: addinformation
            }]
        }]
    }
  ],
  linkActiveClass: 'active'
});
