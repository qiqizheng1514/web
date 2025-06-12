import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/spots',
    name: 'ScenicSpots',
    component: () => import('../views/ScenicSpots.vue')
  },
  {
    path: '/spot/:id',
    name: 'SpotDetail',
    component: () => import('../views/SpotDetail.vue'),
    meta: { scrollToTop: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/travel-tips/:id',
    name: 'TravelTipDetail',
    component: () => import('../views/TravelTipDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 强制滚动到顶部，并使用平滑滚动效果
      return { top: 0, behavior: 'smooth' }
  }
})

// 路由守卫，检查用户是否已登录
router.beforeEach((to, from, next) => {
  // 如果路由需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查用户是否已登录
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null
    
    if (!user) {
      // 未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 保存原本要访问的路径
      })
    } else {
      next() // 已登录，继续访问
    }
  } else {
    next() // 不需要认证的路由，直接访问
  }
})

export default router 