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
    <form v-on:submit.prevent="addSong(pjesma, ime, izvodjac)">      
      <input type="text" v-model="pjesma" placeholder="Pjesma">
      <input type="text" v-model="ime" placeholder="Ime">
      <input type="text" v-model="izvodjac" placeholder="Izvodjac">
      <input type="submit" class="btn btn-primary" value="Dodaj Muzicku"><br> 
    </form>
    <h1 id="hm">Ho'š muzičku?</h1>
    <div id="tabela">     
         <table class="table table-striped">
        <thead>
            <tr>
                <th>
                  Ime
                </th>
                <th>
                  Izvođač
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
              {{pjesme.izvodjac}}
            </td>
            <td>
              <input type="submit" class="btn btn-primary" value="Dodaj Muzicku" v-on:click.prevent="addSong2(pjesme.pjesma, pjesme.id, pjesme.ime, pjesme.izvodjac)"><br> 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>

</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import VueFire from "vuefire";
import "firebase/firestore";

export default {
  name: "home",
  data() {
    return {
      Songs: [],
      pjesma: "",
      ime: "",
      izvodjac: "",
      indx2: 0
    };
  },
  firestore() {
    return {
      Songs: db.collection("Songs2").orderBy("createdAt")
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    addSong(pjesma, ime, izvodjac) {
      const createdAt = new Date();
      db.collection("Songs2").add({ pjesma, createdAt, ime, izvodjac });
    },
    addSong2(pjesma, id, ime, izvodjac) {      
      if(this.indx2<3){
        const createdAt = new Date();
        db.collection("Songs").add({ pjesma, createdAt, ime, izvodjac });
        db.collection("Songs2").doc(id).delete();
        this.indx2 = this.indx2 + 1;
      }
      else{
        alert("Vec ste pustili 3 pjesme!")
      }
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-image: url("https://i.imgur.com/628rp5Q.png");
  background-repeat: no-repeat;
  background-position: center;
}

#header {
  background-color: #a1c3d1;
}
#hm {
  padding-bottom: 2%;
}
</style>

