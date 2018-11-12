import Vue from 'vue'
import Router from 'vue-router'
import home from 'C:/Users/WiMAX/hosmuzicku2/hosmuzicku/src/components/home'
import Login from 'C:/Users/WiMAX/hosmuzicku2/hosmuzicku/src/components/login'
import SignUp from 'C:/Users/WiMAX/hosmuzicku2/hosmuzicku/src/components/SignUp'
import Admin from 'C:/Users/WiMAX/hosmuzicku2/hosmuzicku/src/components/Admin'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else next()
})
export default router
