import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  // 若访问根路径则重定向到login页面
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/components/Login')
  },
  {
    path: '/home',
    component: () => import('@/components/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/components/Welcome')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数，表示放行 next('/login') 强制跳转至login页面
  if (to.path === '/login') {
    // 访问登录页面则直接放行
    return next()
  } else {
    // 获取token并进行判断是否放行
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      // 无token则强制跳转至login页面
      return next('/login')
    } else {
      return next()
    }
  }
})

export default router
