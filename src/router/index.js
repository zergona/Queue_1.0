import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'C:/Users/WiMAX/tt0.3.2 - Copy/src/components/HelloWorld'
import Login from 'C:/Users/WiMAX/tt0.3.2 - Copy/src/components/login'
import SignUp from 'C:/Users/WiMAX/tt0.3.2 - Copy/src/components/SignUp'
import HelloWorld2 from 'C:/Users/WiMAX/tt0.3.2 - Copy/src/components/HelloWorld2'
import firebase from 'firebase'
import VueFire from 'vuefire'
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
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/HelloWorld2',
      name: 'HelloWorld2',
      component: HelloWorld2,
      meta: {
        requiresAuth: true
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
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else next()
})
export default router
