<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
    <el-card>
      <!--    插入echarts表格-->
      <div id="main" style="width: 800px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 只有这个组件需要用到Echarts 只在这里导入就好了
// 注意导入语句格式更新
import * as echarts from 'echarts'
import _ from 'lodash'
import axios from 'axios'
const options = {
  data () {
    return {
      // 需要合并的格式样例
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  async mounted () {
    // 基于准备好的dom，初始化echarts实例
    // 此时页面元素被渲染完毕了
    const myChart = echarts.init(document.getElementById('main'))
    const resp = await axios.get('reports/type/1')
    if (resp.data.meta.status !== 200) {
      this.$message.error(resp.data.meta.msg)
    } else {
      // 准备数据配置项 通过lodash的merge方法合并
      const mergeResult = _.merge(resp.data.data, this.options)
      myChart.setOption(mergeResult)
    }
  }
}
export default options
</script>

<style scoped>

</style>
