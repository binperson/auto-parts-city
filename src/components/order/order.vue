<template>
  <div class="order">
    <h2 class="h">订单详情</h2>
    <p class="desc">用户信息，订单详情，总价格等等。</p>
    <div class="form-box">
      <div class="form-content">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="buyerphonenum"
            label="用户信息"
            width="180">
          </el-table-column>
          <el-table-column
            prop="info"
            label="订单详情"
            width="180">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="总价格">
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
        tableData: []
      };
    },
    created() {
      this.$http.post('/orderTable').then(response => {
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
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
