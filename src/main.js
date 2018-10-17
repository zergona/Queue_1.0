// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'


Vue.use(VueFire)
firebase.initializeApp({
  apiKey: 'AIzaSyAl-815sUp6sKW8pCzYtW6o4u5_wN2kW10',
  authDomain: 'timetracker2-d9d0d.firebaseapp.com',
  databaseURL: 'https://timetracker2-d9d0d.firebaseio.com',
  projectId: 'timetracker2-d9d0d',
  storageBucket: 'timetracker2-d9d0d.appspot.com',
  messagingSenderId: '947103918546'
})

let app

export const db = firebase.firestore()
export const YOUTUBE_API_KEY = 'AIzaSyCk6MdBIeUejC-ae89DkMrC7kZHWkFBzPM'

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
  app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

    })
  }
});
