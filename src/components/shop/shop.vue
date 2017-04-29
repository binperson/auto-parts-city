<template>
  <div class="shop">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/shop/all/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/shop/all/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/shop/all/seller">商家</router-link></div>
    </div>
    <keep-alive>
      <router-view :id="id" :num="num" :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/header/header';
  import {urlParse} from '@/common/js/util';

  const ERR_OK = 0;

  export default {
    name: 'app',
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        },
        num: '',
        id: ''
      };
    },
    created() {
      let id = this.$route.params.id;
      this.id = id;
      this.$http.post('/shopone', {'id': id}).then((response) => {
        response = response.body;
        console.log(response);
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
          this.num = this.seller.shopphonenum;
        } else if (response === '-1') {
            this.seller = {};
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)

</style>
