<template>
  <div class="home-div">
    <el-container class="home-container">
<!--      头部区域-->
      <el-header>
        <div>
          <img src="@/assets/octane.png" style="height: 50px;width: 50px" alt="logo">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click = 'logout'>退出</el-button>
      </el-header>
<!--      页面主题区域-->
      <el-container>
<!--        侧边栏-->
        <el-aside width="200px">Aside</el-aside>
<!--        主区域-->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
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
.home-div{
  height: 100%;
}
.home-container{
  height: 100%;
}
.el-header{
  background-color: rgb(64,158,255);
  display: flex;
  padding-left: 0;
  // 左右贴边对齐
  justify-content: space-between;
  // 按钮居中而不贴边
  align-items: center;
  // 文字部分
  color: white;
  font-size: 20px;
  // 样式嵌套
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color: rgb(193,210,240);
}
</style>
