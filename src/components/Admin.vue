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
    <form v-on:submit.prevent="change()">      
      <input type="submit" class="btn btn-primary" value="Pokreni muziku"><br> 
    </form>
    <div id="main">
        <h1>Pjesme</h1>
        <youtube id="xd" @ended="change(), del" :player-vars="{ autoplay: 1 }" :video-id="videoId"></youtube>        
    </div>
</div>
</template>


<script src="vue-youtube-embed.umd.js"></script>

<script>
import { auth } from "firebase";
</script>

<script>
import firebase from 'firebase'
import { db } from '../main'
import VueFire from 'vuefire'
import 'firebase/firestore'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

export default {
  name: 'Admin',
  data () {
    return {
      Songs: [],
      pjesma: '',
      link: '',
      videoId: 'videoId',
      startTime:'',
      indx: 0,
      videoEnded: false, 
      ime: '',
      Songs2: [],
      indx2: 0
    }
  },
  
  firestore () {
    return {
      Songs: db.collection('Songs').orderBy('createdAt'),
      Songs2: db.collection("Songs2").orderBy("createdAt")
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    log: function (message) {
      this.$log(`${new Date().toLocaleTimeString()} -- ${message}`)
    },
    ended () {       
      this.log('ended')
    },

    change () {
      console.log(this.indx)
      if(this.indx <= this.Songs.length+1 && this.indx>1) {
        this.indx = this.indx + 1
      }
      if(this.Songs.length > 0){
        this.ytvid(this.Songs[this.indx].pjesma)
        const createdAt = new Date()
        var pjesma = this.Songs[this.indx].pjesma
        var ime = this.Songs[this.indx].ime
        var id = this.Songs[this.indx].id
        var izvodjac = this.Songs[this.indx].izvodjac
        db.collection('Songs2').add({ pjesma, createdAt, ime, izvodjac })
        db.collection('Songs').doc(id).delete()
        
        }
      else{
        this.ytvid(this.Songs2[this.indx2].pjesma)
        this.indx2 = this.indx2 + 1
        if(this.indx<0){
          this.indx = this.indx + 1;
        }
      }
      
      
    },
    ytvid (url) {
      this.videoId = this.$youtube.getIdFromURL(url)
      this.startTime = this.$youtube.getTimeFromURL(url)
    },
    storage(){

    },
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
#main{
    background-image: url("https://i.imgur.com/628rp5Q.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30%;
}
</style>
