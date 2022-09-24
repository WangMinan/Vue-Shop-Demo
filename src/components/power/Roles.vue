<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图-->
    <el-card>
      <el-row>
<!--        添加角色按钮-->
        <el-col :span="10">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
<!--      角色列表区-->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
<!--            当v-for有两个参数时,第一参数为数组元素/第二参数为该数组元素下标-->
<!--            有三个参数时,第一参数为内容 / 第二参数为键值Key / 第三参数为下标-->
            <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom', i1 === 0? 'bdtop' : '', 'vcenter']">
<!--              渲染一级权限-->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
<!--              渲染二级\三级权限-->
              <el-col :span="19">
<!--                通过for循环嵌套渲染二级三级权限-->
                <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2 === 0? '' : 'bdtop','vcenter']">
<!--                  二级权限-->
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
<!--                  三级权限-->
                  <el-col :span="13">
                    <el-tag v-for="(item3) in item2.children" :key="item3.id" type="warning" closable @close="removeRightById(scope.row,item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" size="small" icon="el-icon-setting" @click="showRightSetDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

<!--    权限分配对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="clearDefKeys"
    >
<!--      树形控件-->
<!--      node key 表示实际选中的值为节点的id-->
      <el-tree
        :data="rightsList"
        :props="rightProps"
        show-checkbox
        @check-change="handleRightCheckChange()"
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      >
      </el-tree>

<!--      底部按钮区 slot是vue框架下的插槽 可以用于替换屏幕上的组件 匿名组件由前后slot组成 具名slot、类似于footer 在特定位置占位-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="allotRights">确定</el-button>
        <el-button @click="setRightDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

const options = {
  data () {
    return {
      rolesList: [],
      setRightDialogVisible: false,
      rightsList: [],
      rightProps: {
        // 表示层级关系的字段
        children: 'children',
        // 树上显示的内容
        label: 'authName'
      },
      // 默认选中的节点ID值
      defKeys: [],
      roleId: ''
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      try {
        const res = await axios.get('roles')
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg)
        } else {
          this.rolesList = res.data.data
        }
      } catch (e) {
        this.$message.error('获取角色列表失败，请检查网络环境')
      }
    },
    // 根据id删除权限
    async removeRightById (role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(e => e)
      // 如果用户确认删除则返回值为字符串confirm
      // 如果用户取消删除则返回值为字符串cancel
      if (confirmResult !== 'confirm') {
        this.$message.info('已取消删除')
      } else {
        try {
          const resp = await axios.delete(`roles/${role.id}/rights/${rightId}`)
          if (resp.data.meta.status !== 200) {
            this.$message.error(resp.data.meta.msg)
          } else {
            this.$message.success('删除权限成功')
            // 删除成功后重新获取角色列表
            role.children = resp.data.data
          }
        } catch (e) {
          this.$message.error('删除权限失败，请检查网络环境')
        }
      }
    },
    // 显示分配权限对话框
    async showRightSetDialog (role) {
      this.roleId = role.id
      // 获取所有权限数据 并设置可见
      try {
        const resp = await axios.get('rights/tree')
        if (resp.data.meta.status !== 200) {
          this.$message.error(resp.data.meta.msg)
        } else {
          this.rightsList = resp.data.data
          this.getRightLeaves(role, this.defKeys)
          this.setRightDialogVisible = true
        }
      } catch (e) {
        this.$message.error('获取权限失败,请检查网络环境')
      }
    },
    handleRightCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    // 通过递归获得角色的权限并保存到数组中
    getRightLeaves (node, arr) {
      if (!node.children) {
        // 如果当前node节点不包含children属性 则表示当前节点为三级节点
        // 将当前节点的id值保存到数组中
        // 若非三级节点 则递归调用
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getRightLeaves(item, arr)
      })
      // 递归完毕后所有三级节点都会被保存到数组arr中
    },
    clearDefKeys () {
      this.defKeys = []
    },
    // 权限分配函数 为角色分配权限
    async allotRights () {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      // 以逗号分隔的字符串
      const idStr = keys.join(',')
      // 通过axios发送请求
      try {
        const resp = await axios.post(`roles/${this.roleId}/rights`, {
          rids: idStr
        })
        if (resp.data.meta.status !== 200) {
          this.$message.error(resp.data.meta.msg)
        } else {
          this.$message.success('分配权限成功')
          this.setRightDialogVisible = false
          await this.getRolesList()
        }
      } catch (e) {
        this.$message.error('分配权限失败，请检查网络环境')
      }
    }
  }
}
export default options
</script>

<style scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  /*  纵向居中对齐 */
  display: flex;
  align-items: center;
}
</style>
