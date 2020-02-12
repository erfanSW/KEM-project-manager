const routes = [{
  path: '/',
  component: () => import('layouts/DashboardLayout.vue'),
  props: true,
  children: [{
    path: '',
    component: () => import('pages/Index.vue')
  },
    {
      name: 'task',
      path: '/task/:project_id',
      component: () => import('pages/Task.vue')
    },
    {
      name: 'project',
      path: '/project',
      component: () => import('pages/Project.vue')
    },
    {
      name: 'team',
      path: '/team',
      component: () => import('pages/Team.vue')
    },
    {
      name: 'note',
      path: '/note',
      component: () => import('pages/Note.vue')
    }
  ]
},
  {
    name: 'main',
    path: '/main',
    component: () => import('pages/Main.vue')
  },
  {
    name: 'login',
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
