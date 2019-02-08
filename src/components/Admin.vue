<template>
  <div id="wrapper-admin">
  
    <div></div>

    <div id="tijelo-admin">

      <div id="header-admin">
              <div></div>
              <header style="height:10px;">
              
              </header>
              <div></div>
      </div>

      <div id="pokreni-muziku-btn">
            <div></div>
            <form v-on:submit.prevent="change()">      
              <input id="pokreni-muziku" type="submit" class="btn btn-primary" value="Play music"><br> 
            </form>
            <div></div>
            <div></div>
            <form v-on:submit.prevent="brisisve">      
              <input id="brisi-sve" type="submit" class="btn btn-primary" value="Clear queue"><br> 
            </form>
            <div></div>
      </div>

      <div id="main-admin">
            <div></div>
            <div>
              <youtube id="xd" player-width="70%" @error="brisi()" @ended="change(), del"  :player-vars="{ autoplay: 1 }" :video-id="videoId"></youtube>        
            </div>
            <div></div>
      </div>
      <form v-on:submit.prevent="addSong(pjesma, ime, izvodjac)">      
      <input type="text" v-model="pjesma" placeholder="Song link" required>
      <input type="text" v-model="ime" placeholder="Song name" required>
      <input type="text" v-model="izvodjac" placeholder="Artist" required>
      <input type="submit" class="btn btn-primary" value="Add song" required><br> 
      </form>

      <div id="tijelo-home">
  <h1>Currently in Queue: </h1>
	<div id="varijantakurac" v-for="(pjesme, idx) in Songs" :key="idx">
      <div>
        <div id="pjesma-ime">{{pjesme.ime}}</div>
        <div id="pjesma-izv">{{pjesme.izvodjac}}</div>
        <div><input type="submit" class="btn btn-primary" v-on:click.prevent="removesong(pjesme.id)" value="Remove"></div>
      </div>
    </div>
  </div>

    </div>             
        
      
          
    <div></div>                

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
      Songs: db.collection('ssstQ').orderBy('createdAt'),
      Songs2: db.collection("ssstPL").orderBy("createdAt")
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
        db.collection('ssstPL').add({ pjesma, createdAt, ime, izvodjac })
        db.collection('ssstHistory').add({ pjesma, createdAt, ime, izvodjac })
        db.collection('ssstQ').doc(id).delete()
        
        }
      else{
        this.ytvid(this.Songs2[this.indx2].pjesma)
        this.indx2 = this.indx2 + 1
        if(this.indx<0){
          this.indx = this.indx + 1;
        }
      }
      
      
    },
    brisi () {
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
        db.collection('ssstQ').doc(this.Songs[this.indx-1].id).delete()
        
        }
      else{
        this.ytvid(this.Songs2[this.indx2].pjesma)
        this.indx2 = this.indx2 + 1
        if(this.indx<0){
          this.indx = this.indx + 1;
        }
      }
    },
    brisisve(){
        for(var i = 0; i<this.Songs.length; i++){
          const createdAt = new Date()
          var pjesma = this.Songs[i].pjesma
          var ime = this.Songs[i].ime
          var id = this.Songs[i].id
          var izvodjac = this.Songs[i].izvodjac
          db.collection('ssstPL').add({ pjesma, createdAt, ime, izvodjac })
          db.collection('ssstQ').doc(this.Songs[i].id).delete()
        }
      },

    ytvid (url) {
      this.videoId = this.$youtube.getIdFromURL(url)
      this.startTime = this.$youtube.getTimeFromURL(url)
    },
    storage(){
    },
    addSong(pjesma, ime, izvodjac) {
      const createdAt = new Date();
      db.collection("ssstPL").add({ pjesma, createdAt, ime, izvodjac });
    },
    removesong(id){
      db.collection('ssstQ').doc(id).delete()
    }
  }
}
</script>


<style>
#app {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
 }


#varijantakurac{
	display: grid;
	grid-template-columns: 90% 10%;
	text-align: center;
	padding: 10px 0;
	padding-left: 150px;
}

#pjesma-ime{
	font-weight: bold;
	color:rgb(0, 180, 219);
	font-size: 17px;
}

#pjesma-izv{
	font-weight: bold;
	color: white;
	text-transform: uppercase;
	font-size: 12px;
}

#tabela-admin {
			    font-family: arial, sans-serif;
			    border-collapse: collapse;
			    width: 100%;
			    color: #330000;
					border-radius: 3px;
          width: 84%;
          margin: auto;
			}


      #pokreni-muziku{
        background-color: rgb(0, 178, 215);
        height: 60px;
        width: 220px;
        border-radius: 3px;
        font-size: 20px;
        margin: 20px 0;
        }

    #header-admin {
      display: grid;
      grid-template-columns: 1fr 8fr 1fr;
      background-color: rgb(0, 178, 215);
    }

  
  

    #wrapper-admin{
      display: block;
      margin: auto;
      width: 100%;
      height: 100%;   
      
      font-family: 'Roboto', sans-serif;
      background: black;
      box-sizing: border-box;
      background-size: auto;
      padding: 50px 0px;
  }

  h3, h1{
    padding: 10px 0;
    color: rgb(0, 180, 219);
  }

  @media only screen and (max-width: 600px){
    #tabela-admin{
      width: 95%;
    }
  }

</style>
