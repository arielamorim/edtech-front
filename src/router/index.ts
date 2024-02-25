import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CreateStudent from '../views/CreateStudent.vue'
import ListStudents from '../views/ListStudents.vue'
import EditStudent from '../views/EditStudent.vue'
import UserLogin from '../views/UserLogin.vue'
import UserLogout from '../views/UserLogout.vue'
import authService from '@/services/authService'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
    meta: { requiresAuth: false }
  },
  {
    path: '/createstudent',
    name: 'createstudent',
    component: CreateStudent,
    meta: { requiresAuth: true }
  },
  {
    path: '/students',
    name: 'students',
    component: ListStudents,
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'logout',
    component: UserLogout
  },
  {
    path: '/editstudent',
    name: 'editstudent',
    component: EditStudent,
    meta: { requiresAuth: true }
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to, from, next) => {
  const isAuth = await authService.isAuthenticated()
  
  if (to.name !== 'login' && to.meta?.requiresAuth && !isAuth) {
    next({ name: 'login'});
  } else {
    next();
  }
});

export default router
