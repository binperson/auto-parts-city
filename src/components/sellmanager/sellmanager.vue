<template>
  <div class="sellmanager">
    <h2 class="h">管理商家店铺</h2>
    <p class="desc">审核商家，删除信息不符实际商家</p>
    <div class="form-box">
      <div class="form-content">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="shopphonenum"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商铺名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
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
        tableData: []
      };
    },
    created() {
      this.$http.get('/shop').then(response => {
        response = response.body;
        if (response.errno === 0) {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].state !== 1) {
              this.tableData.push(data[i]);
            }
          }
        }
      }, response => {
      });
    },
    methods: {
      handleEdit(index, id) {
        this.$http.post('/deleteshop', {
          '_id': id
        }).then(response => {
          response = response.body;
          if (response === '1') {
            this.tableData.splice(index, 1);
          }
        }, response => {
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
