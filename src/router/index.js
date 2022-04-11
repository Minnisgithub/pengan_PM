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
    {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'dashboard',
    meta: { title: '首页', icon: 'el-icon-s-help' },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        hidden: true
      },
    ]
  },
  {
    path: '/messageLog',
    component: Layout,
    name: 'messageLog',
    meta: { title: '消息日志', icon: 'el-icon-s-help' },
    children: [
      {
        path: '',
        component: () => import('@/views/messageLog/index'),
        hidden: true
      },
    ]
  },
  {
    path: '/company',
    component: Layout,
    redirect: '/company/offer',
    name: 'company',
    meta: { title: '厂商订阅', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'offer',
        name: 'offer',
        component: () => import('@/views/company/offer'),
        meta: { title: '提供方' }
      },
      {
        path: 'consumer',
        name: 'consumer',
        component: () => import('@/views/company/consumer'),
        meta: { title: '消费方' }
      }
    ]
  },
  {
    path: '/port',
    component: Layout,
    redirect: '/port/offer',
    name: 'port',
    meta: { title: '接口订阅', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'offer',
        name: 'offer',
        component: () => import('@/views/port/offer'),
        meta: { title: '提供方' }
      },
      {
        path: 'consumer',
        name: 'consumer',
        component: () => import('@/views/port/consumer'),
        meta: { title: '消费方' }
      }
    ]
  },
  {
    path: '/subscriptionFind',
    name: 'subscriptionFind',
    component: Layout,
    meta: { title: '订阅查询', icon: 'form' },
    children: [
      {
        path: '',
        component: () => import('@/views/subscriptionFind/index'),
        hidden: true
      }
    ]
  },
]
export const asyncRoutes = [
  
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
