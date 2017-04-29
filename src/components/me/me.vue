<template>
  <div class="me">
    <header class="header border-1px">
      <h1>我的</h1>
    </header>
    <section>
      <div class="profile-wrapper">
        <span v-show="!show" class="icon-head"></span>
        <img v-show="show" :src="'/avatar/'+imglink" class="icon-head" alt="">
        <div class="profile-login">
          <h3 v-show="!show">登陆／注册</h3>
          <h3 class="buyname" v-show="show">{{name}}</h3>
        </div>
        <router-link to="/home/login">
          <span class="icon-keyboard_arrow_right"></span>
        </router-link>
      </div>
    </section>
    <section class="info-data border-1px">
      <a class="info-data-link">
        <span class="info-data-top icon-balance"></span>
        <span class="info-data-bottom">余额</span>
      </a>
      <a class="info-data-link">
        <span class="info-data-top icon-favorable"></span>
        <span class="info-data-bottom">优惠</span>
      </a>
      <a class="info-data-link">
        <span class="info-data-top icon-integral"></span>
        <span class="info-data-bottom">积分</span>
      </a>
    </section>
    <div class="profile-more">
      <div class="index-item">
        <aside class="index-icon">
          <span class="icon-integral"></span>
        </aside>
        <div class="index-main">
           我的订单
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="index-item">
        <aside class="index-icon">
          <span class="icon-integral"></span>
        </aside>
        <div class="index-main">
           积分商城
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '@/components/split/split';

  export default {
      data() {
         return {
           imglink: '',
           name: '',
           show: false
         };
      },
    components: {
      split
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.$http.get('/myself').then(response => {
          response = response.body;
          console.log(response);
          if (response.errno === 0) {
            this.imglink = response.imglink;
            this.name = response.name;
            this.show = true;
          }
        }, response => {
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .me
    .header
      display: flex
      height: 44px
      align-items: center
      justify-content: center
      background-color: #f197a3
      color: #ffffff
      border-1px(rgba(255, 255, 255, 0.1))
    .profile-wrapper
      position: relative
      display: flex
      background: #f197a3
      padding: 25px 15px
      color: #ffffff
      .icon-head
        display: inline-block
        height: 60px
        width: 60px
        line-height: 60px
        border-radius: 50%
        background: rgba(255, 255, 255, 0.1)
        font-size: 60px
        color: #e6e6e6
      .profile-login
        display: flex
        height: 20px
        padding: 20px
        font-size: 20px
        align-items: center
        justify-content: center
        .buyname
          max-width: 240px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
      .icon-keyboard_arrow_right
        position: absolute
        right: 15px
        bottom: 25px
        line-height: 60px
        color: #fff
    .info-data
      display: table
      width: 100%
      height: 83px
      background-color: #fff
      border-1px(rgba(221, 221, 221, 1))
      .info-data-link
        display: table-cell
        box-sizing: border-box
        width: 33.3333%
        vertical-align: middle
        text-align: center
        border-right: 1px solid #ddd
        &:last-child
          border-right: none
        .info-data-top, .info-data-bottom
          display: block
        .info-data-top
          font-size: 26px
          &.icon-balance
            color: rgb(255, 153, 0)
          &.icon-favorable
            color: rgb(255, 95, 62)
          &.icon-integral
            color: rgb(106, 194, 11)
        .info-data-bottom
          margin-top: 5px
          font-size: 10px
          line-height: 14px
          font-weight: 500
          color: #666
    .profile-more
      margin-top: 10px
      border-1px-before(rgba(255, 255, 255, 0.1))
      border-1px(rgba(160, 160, 160, 0.1))
      background-color: #ffffff
      color: #696767
      font-size: 18px
      line-height: 18px
      .index-item
        display: flex
        align-items: center
        padding-left: 25px
        &:not(:last-child)
          .index-main
            border-1px(rgba(80, 80, 80, 0.1))
        .index-icon
          margin-left: -10px;
          margin-right: 10px;
          color: rgb(106, 194, 11)
        .index-main
          display: flex
          justify-content: space-between
          width: 100%
          padding: 13px 10px 13px 0



</style>
