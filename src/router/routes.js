const routes = [{
    path: '/',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [{
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/task',
        component: () => import('pages/Task.vue')
      },
      {
        path: '/project',
        component: () => import('pages/Project.vue')
      },
      {
        path: '/team',
        component: () => import('pages/Team.vue')
      },
    ]
  },
  {
    path: '/main',
    component: () => import('pages/Main.vue')
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
