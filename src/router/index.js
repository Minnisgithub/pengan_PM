import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //   {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  // },
  
]
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    name: '/dashboard',
    redirect: '/dashboard/index',
    meta: { title: '首页', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: '/dashboard/index',
        component: () => import('@/views/dashboard/index'),
        hidden: true
      },
    ]
  },
  {
    path: '/company',
    component: Layout,
    redirect: '/company/offer',
    name: '/company',
    meta: { title: '厂商订阅', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'offer',
        name: '/company/offer',
        component: () => import('@/views/company/offer'),
        meta: { title: '提供方' }
      },
      {
        path: 'consumer',
        name: '/company/consumer',
        component: () => import('@/views/company/consumer'),
        meta: { title: '消费方' }
      }
    ]
  },
  {
    path: '/port',
    component: Layout,
    redirect: '/port/offer',
    name: '/port',
    meta: { title: '接口订阅', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'offer',
        name: '/port/offer',
        component: () => import('@/views/port/offer'),
        meta: { title: '提供方' }
      },
      {
        path: 'consumer',
        name: '/port/consumer',
        component: () => import('@/views/port/consumer'),
        meta: { title: '消费方' }
      }
    ]
  },
  {
    path: '/subscriptionFind',
    name: '/subscriptionFind',
    redirect: '/subscriptionFind/index',
    component: Layout,
    meta: { title: '订阅查询', icon: 'form' },
    children: [
      {
        path: 'index',
        name: '/subscriptionFind/index',
        component: () => import('@/views/subscriptionFind/index'),
        hidden: true
      }
    ]
  },
  {
    path: '/messageLog',
    component: Layout,
    redirect: '/messageLog/index',
    name: '/messageLog',
    meta: { title: '消息日志', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: '/messageLog/index',
        component: () => import('@/views/messageLog/index'),
        hidden: true
      },
    ]
  },
  {
    path: '/systemM',
    component: Layout,
    name: '/systemM',
    redirect: '/systemM/userM',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'userM',
        component: () => import('@/views/systemM/userM'),
        name: '/systemM/userM',
        meta: { title: '用户管理' }
      },
      {
        path: 'roleM',
        component: () => import('@/views/systemM/roleM'),
        name: '/systemM/roleM',
        meta: { title: '角色管理' }
      },
      {
        path: 'systemConfiguration',
        component: () => import('@/views/systemM/systemConfiguration'),
        name: 'systemConfiguration',
        meta: { title: '系统配置' }
      },
    ]
  },
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
