<template>

<div id = "wrapper-home">

<header>
	<div id="choose-home">Choose your song:</div>
	<div id="queue-home">In queue:</div>
</header>

<div id="tijelo-home">

	<div id="varijanta1" v-for="(pjesme, idx) in Songs" :key="idx">
		<div>
			<div id="pjesma-ime">{{pjesme.ime}}</div>
			<div id="pjesma-izv">{{pjesme.izvodjac}}</div>
		</div>
		<div id="add-home"><img v-on:click.prevent="addSong2(pjesme.pjesma, pjesme.id, pjesme.ime, pjesme.izvodjac)" src="./imgs/add.png"></div>
	</div>
</div>

<div id="tijelo-home2">
	<div id="varijanta2" v-for="(pjesme, idx) in Songs2" :key="idx">
		<div>
			<div id="pjesma-ime">{{pjesme.ime}}</div>
			<div id="pjesma-izv">{{pjesme.izvodjac}}</div>
		</div>		
	</div>
</div>

<footer>
	<div v-on:click="toggle1()" id="list-home-btn"><img src="./imgs/noteblue.png"><p>Playlist</p></div>
	<div v-on:click="toggle2()" id="queue-home-btn"><img src="./imgs/playblue.png"><p>Queue</p></div>
</footer>

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
      indx2: 0,
			Songs2: [],
			unos: "",
			pretraga: []
						
		};
  },
  firestore() {
    return {
     Songs: db.collection("ssstPL").orderBy("createdAt"),
		 Songs2: db.collection("ssstQ").orderBy("createdAt"),
			
			asObject: true
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
      db.collection("ArgCigQ").add({ pjesma, createdAt, ime, izvodjac });
    },
    addSong2(pjesma, id, ime, izvodjac) {      
      if(this.indx2<3){
        const createdAt = new Date();
        db.collection("ssstQ").add({ pjesma, createdAt, ime, izvodjac });
				db.collection("ssstPL").doc(id).delete();
        this.indx2 = this.indx2 + 1;
				
      }
      else{
        alert("Vec ste pustili 3 pjesme!")
      }
		},
		
		toggle2(){
			document.getElementById("choose-home").style.display = "none";
			document.getElementById("queue-home").style.display = "block";
			document.getElementById("tijelo-home").style.display = "none";
			document.getElementById("tijelo-home2").style.display = "block";
		
		},

		toggle1(){
			document.getElementById("queue-home").style.display = "none";
			document.getElementById("choose-home").style.display = "block";
			document.getElementById("tijelo-home2").style.display = "none";
			document.getElementById("tijelo-home").style.display = "block";

			
		},

		bug(){
			$("#pop-up-ask").fadeIn(500);
		document.getElementById("pop-up-ask").style.display = "grid";
		},

		zatvoribug(){
			$("#pop-up-ask").fadeOut(300);
		},
}
		
};

</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   margin: 0px;
}

#wrapper-home{
	width: 100%;
	background-color: black;
	margin-bottom: 60px;
}

footer{
	 grid-template-columns: 1fr 1fr;
	 display: grid;
	 position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: #222;
	 height: 60px;
   color: white;
   text-align: center;
}

footer div{
	display: block;
	margin: auto;
}

footer img{
	max-width: 25px;
}

header{
	width: 100%;
	position: fixed;
	top: 0;
	text-transform: uppercase;
	min-height: 50px;
	border-bottom: 10px solid rgb(0, 180, 219);
	color: rgb(0, 180, 219);
	padding: 12.5px 0;
	font-size: 20px;
	background: black;
}

#varijanta1, #varijanta2{
	display: grid;
	grid-template-columns: 90% 10%;
	text-align: left;
	padding: 10px 0;
	padding-left: 20px;
	padding-right: 10px;
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

#tijelo-home,#tijelo-home2{
	max-height: 100%;
	overflow-y: auto;
	margin-top: 65px;
}
#varijanta1 img{
	width: 25px;
}

#tijelo-home2, #queue-home{
	display: none;
}
body{
		background: black;
	}

</style>

