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
    <form v-on:submit.prevent="addSong(pjesma, ime)">      
      <input type="text" v-model="pjesma" placeholder="Pjesma">
      <input type="text" v-model="ime" placeholder="Ime">
      <input type="submit" class="btn btn-primary" value="Dodaj Muzicku"><br> 
    </form>
    <div>
        <h1>Pjesme</h1>
         <table class="table table-striped">
        <thead>
            <tr>
                <th>
                  Ime
                </th>
                <th>
                </th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(pjesme, idx) in Songs" :key="idx">
            <td>
              {{pjesme.ime}}
            </td>
            <td>
              <input type="submit" class="btn btn-primary" value="Dodaj Muzicku" v-on:click.prevent="addSong2(pjesme.pjesma, pjesme.id, pjesme.ime)"><br> 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>

</template>

<script>
import firebase from 'firebase'
import { db } from 'C:/Users/Armin/hosmuzicku/hosmuzicku/src/main'
import VueFire from 'vuefire'
import 'firebase/firestore'


export default {
  name: 'home',
  data () {
    return {
      Songs: [],
      pjesma: '',
      ime: ''
    }
  },
  firestore () {
    return {
      Songs: db.collection('Songs2').orderBy('createdAt')
    }
  }, 
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
        addSong (pjesma, ime) {
        const createdAt = new Date()
        db.collection('Songs2').add({ pjesma, createdAt, ime })
    },
    addSong2 (pjesma, id, ime) {
        const createdAt = new Date()
        db.collection('Songs').add({ pjesma, createdAt, ime })
        db.collection('Songs2').doc(id).delete()
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
  background-image: "hmtropical";
}
#header {
  background-color:#A1C3D1
}
</style>

