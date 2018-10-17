<template>

  <div id="app"> 
    <div id="header" ALIGN=LEFT>
      <header>
        <input type="button" class="btn btn-link" value="Sign out" v-on:click.prevent="logout" ALIGN=LEFT>
      </header>
    </div>
      <div>
        <p></p>
      </div>
    <form v-on:submit.prevent="addSong(pjesma)">      
      <input type="text" v-model="pjesma" placeholder="Pjesma">
      <input type="submit" class="btn btn-primary" value="Dodaj Muzicku"><br> 
    </form>
    <div>
    <!--  <div class="panel-body">-->
        <h1>Pjesme</h1>
        <article v-for="(pjesme, idx) in Songs" :key="idx">
        <h3>{{ pjesme.pjesma }}</h3>
        </article>
    </div>
</div>

</template>

<script>
import firebase from 'firebase'
import { db } from 'C:/Users/WiMAX/tt0.3.2 - Copy/src/main'
import VueFire from 'vuefire'
import 'firebase/firestore'


export default {
  name: 'HelloWorld',
  data () {
    return {
      Songs: [],
      pjesma: ''
    }
  },
  firestore () {
    return {
      Songs: db.collection('Songs').orderBy('createdAt')
    }
  }, 
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
        addSong (pjesma) {
        const createdAt = new Date()
        db.collection('Songs').add({ pjesma, createdAt })
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#header {
  background-color:#A1C3D1
}
</style>

