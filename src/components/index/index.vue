<template>
  <div class="index">
    <header class="header">
      <div class="header-logo">
        <img src="./home_logo.png" alt="" width="60" height="60">
        <form action="" class="search-form">
          <input v-model="info" @keyup.enter="search" type="text" placeholder="搜索商家、商品" class="home-search">
        </form>
      </div>

    </header>
    <slider width="100%"
            height="140px"
            animation="fade"
            :interval="1000"
            :speed="1000"
            :indicators="false"
            :control-btn="false">
      <slider-item>
        <div class="content content-one"></div>
      </slider-item>
      <slider-item>
        <div class="content content-two"></div>
      </slider-item>
      <slider-item>
        <div class="content content-three"></div>
      </slider-item>
    </slider>
    <h3 class="home-title border-1px">全部商家</h3>
    <section class="shoplist">
      <router-link v-show="item.state === 2" v-for="item in sellers" :to="'/shop/'+item.id">
        <section class="shop-container border-1px">
          <div class="logo-container">
            <div class="logo-main">
              <img width="60" height="60" :src="'/avatar/'+item.avatar" alt="">
            </div>
          </div>
          <div class="shop-main">

            <div class="shop-line">
              <div class="shopname">{{item.name}}</div>
            </div>
            <div class="shop-line">
              <div class="rate-wrapper">
                <star :size="24" :score="item.score"></star>
                <span class="shop-rate">{{item.score}}</span>
              </div>
            </div>
            <div class="shop-line">
              <div class="shop-moneylimit">
                <span>¥{{item.minPrice}}元起送/配送费￥{{item.deliveryPrice}}元</span>
              </div>
              <div class="shop-timedistance">
                <div class="shop-time">
                  <span>{{item.deliveryTime}}分钟</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </router-link>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Slider, SliderItem} from 'vue-easy-slider';
  import star from '@/components/star/star';

  export default {
    data() {
      return {
        info: ''
      };
    },
    props: {
      sellers: {
        type: Array
      }
    },
    methods: {
      search() {
        this.$http.post('/search', {'name': this.info}).then(response => {
          response = response.body;
          console.log(response);
          if (response !== '0') {
            let link = '/shop/' + response;
            this.$router.push(link);
          }
        }, response => {
        });
      }
    },
    components: {
      Slider,
      SliderItem,
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .index
    .header
      background-color: #f197a3
      padding: 2px 10px
      .header-logo
        display: flex
        .search-form
          width: 100%
          padding: 0 2px 0 10px
          .home-search
            display: block
            margin: 13px 0
            width: 100%
            height: 34px
            text-align: center
            border-radius: 34px
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .2)
            color: #333
            font-size: 12px
            &:focus
              outline: none
    .slider
      .content
        width: 100%
        height: 100%
        &.content-one
          background: url("./sliderone.jpg")
          background-size: 100%
        &.content-two
          background: url("./slidertwo.jpg")
          background-size: 100%
        &.content-three
          background: url("./sliderthree.jpg")
          background-size: 100%
    .home-title
      margin-top: 10px
      line-height: 34px
      font-weight: 600
      border-top: 1px solid #eee
      font-size: 16px
      padding-left: 15px
      background-color: #ffffff
      border-1px(rgba(7, 17, 27, 0.1))
    .shoplist
      font-size: 12px
      background-color: #ffffff
      .shop-container
        display: flex
        border-1px(rgba(7, 17, 27, 0.1))
        .logo-container
          padding: 15px 10px
        .shop-main
          position: relative
          padding: 15px 10px 15px 0
          width: 100%
          .shop-line
            display: flex
            align-items: center
            .shopname
              font-size: 16px
              color: #333333
            .rate-wrapper
              display: flex
            &:nth-child(2)
              margin-top: 8px
              line-height: 14px
              .shop-rate
                margin: 0 4px
                color: #ff6000
            &:nth-child(3)
              margin-top: 10px
              line-height: 12px
              .shop-moneylimit
                color: #666
              .shop-timedistance
                .shop-time
                  color: #f7848d
                  position: absolute;
                  bottom: 15px
                  right: 10px
</style>
