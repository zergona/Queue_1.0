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
    <form v-for="(pjesme, idx) in Songs" :key="idx" v-on:submit.prevent="ytvid(pjesme.pjesma)">      
      <input type="submit" class="btn btn-primary" value="Dodaj Muzicku"><br> 
    </form>
    
    <div>
        <h1>Pjesme</h1>
        <youtube id="xd" @ended=ended :player-vars="{ autoplay: 1 }" :video-id="videoId"></youtube>        
    </div>
    <article v-for="(pjesme, aaa) in Songs" :key="aaa">
        <h3>{{ pjesme.pjesma }}</h3>
    </article> 
</div>
</template>


<script src="vue-youtube-embed.umd.js"></script>

<script>
import { auth } from "firebase";

Vue.use(VueYouTubeEmbed)
</script>

<script>
import firebase from 'firebase'
import { db } from 'C:/Users/Armin/hosmuzicku/hosmuzicku/src/main'
import VueFire from 'vuefire'
import 'firebase/firestore'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

export default {
  name: 'HelloWorld2',
  data () {
    return {
      Songs: [],
      pjesma: '',
      link: '',
      videoId: 'videoId',
      startTime: '',
      indx: '',
      videoEnded: false,
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
    elements: function(Songs){
    indx = 1
    },
    broj: function (Songs) {
    return Songs.length
    },
    addSong (pjesma) {
        const createdAt = new Date()
        db.collection('Songs').add({ pjesma, createdAt })
    },
    ytvid (url) {
      this.videoId = this.$youtube.getIdFromURL(url)
      this.startTime = this.$youtube.getTimeFromURL(url)
    },
    log (message) {
      this.$log(`${new Date().toLocaleTimeString()} -- ${message}`)
    },
    ended (event) { this.log('ended') 
    change()
    },
    pause () {
      this.player.pauseVideo()
    },
    change () {
      this.videoId = dQw4w9WgXcQ
    },
    playing (event) {
      // The player is playing a video.
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

    /*  var ime2 = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&key=AIzaSyCk6MdBIeUejC-ae89DkMrC7kZHWkFBzPM&q="+ime
      var nez = JSON.stringify(ime2)
      var idemo = JSON.parse({nez}) 
      var url = idemo.id.videoId
      this.videoId = url       */