<template>
  <div class="find">
    <header class="header">
      <h1>我的订单</h1>
    </header>
    <div class="field" v-for="item in infos" v-show="login">
      <div class="field-content">
        <span class="info">{{item.info}}</span>
        <router-link :to="'/home/find/comment/'+item._id">
          <span class="evaluate">评价<i class="el-icon-arrow-right"></i></span>
        </router-link>
      </div>
      <div class="message" v-show="infos.length === 0">暂无订单</div>
    </div>

    <div class="message" v-show="!login">未登陆</div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        infos: [],
        login: false
    };
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$http.get('/getorder').then(response => {
        response = response.body;
        console.log(response);
        if (response === '-1') {
            return;
        }
        if (response.errno === 0) {
          this.infos = response.data;
          this.login = true;
        }
      }, response => {
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .find
    .header
      display: flex
      height: 44px
      align-items: center
      justify-content: center
      background-color: #f197a3
      color: #ffffff
    .field
      border-bottom: 1px solid #ddd
      display: block
      position: relative
      margin-top: 15px
      border-top: 1px solid #ddd
      background-color: #ffffff
      &:first-child
        margin-top: 0px
      .field-content
        height: 44px
        line-height: 44px
        padding: 0 15px
        font-size: 14px
        .info
          float: left
          color: #7e8c8d
          font-size: 12px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          max-width: 120px
        .evaluate
          float: right
          color: #7e8c8d
          font-size: 12px
    .message
      color: #d4d8d8
      padding-top: 20px
      text-align: center
      font-size: 12px
</style>
