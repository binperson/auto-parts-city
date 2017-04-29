<template>
  <div class="comment">
    <header class="header border-1px">
      <div class="header-wrapper">
        <div class="header-left" @click="goback">
          <i class="el-icon-arrow-left"></i>
        </div>
        <h1 class="header-center">评价</h1>
      </div>
    </header>
    <div class="field">
      <div class="evalu-value">
        <div class="label">服务态度:</div>
        <el-rate v-model="value1"></el-rate>
      </div>
      <div class="evalu-value">
        <div class="label">商品评分:</div>
        <el-rate v-model="value2"></el-rate>
      </div>
    </div>
    <div class="comment-field">
      <textarea v-model="comment" class="comment-input" placeholder="亲，产品的质量如何，商家的服务是否周到?" data-max="140" maxlength="140"></textarea>
    </div>
    <div class="console-field">
      <button class="btn-commit" @click="commit">
        提交评价
      </button>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
      data() {
          return {
              value1: null,
              value2: null,
              id: '',
              comment: ''
          };
      },
      created() {
        let id = this.$route.params.id;
        this.id = id;
      },
      methods: {
        goback() {
          history.go(-1);
        },
        commit() {
          this.$http.post('/commit', {'_id': this.id, 'serviceScore': this.value1, 'goodsScore': this.value2, 'comment': this.comment}).then(response => {
            response = response.body;
            console.log(response);
            if (response === '1') {
              this.$router.push('/home/index');
            }
          }, response => {
          });
        }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .comment
    position: fixed
    top: 0
    right: 0
    left: 0
    bottom: 0
    background-color: #efefef
    z-index: 10000
    .header
      position: relative
      display: flex
      height: 44px
      align-items: center
      justify-content: space-between
      width: 100%
      background-color: #f197a3
      color: #ffffff
      border-1px(rgba(255, 255, 255, 0.1))
      .header-wrapper
        position: fixed
        top: 0
        left: 0
        display: flex
        align-items: center
        justify-content: space-between
        width: 100%
        height: 44px;
        .header-left
          display: flex
          align-items: center
          justify-content: space-between
          height: 44px
          width: 44px
          margin-left: 6px;
        .header-center
          position: absolute
          top: 0
          left: 50%
          height: 44px
          max-width: 50%
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          font-weight: 700
          font-size: 1em
          line-height: 44px
          transform: translateX(-50%)
    .field
      padding: 11px 15px 9px
      border-bottom: 1px solid #ddd
      background-color: #fff
      .evalu-value
        height: 20px
        line-height: 20px
        margin: 8px
        .label
          display: inline-block
          position: relative
          top: 3px
          padding: 0 5px
        .el-rate
          display: inline-block
    .comment-field
      padding-top: 15px
      .comment-input
        width: 100%
        height: 88px
        border: none
        border-top: 1px solid #ddd
        border-bottom: 1px solid #ddd
        font-size: 15px
        padding: 10px
        outline: none
        box-sizing: border-box

    .console-field
      height: 44px;
      text-align: center
      position: fixed
      width: 100%
      bottom: 0
      background-color: #fff
      .btn-commit
        width: 100%
        height: 44px
        line-height: 44px
        font-size: 16px
        color: #fff
        background-color: #f197a3
        border: 0
        outline: none

</style>
