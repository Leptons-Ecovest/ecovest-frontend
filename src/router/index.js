import { createRouter, createWebHashHistory } from 'vue-router'

// import Home from '../views/Home.vue'

import Login from '../views/pages/Login.vue'

import Register from '../views/pages/Register.vue'

import EmailOTP from '../views/pages/EmailOTP.vue'

import UserHome from '../views/pages/subscribers/Dashboard.vue'

import UserMessages from '../views/pages/subscribers/Messages.vue'

import UserProfile from '../views/pages/subscribers/MyProfile.vue'

import UserProjects from '../views/pages/subscribers/MyProjects.vue'

import Projects from '../views/pages/Projects.vue'

import PaymentHistory from '../views/pages/subscribers/PaymentHistory.vue'

import Support from '../views/pages/subscribers/Support.vue'

import TicketSuccess from '../views/pages/subscribers/TicketSuccess.vue'



import AdminHome from '../views/pages/admin/Home.vue'

import Members from '../views/pages/admin/Users.vue'

import Messages from '../views/pages/admin/Messages.vue'

import Users from '../views/pages/admin/Users.vue'

import User from '../views/pages/admin/User.vue'

import CreatePlan from '../views/pages/admin/CreatePlan.vue'


import PaymentHistoryView from '../views/pages/admin/MembersSubscriptions.vue'

import MemberSubscriptions from '../views/pages/admin/MembersSubscriptions.vue'

import UpdatePaymentPlan from '../views/pages/admin/UpdatePaymentPlan.vue'

import AddProject from '../views/pages/admin/AddProject.vue'



// import Dashboard from '../views/pages/subscribers/Dashboard.vue'

import Fullwidth from '../views/layouts/Fullwidth.vue'

import DashboardLayout from '../views/layouts/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Fullwidth,
    children:[{
      path: '',
      component: Login,

    }]
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


  {
    path: '/verify',
    name: 'EmailOTP',
    component: Fullwidth,
      children: [
        {
          path: '',
          component: EmailOTP,
        }
      ]
  },

  {
    path: '/user/',
    name: 'Dashboardx',
    component: DashboardLayout,
      children: [
        {
        path: '',
        component: UserHome
      },
      {
        path: 'messages',
        component: UserMessages
      },
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'projects',
        component: Projects
      },
      {
        path: 'payment-history',
        component: PaymentHistory
      },
      {
        path: 'support',
        component: Support
      },

      {
        path: 'ticket-success',
        component: TicketSuccess
      },


      {
        path: 'projects',
        component: UserProjects
      }
    ],
    beforeEnter: (to, from, next) => {
      // ...
      if (localStorage.getItem('user_role') =='user') {

          console.log('yes')

     next()
    
      }else{
          console.log('no board')
          router.push({
              path: '/login',
              replace: true
            });
      

      }
    }
  },

  {
    path: '/admin/',
    name: 'Dashboard',
    component: DashboardLayout,
      children: [
        {
        path: '',
        component: AdminHome
      },

      {
        path: 'members',
        component: Members
      },
      {
        path: 'messages',
        component: Messages
      },
      {
        path: 'subscribers',
        component: Users
      },
      {
        path: 'subscriber/:id',
        component: User
      },
      {
        path: 'create-payment-plan',
        component: CreatePlan
      },
      {
        path: 'projects',
        component: Projects
      },
      {
        path: 'add-project',
        component: AddProject
      },
      {
        path: 'user-payment/:id',
        component: PaymentHistoryView
      },
      {
        path: 'members-subscriptions',
        component: MemberSubscriptions
      },

      {
        path: 'update-payment-plan/:id',
        name: 'update-payment-plan',
        component: UpdatePaymentPlan
      },
      {
        path: 'support',
        component: Support
      }
    ],
    beforeEnter: (to, from, next) => {
      // ...
      if (localStorage.getItem('user_role') =='admin') {

          console.log('yes')

     next()
    
      }else{
          console.log('no board')
          router.push({
              path: '/login',
              replace: true
            });
      

      }
    }
  },


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
