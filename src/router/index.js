import { createRouter, createWebHashHistory } from 'vue-router'

// import Home from '../views/Home.vue'

import Login from '../views/pages/Login.vue'

import Register from '../views/pages/Register.vue'

// import Dashboard from '../views/pages/subscribers/Dashboard.vue'

import Fullwidth from '../views/layouts/Fullwidth.vue'

import DashboardLayout from '../views/layouts/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Fullwidth
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardLayout
  },


  {
    path: '/login',
    name: 'Login',
    component: Fullwidth,
      children: [{
        path: '',
        component: Login
      }]
  },


  {
    path: '/register',
    name: 'Register',
    component: Fullwidth,
      children: [{
        path: '',
        component: Register
      }]
  },


  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: DashboardLayout,
  //     children: [{
  //       name: '',
  //       component: Login
  //     }]
  // },


  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
