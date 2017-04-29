<template>
  <div class="mlogin">
    <div class="mask"></div>
    <div class="login_con">
      <div class="login_box">
        <div class="top"></div>
        <div class="center">
          <span class="input_name">账&nbsp;&nbsp;&nbsp;&nbsp;户</span>
          <input v-model="shopphonenum" type="text" placeholder="手机号码" class="input_text">
          <span class="input_name">密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
          <input v-model="shoppassword" type="password" placeholder="请填写密码" class="input_text">
          <div class="message">
            {{message}}
          </div>
          <input @click="doLogin" type="submit" class="login_btn" value="登陆">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      data() {
          return {
              shopphonenum: '',
              shoppassword: '',
              message: ''
          };
      },
      methods: {
          doLogin() {
            this.$http.post('/dologin', {
                shopphonenum: this.shopphonenum,
                shoppassword: this.shoppassword
            }).then(response => {
                if (response.body === '1') {
                  this.$router.push('/manager/index');
                } else {
                  this.message = '密码错误';
                }
            }, response => {

            });
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mlogin
    .mask
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgb(229, 233, 244)
    .login_con
      position: relative
      overflow: hidden
      width: 1000px
      margin: 0 auto
      padding-top: 30px
      background:url("./echepei_user_center_login_bg.png") left top no-repeat;
      .login_box
        float: right
        width: 346px
        margin: 40px 0 100px 0
        .top
          width: 100%
          height: 117px
          background: url("./echepei_user_center_login_01.png")
        .center
          position: relative
          padding: 0 30px 30px 30px
          background: url("./echepei_user_center_login_02.png")
          .input_name
            display: block
            padding: 30px 0 10px 0
            font-size: 14px
            color: #7c7691
          .input_text
            display: block
            width: 284px
            height: 16px
            padding: 10px 0
            color: #888
            border: 1px solid #c9c8cb
            background: #fff
            text-indent: 1em
            border-radius: 2px
          .message
            width: 100px
            height: 16px
            padding: 6px 16px
            color: rgba(212, 15, 33, 0.7)
          .login_btn
            clear: both
            display: block
            width: 100%
            height: 42px
            line-height: 42px
            margin: 30px 0 0 0
            background: #8d6ca3
            color: #fff
            font-size: 15px
            text-align: center
            border-radius: 4px
</style>
