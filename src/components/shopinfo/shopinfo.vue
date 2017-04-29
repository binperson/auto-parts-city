<template>
  <div class="shopinfo">
    <h2 class="h">店铺信息</h2>
    <p class="desc">更改店铺，比如店铺名称、描述、活动等。</p>
    <div class="form-box">
      <div class="form-content">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="属性"
            width="240">
            <template scope="scope">
              <el-icon info="el-icon-information"></el-icon>
              <span style="margin-left: 10px">{{ scope.row.property }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="信息"
            width="360">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>信息: {{ scope.row.info }}</p>
                <div slot="reference" class="info-wrapper">
                  <el-tag>{{ scope.row.info }}</el-tag>
                </div>
              </el-popover>

            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="编辑" v-model="dialogFormVisible0">
    <el-form :model="form" :rules="rules" ref="form0">
      <el-form-item label="店铺名称：" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible0 = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form0',0)">确 定</el-button>
    </div>
  </el-dialog>
    <el-dialog title="编辑" v-model="dialogFormVisible1">
      <el-form :model="form" :rules="rules" ref="form1">
        <el-form-item label="描述：" :label-width="formLabelWidth">
          <el-input v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form1',1)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" v-model="dialogFormVisible2">
      <el-form :model="form" :rules="rules" ref="form2">
        <el-form-item label="详细描述" prop="desctail">
          <el-input type="textarea" v-model="form.desctail"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form2',2)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" v-model="dialogFormVisible3">
    <el-form :model="form" :rules="rules" ref="form3">
      <el-form-item label="即时配送" prop="isdelivery">
        <el-switch on-text="" off-text="" v-model="form.isdelivery"></el-switch>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible3 = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form3',3)">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="编辑" v-model="dialogFormVisible4">
    <el-form :model="form" :rules="rules" ref="form4">
      <el-form-item
        label="配送费"
        :rules="[
                      { required: true, message: '配送费不能为空'},
                      { type: 'number', message: '配送费必须为数字值'}
                    ]"
      >
        <el-input v-model.number="form.deliveryprice" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible4 = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form4',4)">确 定</el-button>
    </div>
  </el-dialog>

    <el-dialog title="编辑" v-model="dialogFormVisible5">
      <el-form :model="form" :rules="rules" ref="form5">
        <el-form-item
          label="配送价格"
          prop="minprice"
          :rules="[
                      { required: true, message: '配送价格不能为空'},
                      { type: 'number', message: '配送价格必须为数字值'}
                    ]"
        >
          <el-input v-model.number="form.minprice" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form5',5)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" v-model="dialogFormVisible6">
      <el-form :model="form" :rules="rules" ref="form6">
        <el-form-item label="活动支持" prop="supports">
          <el-checkbox-group v-model="form.supports">
            <el-checkbox label="在线支付满28减5" name="supports"></el-checkbox>
            <el-checkbox label="汽配无限活力全场8折起" name="supports"></el-checkbox>
            <el-checkbox label="爱车精彩套餐" name="supports"></el-checkbox>
            <el-checkbox label="该商家支持发票,请下单写好发票抬头" name="supports"></el-checkbox>
            <el-checkbox label="已加入“汽配保”计划,性能安全保障" name="supports"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible6 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form6',6)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" v-model="dialogFormVisible7">
      <el-form :model="form" :rules="rules" ref="form7">
        <el-form-item class="limit"
                      v-for="(info, index) in form.infos"
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

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible7 = false">取 消</el-button>
        <el-button @click="addInfo">新增店铺信息</el-button>
        <el-button type="primary" @click="submitForm('form7',7)">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        tableData: [{
          property: '店铺名称',
          info: ''
        }, {
          property: '描述',
          info: ''
        }, {
          property: '详细描述',
          info: ''
        }, {
          property: '即时配送',
          info: ''
        }, {
          property: '配送费',
          info: ''
        }, {
          property: '配送价格',
          info: ''
        }, {
          property: '活动支持',
          info: [{description: 0}]
        }, {
          property: '更多信息',
          info: ['']
        }],
        dialogFormVisible0: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        dialogFormVisible5: false,
        dialogFormVisible6: false,
        dialogFormVisible7: false,
        dialogFormVisible8: false,
        formLabelWidth: '100px',
        form: {
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
          supports: [
            {type: 'array', required: true, message: '请至少选择一个活动支持', trigger: 'change'}
          ]
        }
      };
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    created() {
      this.$http.get('/oshop').then(response => {
        response = response.body;
        if (response.errno === 0) {
          let data = response.data;
          console.log(data);
          this.tableData[0].info = data.name;
          this.tableData[1].info = data.description;
          this.tableData[2].info = data.bulletin;
          this.tableData[3].info = data.isdelivery;
          this.tableData[4].info = data.deliveryPrice;
          this.tableData[5].info = data.minPrice;
          let sup = [];
          data.supports.forEach(function (item, index, array) {
            sup.push(item.description);
          });
          this.tableData[6].info = sup.toString();
          this.tableData[7].info = data.infos.toString();
        } else {

        }
      }, response => {

      });
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this['dialogFormVisible' + index] = true;
      },
      fetchData () {
        this.$http.get('/oshop').then(response => {
          response = response.body;
          if (response.errno === 0) {
            let data = response.data;
            console.log(data);
            this.tableData[0].info = data.name;
            this.tableData[1].info = data.description;
            this.tableData[2].info = data.bulletin;
            this.tableData[3].info = data.isdelivery;
            this.tableData[4].info = data.deliveryPrice;
            this.tableData[5].info = data.minPrice;
            let sup = [];
            data.supports.forEach(function (item, index, array) {
              sup.push(item.description);
            });
            this.tableData[6].info = sup.toString();
            this.tableData[7].info = data.infos.toString();
          } else {

          }
        }, response => {

        });
      },
      submitForm(formName, index) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let postdata = {};
            if (index === 0) {
                postdata = {'name': this.form.name};
            }
            if (index === 1) {
                postdata = {'desc': this.form.desc};
            }
            if (index === 2) {
                postdata = {'desctail': this.form.desctail};
            }
            if (index === 3) {
              postdata = {'isdelivery': this.form.isdelivery};
            }
            if (index === 4) {
              postdata = {'deliveryprice': this.form.deliveryprice};
            }
            if (index === 5) {
              postdata = {'minprice': this.form.minprice};
            }
            if (index === 6) {
              postdata = {'supports': this.form.supports};
            }
            if (index === 7) {
              postdata = {'infos': this.form.infos};
            }
            this.$http.post('/dochanginfo', postdata).then(response => {
              response = response.body;
              if (response === '1') {
                console.log(1);
                this.success();
                if (index === 0) {
                  this.tableData[index].info = this.form.name;
                }
                if (index === 1) {
                  this.tableData[index].info = this.form.desc;
                }
                if (index === 2) {
                  this.tableData[index].info = this.form.desctail;
                }
                if (index === 3) {
                  this.tableData[index].info = this.form.isdelivery;
                }
                if (index === 4) {
                  this.tableData[index].info = this.form.deliveryprice;
                }
                if (index === 5) {
                  this.tableData[index].info = this.form.minprice;
                }
                if (index === 6) {
                  this.tableData[index].info = this.form.supports.toString();
                }
                if (index === 7) {
                  let infos = [];
                  this.form.infos.forEach(function (item, index, array) {
                    infos.push(item.value);
                  });
                  this.tableData[index].info = infos.toString();
                }
                this['dialogFormVisible' + index] = false;
              }
            }, response => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      success() {
        this.$message({
          message: '恭喜你，修改成功！',
          type: 'success'
        });
      },
      removeInfo(item) {
        var index = this.form.infos.indexOf(item);
        if (index !== -1) {
          this.form.infos.splice(index, 1);
        }
      },
      addInfo() {
        this.form.infos.push({
          value: '',
          key: Date.now()
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopinfo
    .el-dialog__body
      padding: 30px 40px 30px 40px
</style>
