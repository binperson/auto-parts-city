<template>
  <div class="login">
    <header class="header border-1px">
      <div class="header-wrapper">
        <div class="header-left" @click="goback">
          <i class="el-icon-arrow-left"></i>
        </div>
        <h1 class="header-center">登录</h1>
      </div>

    </header>
    <split></split>
    <div class="content">
      <form class="login-form">
        <section class="login-wraper">
          <input v-model="buyerphonenum" type="text" placeholder="手机号">
        </section>
        <section class="login-wraper">
          <input v-model="buyerpassword" type="password" placeholder="密码">
        </section>
      </form>

      <section class="message-login">
        温馨提示：未注册帐号的手机号，登录时将自动注册，且代表您已同意
      </section>
      <button class="SubmitButton" @click="doLogin">登录</button>
      <div class="message">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '@/components/split/split';

  export default {
    data() {
      return {
        buyerphonenum: '',
        buyerpassword: '',
        message: ''
      };
    },
    methods: {
      doLogin() {
        this.$http.post('/dobuylogin', {
          buyerphonenum: this.buyerphonenum,
          buyerpassword: this.buyerpassword
        }).then(response => {
          if (response.body === '1') {
            this.$router.push('/home/index');
          } else {
            this.message = '密码错误';
          }
        }, response => {

        });
      },
      goback() {
        history.go(-1);
      }
    },
    components: {
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .login
    position: fixed
    top: 0
    right: 0
    left: 0
    bottom: 0
    z-index: 100000
    background-color: #f4f4f4
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


    .content
      .login-form
        .login-wraper
          display: flex
          align-items: center
          justify-content: space-between
          padding: 0 16px
          height: 44px
          border-bottom: 1px solid #ddd
          background: #fff
          font-size: 14px
          input
            flex-grow: 1
            padding: 5px 0
            height: 20px
            color: #333
            line-height: 20px
            border: 0
            &:focus
              outline:none
    .message
      color: #e69294
      margin: 0 auto
      padding: 2px 0
      width: 345px
      height: 16px
      text-align: right
    .message-login
      margin: 9px auto
      width: 345px
      color: #999
      font-size: 12px
      line-height: 16px
    .SubmitButton
      display: block
      margin: 0 auto
      padding: 0
      width: 345px
      height: 44px
      border-radius: 3px
      background: #e68693
      color: #fff
      text-align: center
      font-size: 16px
      line-height: 44px
      border: 0
      &:focus
        outline:none

</style>
