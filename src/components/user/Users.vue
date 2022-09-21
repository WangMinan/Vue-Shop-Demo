<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区-->
    <el-card class="box-card">
<!--      搜索与添加区-->
      <el-row :gutter = 20>
        <el-col :span = "14">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
<!--        自动生成索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
<!--          作用域插槽数据使用slot-scope进行接收-->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template>
<!--            修改按钮-->
            <el-tooltip effect="light" content="信息编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
            </el-tooltip>
<!--            删除按钮-->
            <el-tooltip effect="light" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
            </el-tooltip>
<!--            分配角色按钮-->
            <el-tooltip effect="light" content="修改权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" circle size="small"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

const options = {
  created () {
    this.getUserList()
  },
  data () {
    return {
      // 获取用户列表对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  methods: {
    async getUserList () {
      try {
        const resp = await axios.get('users', { params: this.queryInfo })
        if (resp.data.meta.status === 200) {
          this.userList = resp.data.data.users
          this.total = resp.data.data.total
        } else {
          this.$message.error('获取用户列表失败,请稍后重试')
        }
      } catch (e) {
        this.$message.error('获取用户列表失败,请检查后端服务器是否正常运行')
      }
    }
  }
}
export default options
</script>

<style lang="less" scoped>

</style>
