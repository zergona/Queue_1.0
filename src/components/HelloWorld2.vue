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
    <form v-on:submit.prevent="search(link)">      
      <input type="text" v-model="link" placeholder="Link pjesme">
      <input type="submit" class="btn btn-primary" value="Dodaj Muzicku"><br> 
    </form>
    <div>
      
    <!--  <div class="panel-body">-->
        <h1>Pjesme</h1>
        <youtube :video-id="videoId"></youtube>
        
    </div>
</div>
</template>


<script src="vue-youtube-embed.umd.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="auth.js"></script>
<script src="search.js"></script>
<script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>

<script>
import { auth } from "firebase";

Vue.use(VueYouTubeEmbed)
</script>

<script>
import firebase from 'firebase'
import { db } from 'C:/Users/WiMAX/tt0.3.2 - Copy/src/main'
import VueFire from 'vuefire'
import 'firebase/firestore'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
import gapi from 'C:/Users/WiMAX/tt0.3.2 - Copy/src/components/auth.js'

export default {
  name: 'HelloWorld2',
  data () {
    return {
      Songs: [],
      pjesma: '',
      link: '',
      videoId: 'videoId',
      startTime: ''
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
    },
    ytvid (ime2) {
      var ime3 = search(ime2)
      this.videoId = ime3
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