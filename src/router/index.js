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
]
export const asyncRoutes = [
  {
    path: '/desensibilisationM',
    component: Layout,
    name: 'desensibilisationM',
    redirect: '/desensibilisationM/DesensibilisationM',
    meta: { title: '脱敏规则', icon: 'el-icon-s-help' },
    children: [{
      path: '/desensibilisationM/DesensibilisationM',
      name: 'DesensibilisationM',
      component: () => import('@/views/desensibilisationM/index'),
      meta: { title: '脱敏管理' }
    },
    {
      path: 'addDesensibilisationM',
      name: 'addDesensibilisationM',
      component: () => import('@/views/desensibilisationM/add'),
      hidden: true,
      meta: { title: '新增规则' }
    }]
  },

  {
    path: '/scene',
    component: Layout,
    redirect: '/scene/custom',
    name: 'Scene',
    meta: { title: '脱敏场景', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'custom',
        name: 'custom',
        component: () => import('@/views/scene/custom'),
        meta: { title: '系统自定义脱敏' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/scene/role'),
        meta: { title: '系统角色关联脱敏' }
      }
    ]
  },
  {
    path: '/dictionaries',
    component: Layout,
    redirect: '/dictionaries/index',
    meta: { title: '字典管理', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'dictionaries',
        component: () => import('@/views/dictionaries/index'),
        meta: { title: '系统字典' }
      }
    ]
  },
  {
    path: '/logM',
    component: Layout,
    redirect: '/logM/index',
    meta: { title: '日志管理', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'logM',
        component: () => import('@/views/logM/index'),
        meta: { title: '操作日志' }
      }
    ]
  },
  {
    path: '/systemM',
    component: Layout,
    redirect: '/systemM/userM',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'userM',
        component: () => import('@/views/systemM/userM'),
        name: 'UserM',
        meta: { title: '用户管理' }
      },
      {
        path: 'roleM',
        component: () => import('@/views/systemM/roleM'),
        name: 'RoleM',
        meta: { title: '角色管理' }
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
