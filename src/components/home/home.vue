<template>
  <div class="home">

    <keep-alive>
      <router-view :sellers="sellers"></router-view>
    </keep-alive>
    <div class="footer">
      <div class="footer-wrapper border-1px-before">
        <router-link to="/home/index" class="footer-item" href="">
          <i class="icon icon-home"></i>
          <span class="footer-index">首页</span>
        </router-link>
        <router-link to="/home/find" class="footer-item" href="">
          <i class="icon icon-find"></i>
          <span class="footer-index">订单</span>
        </router-link>
        <router-link to="/home/me" class="footer-item" href="">
          <i class="icon icon-me"></i>
          <span class="footer-index">我的</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
    data() {
      return {
        sellers: []
      };
    },
    created() {
      this.$http.get('/shop').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          console.log(response.data);
          this.sellers = response.data;
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home
    .footer
      position: fixed
      left: 0
      right: 0
      bottom: 0
      z-index: 9999
      .footer-wrapper
        display: flex
        box-sizing: border-box
        padding-top: 6px
        background-color: #fff
        height: 45px
        box-shadow: 0 2px 2px rgba(0,0,0,.1)
        border-1px-before(rgba(7, 17, 27, 0.1))
        .footer-item
          flex: 1
          display: block
          text-align: center
          &.active
            color: #f197a3
          .icon
            display: inline-block
            width: 20px
            height: 20px
            font-size: 20px
          .footer-index
            display: block
            font-size: 12px
            line-height: 14px

</style>
