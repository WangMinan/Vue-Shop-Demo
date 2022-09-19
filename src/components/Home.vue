<template>
  <div>
    <el-button type="info" @click = 'logout'>退出</el-button>
  </div>
</template>

<script>
const options = {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
export default options
</script>

<style lang = 'less' scoped>

</style>
