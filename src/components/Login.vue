<template>
  <div class = "login-container">
    <div class="login-box">
      <div class = "avatar-box">
        <img src = "@/assets/logo.png" >
      </div>
<!--      label-width用于左右对齐-->
      <el-form :model="loginForm" label-width="0px" class = "login-form">
<!--        用户名-->
        <el-form-item>
          <el-input v-model="loginForm.username" prefix-icon= "el-icon-user" ></el-input>
        </el-form-item>
<!--        密码-->
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item class = "buttons">
<!--          登录-->
          <el-button type="primary">登录</el-button>
<!--        重置-->
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const options = {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      flag: false
    }
  }
}
export default options
</script>

<style lang="less" scoped>
.login-container{
  background-color: #2af598;
  height: 100%;
}
.login-box{
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avatar-box{
    height: 130px;
    width: 130px;
    border: 1px solid #eeee;
    border-radius: 50%;
    padding: 10px; /* 图片边框间隙 */
    background-color: white;
    box-shadow: 0 0 10px #dddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%); /* 相对自身 */
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeee;
    }
  }
}
.buttons{
  display: flex;
  justify-content: flex-end; /* 右对齐 */
}
.login-form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
