<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
<!--      商品表格-->
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type = false
        :expand-type = false
        show-index
        index-text= #
        border
      >
<!--        是否有效-->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
          <i class="el-icon-error" v-else style="color: lightgreen;"></i>
        </template>
<!--        排序-->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
<!--        操作-->
        <template slot="opt">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
<!--      分页组件区-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

const options = {
  data () {
    return {
      // 涉及到分页的都要指定查询条件
      queryInfo: {
        type: 3, // 3表示查询所有分类数据,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类数据表 默认为空
      cateList: [],
      // 总数据条数
      total: 0,
      // 为table指定列的标题
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      },
      {
        label: '是否有效',
        type: 'template',
        template: 'isok'
      },
      {
        label: '排序',
        type: 'template',
        template: 'order'
      },
      {
        label: '操作',
        type: 'template',
        template: 'opt'
      }
      ]
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      try {
        const resp = await axios.get('categories', {
          params: this.queryInfo
        })
        if (resp.data.meta.status !== 200) {
          this.$message.error(resp.data.meta.msg)
        } else {
          this.cateList = resp.data.data.result
          console.log(this.cateList)
          this.total = resp.data.data.total
        }
      } catch (e) {
        this.$message.error('获取商品分类列表失败，请检查网络环境')
      }
    },
    // 监听pageSize的变化
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pageNum的变化
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    }
  }
}
export default options
</script>

<style scoped>
.treeTable{
  margin-top: 20px;
}
</style>
