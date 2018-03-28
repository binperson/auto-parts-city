<template>
  <div class="goodsinfo">
    <h2 class="h">更改信息</h2>
    <p class="desc">秀出店铺秀出商品秀出个性，比如店铺DIY、个性汽车配件、有意思配送包装等。</p>
    <div class="form-box">
      <div class="form-content">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="typename"
            label="产品分类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="price"
            label="现价">
          </el-table-column>
          <el-table-column
            prop="oldPrice"
            label="原价">
          </el-table-column>
          <el-table-column
            prop="info"
            label="更多信息">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <img :src="'/goods/'+scope.row.image" height="60" width="60" alt="">
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        tableData: [{
          typename: '2016-05-02',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄',
          price: '上海市普陀区金沙江路 1518 弄',
          oldPrice: '上海市普陀区金沙江路 1518 弄',
          descinfo: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    created() {
      this.$http.get('/goodsinfo').then(response => {
        response = response.body;
        console.log(response);
        if (response.errno === 0) {
          let data = response.data;
          console.log(data);
          this.tableData = data;
        } else {

        }
      }, response => {

      });
    },
    methods: {
      handleDelete(index, row) {
        let id = row._id;
        this.$http.post('/deletegoods', {'_id': id}).then(response => {
          response = response.body;
          console.log(response);
          if (response === '1') {
            this.tableData.splice(index, 1);
          } else {

          }
        }, response => {

        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goodsinfo
    .cell
      img
        position: relative
        top: 3px
        left: -9px
</style>

