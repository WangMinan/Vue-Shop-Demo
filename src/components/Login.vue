<template>
  <div class = "login-container">
    <div class="login-box">
      <div class = "avatar-box">
        <img src = "@/assets/logo.png" >
      </div>
<!--      label-width用于左右对齐-->
      <el-form :model="loginForm" ref="loginFormRef" :rules="rules" label-width="0px" class = "login-form">
<!--        用户名 注意prop属性标注在form-item的位置-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon= "el-icon-user"></el-input>
        </el-form-item>
<!--        密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item class = "buttons">
<!--          登录-->
          <el-button type="primary" @click="login">登录</el-button>
<!--        重置-->
          <el-button type="info" @click="resetLoginForm">重置</el-button>
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
      rules: {
        username: [
          // 验证密码是否合法
          { required: true, message: '请输入活动名称', trigger: 'blur' }, // 鼠标失去焦点时触发该检查
          { min: 3, max: 30, message: '长度应当为 3 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 登录前表单预验证
      this.$refs.loginFormRef.validate(
        async valid => {
          // eslint-disable-next-line no-empty
          if (!valid) {
            this.$message.error('登陆失败，请检查输入的内容与格式是否正确')
          } else {
            try {
              const resp = await this.$http.post('login', this.loginForm)
              if (resp.data.meta.status === 200) {
                this.$message.success('登陆成功')
                // 1. 保存token至客户端的sessionStorage中
                window.sessionStorage.setItem('token', resp.data.data.token)
                //  1.1 项目中除了登录页面，其他页面都需要token才能访问
                //  1.2 token只应当在当前浏览器窗口打开期间有效 这正是sessionStorage的特点
                // 2. 跳转到首页
                await this.$router.push('/home')
              } else {
                this.$message.error(resp.data.meta.status + ':' + resp.data.meta.msg)
              }
            } catch (e) {
              this.$message.error('登陆失败，请检查后端服务器是否正常运行')
            }
          }
        }
      )
    },
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
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
