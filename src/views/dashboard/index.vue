<template>
  <div class="app-container">
    <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
      copy
    </el-button>
  </div>
</template>

<script>
import clipboard from 'directive/clipboard/index.js' // use clipboard by v-directive
export default {
  directives: {
    clipboard
  },
  data () {
    return {
      inputData: '后台管理系统'
    }
  },
  methods: {
    clipboardSuccess () {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>
