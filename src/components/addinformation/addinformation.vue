<template>
  <div class="addinformation">
    <h2 class="h">上传资讯照片</h2>
    <p class="desc">给大家提供潮流资讯等。</p>
    <div class="form-box">
      <div class="form-content">
        <el-upload
          class="upload-show"
          action="/addinformation"
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
    created() {
      this.$http.get('/information').then(response => {
        response = response.body;
        console.log(11111);
        console.log(response);
        let pics = [];
        for (let i = 0; i < response.length; i++) {
            let pic = {};
            pic.name = response[i].pic;
            pic.url = '/info' + response[i].pic;
            pics.push(pic);
        }
        this.fileList2 = pics;
        this.pics = pics;
      }, response => {
      });
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file);
        this.$http.post('/infodelete', {'pic': file.name}).then(response => {
        }, response => {
        });
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addinformation
    .upload-show
      width: 440px
</style>
