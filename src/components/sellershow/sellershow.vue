<template>
  <div class="sellershow">
    <h2 class="h">上传卖家秀</h2>
    <p class="desc">秀出店铺秀出商品秀出个性，比如店铺DIY、个性汽车配件、有意思配送包装等。</p>
    <div class="form-box">
      <div class="form-content">
        <el-upload
          class="upload-show"
          action="/dosetshow"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        fileList2: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .sellershow
    .upload-show
      width: 440px
</style>
