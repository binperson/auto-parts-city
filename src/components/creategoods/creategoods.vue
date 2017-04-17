<template>
  <div class="creategoods">
    <h2 class="h">创建商品</h2>
    <p class="desc">包括各种信息，比如汽车配件类别、名称、描述</p>
    <div class="form-box">
      <div class="form-content">
        <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" class="demo-goodsForm">
          <el-form-item label="产品分类" prop="typename">
            <el-radio-group v-model="goodsForm.typename">
              <el-radio label="热销榜"></el-radio>
              <el-radio label="最新单品"></el-radio>
              <el-radio label="爱车一族"></el-radio>
              <el-radio label="汽配DIY"></el-radio>
              <el-radio label="炫车一夏"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="goodsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="goodsForm.desc"></el-input>
          </el-form-item>

          <el-form-item
            label="现价"
            prop="price"
            :rules="[
                      { required: true, message: '现价不能为空'},
                      { type: 'number', message: '现价必须为数字值'}
                    ]"
          >
            <el-input v-model.number="goodsForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="原价"
            prop="oldPrice"
            :rules="[
                      { required: true, message: '原价不能为空，没有填零'},
                      { type: 'number', message: '原价必须为数字值'}
                    ]"
          >
            <el-input v-model.number="goodsForm.oldPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="更多信息" prop="info">
            <el-input type="textarea" v-model="goodsForm.info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('goodsForm')">立即创建</el-button>
            <el-button @click="resetForm('goodsForm')">重置</el-button>
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
        goodsForm: {
          typename: '',
          name: '',
          desc: '',
          price: '',
          oldPrice: '',
          info: ''
        },
        rules: {
          typename: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          name: [
            {required: true, message: '请输入产品名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入描述', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入现价', trigger: 'blur'},
            {type: 'number', min: 1, max: 5, message: '长度在 1 到 5 个数字', trigger: 'blur'}
          ],
          oldPrice: [
            {required: true, message: '请输入起送价格', trigger: 'blur'},
            {type: 'number', min: 1, max: 5, message: '长度在 1 到 5 个数字', trigger: 'blur'}
          ],
          info: [
            {required: true, message: '请至少有一段描述', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/docreategoods', this.goodsForm).then(response => {
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
