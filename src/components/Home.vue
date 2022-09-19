<template>
  <div>
    <el-button type="info" @click = 'logout'>退出</el-button>
  </div>
</template>

<script>
const options = {
  methods: {
    logout () {
      try {
        window.sessionStorage.clear()
        this.$router.push('/login')
        this.$message.success('退出成功')
      } catch (e) {
        this.$message.error('退出失败，请检查网络环境')
      }
    }
  }
}
export default options
</script>

<style lang = 'less' scoped>

</style>
