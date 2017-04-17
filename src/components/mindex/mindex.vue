<template>
  <div class="mindex">
    <div class="headerWrapper">
      <div class="header">
        <div class="container">
          <div class="avatar-wrapper">
            <a href="">
              <img class="avatar"
                   src="/avatar/moren0.jpg" height="44"
                   width="44" alt="">
            </a>
          </div>
          <div class="nav">
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">处理中心</el-menu-item>
              <el-menu-item index="2"><a>订单管理</a></el-menu-item>
            </el-menu>
          </div>
        </div>
      </div>
    </div>
    <div class="main-cnt">
      <div class="page-container">
        <el-row class="tac">
          <el-col :span="4">
            <el-menu default-active="2" @open="handleOpen" @close="handleClose">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-setting"></i>店铺信息</template>
                <el-menu-item-group>
                  <template slot="title">店铺管理</template>
                  <router-link to="/manager/index/show">
                    <el-menu-item index="1-3">卖家秀</el-menu-item>
                  </router-link>
                  <el-menu-item index="1-1">店铺信息</el-menu-item>
                  <el-menu-item index="1-2">修改信息</el-menu-item>

                </el-menu-item-group>
                <el-menu-item-group title="店铺管理">
                  <router-link to="/manager/index/createshop">
                    <el-menu-item index="1-4">创建商铺</el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-search"></i>商品信息</template>
                <el-menu-item-group>
                  <template slot="title">商品管理</template>
                  <el-menu-item index="2-1">商品信息</el-menu-item>
                  <router-link to="/manager/index/creategoods">
                    <el-menu-item index="2-2">添加商品</el-menu-item>
                  </router-link>
                  <el-menu-item index="2-3">修改信息</el-menu-item>
                  <el-menu-item index="2-4">删除商品</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3"><i class="el-icon-document"></i>处理订单</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="20">
            <keep-alive>
              <router-view keep-alive></router-view>
            </keep-alive>
          </el-col>
        </el-row>

      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mindex
    height: 100%
    background: #ffffff
    .header
      height: 60px
      line-height: 60px
      background: rgb(32, 160, 255)
      padding: 0 120px
      .el-menu
        background-color: #20a0ff
        .el-menu-item
          color: #e8e5e5
          &:hover
            background-color: #20a0ff
            color: #ffffff
          &.is-active
            font-weight: 700
            color: #ffffff
            border-bottom: 5px #99d2fc solid
      .container
        .avatar-wrapper
          float: left
          height: 60px
          padding: 8px
          .avatar
            border-radius: 50%
        .nav
          float: right
    .main-cnt
      margin-top: -80px
      padding: 80px 0 120px
      box-sizing: border-box
      min-height: 100%
      .page-container
        width: 1140px
        box-sizing: border-box
        padding: 10px 30px
        margin: 0 auto
        .tac
          padding-top: 15px
          .el-submenu__title
            font-size: 12px
          .el-menu-item-group__title
            font-size: 12px
          .el-menu-item
            font-size: 12px
          .el-menu
            background-color: #ffffff
            padding-right: 20px
            .el-menu-item
              &:hover
                background-color: #ffffff

            .el-submenu__title
              &:hover
                background-color: #ffffff



          .h,.desc
            padding-left: 11px
          .h
            height: 56px
            line-height: 56px
            box-sizing: border-box
          .desc
            font-size: 12px
            color: #5e6d82
            margin: 16px 0
          .form-box
            border: 1px solid #eaeefb
            border-radius: 4px
            .form-content
              padding: 34px 24px
              .el-form
                width: 440px

</style>
