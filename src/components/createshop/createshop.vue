<template>
  <div class="createshop">
    <h2 class="h">创建商铺</h2>
    <p class="desc">包括各种信息，比如店铺名称、描述、最小配送费、卖家秀、地址等。</p>
    <div class="form-box">
      <div class="form-content">
        <el-form :model="shopForm" :rules="rules" ref="shopForm" label-width="100px" class="demo-shopForm">
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="shopForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="shopForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="详细描述" prop="desctail">
            <el-input type="textarea" v-model="shopForm.desctail"></el-input>
          </el-form-item>
          <el-form-item label="即时配送" prop="isdelivery">
            <el-switch on-text="" off-text="" v-model="shopForm.isdelivery"></el-switch>
          </el-form-item>
          <el-form-item
            label="配送费"
            prop="deliveryprice"
            :rules="[
                      { required: true, message: '配送费不能为空'},
                      { type: 'number', message: '配送费必须为数字值'}
                    ]"
            >
            <el-input v-model.number="shopForm.deliveryprice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="配送价格"
            prop="minprice"
            :rules="[
                      { required: true, message: '配送价格不能为空'},
                      { type: 'number', message: '配送价格必须为数字值'}
                    ]"
            >
            <el-input v-model.number="shopForm.minprice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动支持" prop="supports">
            <el-checkbox-group v-model="shopForm.supports">
              <el-checkbox label="在线支付满28减5" name="supports"></el-checkbox>
              <el-checkbox label="汽配无限活力全场8折起" name="supports"></el-checkbox>
              <el-checkbox label="爱车精彩套餐" name="supports"></el-checkbox>
              <el-checkbox label="该商家支持发票,请下单写好发票抬头" name="supports"></el-checkbox>
              <el-checkbox label="已加入“汽配保”计划,性能安全保障" name="supports"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item class="limit"
            v-for="(info, index) in shopForm.infos"
            :label="'更多信息' + index"
            :key="info.key"
            :prop="'infos.' + index + '.value'"
            :rules="{
      required: true, message: '店铺信息不能为空', trigger: 'blur'
    }"
          >
            <el-input v-model="info.value"></el-input>
            <el-button @click.prevent="removeInfo(info)">删除</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('shopForm')">立即创建</el-button>
            <el-button @click="addInfo">新增店铺信息</el-button>
            <el-button @click="resetForm('shopForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        shopForm: {
          name: '',
          desc: '',
          desctail: '',
          isdelivery: false,
          deliveryprice: '',
          minprice: '',
          supports: [],
          infos: [{
            value: ''
          }]
        },
        rules: {
          name: [
            {required: true, message: '请输入店铺名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入描述', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          desctail: [
            {required: true, message: '请输入详细描述', trigger: 'blur'}
          ],
          deliveryprice: [
            {required: true, message: '请输入配送费', trigger: 'blur'},
            {type: 'number', min: 1, max: 2, message: '长度在 1 到 2 个数字', trigger: 'blur'}
          ],
          minprice: [
            {required: true, message: '请输入起送价格', trigger: 'blur'},
            {type: 'number', min: 1, max: 2, message: '长度在 1 到 2 个数字', trigger: 'blur'}
          ],
          supports: [
            {type: 'array', required: true, message: '请至少选择一个活动支持', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/docreateshop', this.shopForm).then(response => {
              console.log(response.body);
              if (response.body === '1') {
                this.success();
                this.$router.push('/manager/index/show');
              } else {
                this.message = '密码错误';
              }
            }, response => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      success() {
        this.$message({
          message: '恭喜你，创建成功！',
          type: 'success'
        });
      },

      removeInfo(item) {
        var index = this.shopForm.infos.indexOf(item);
        if (index !== -1) {
          this.shopForm.infos.splice(index, 1);
        }
      },
      addInfo() {
        this.shopForm.infos.push({
          value: '',
          key: Date.now()
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .createshop
    .limit
      .el-input
        width: 270px
</style>
