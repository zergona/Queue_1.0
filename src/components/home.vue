<template>

<div id = "wrapper-home">

<header>
	<div id="choose-home">Pick a song:</div>
	<input id="search-box" style="height:25px" v-model="search" @input="delay()" placeholder="Search">
	<div id="queue-home">In Queue:</div>
</header>

<div id="tijelo-home">
	<div class="tijelo-pjesme" v-if="pretraga[idx] != ''" v-for="(pjesme, idx) in pretraga" :key="idx" > 
			<div>
				<div id="pjesma-ime">{{pjesme.ime}}</div>
					<div id="pjesma-izv">{{pjesme.izvodjac}}</div>
				</div>
			<div id="pjesma-add"><img v-on:click.prevent="addSong3(pjesme.pjesma, pjesme.id, pjesme.ime, pjesme.izvodjac)" src="./imgs/add.png"><br></div> 
	</div>
	
	<div class="tijelo-pjesme" v-for="(pjesme, idx) in Songs" :key="idx" >
		<div>
			<div id="pjesma-ime">{{pjesme.ime}}</div>
				<div id="pjesma-izv">{{pjesme.izvodjac}}</div>
			</div>
			<div id="pjesma-add"><img v-on:click.prevent="addSong2(pjesme.pjesma, pjesme.id, pjesme.ime, pjesme.izvodjac)" src="./imgs/add.png"><br></div> 
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

<div class="se-pre-con"></div>

<div id="footer-home">
	<div v-on:click="toggle1()" id="list-home-btn"><img src="./imgs/noteblue.png"><p>Playlist</p></div>
	<div v-on:click="toggle2()" id="queue-home-btn"><img src="./imgs/playblue.png"><p>Queue</p></div>
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
      indx2: 0,
	  Songs2: [],
	  unos: "",
	  pretraga: [],
	  i: 0					
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
      db.collection("ssstQ").add({ pjesma, createdAt, ime, izvodjac });
	},
	
	//KEMICA ---------------------------------------
    addSong2(pjesma, id, ime, izvodjac) {      
	 	this.i++;	
		var val = window.sessionStorage.getItem('provjera');
	
	if (val < 3){
		 window.sessionStorage.setItem('provjera', this.i);
	 //if(this.indx2<3){
	    const createdAt = new Date();
        db.collection("ssstQ").add({ pjesma, createdAt, ime, izvodjac });
		db.collection("ssstPL").doc(id).delete();
        this.indx2 = this.indx2 + 1;
				
		
	  	
	  }
      else{
        alert("Vec ste pustili 3 pjesme!")
      }
		},

		 addSong3(pjesma, id, ime, izvodjac) {  
		this.i++;	
		var val = window.sessionStorage.getItem('provjera');
		
		if (val < 3){
		 window.sessionStorage.setItem('provjera', this.i);	     
      if(this.indx2<3){
        const createdAt = new Date();
        db.collection("ssstQ").add({ pjesma, createdAt, ime, izvodjac });
		db.collection("ssstPL").doc(id).delete();
		this.indx2 = this.indx2 + 1;

		for(var i = 0; i < this.pretraga.length; i++){
			if (this.pretraga[i].izvodjac == izvodjac && this.pretraga[i].ime == ime){
           		this.pretraga[i] = "";									
					}
				}
			}
		}
		else{
        alert("Vec ste pustili 3 pjesme!")
      }
		},
//KEMICA -----------------------------------------------------------
	delay(){
		window.setTimeout(this.search1, 150);
	},

	search1(){

			var input = document.getElementById("search-box").value;
			this.unos = input.toLowerCase().trim();
							
			if(this.unos != ""){

			for (var i = 0; i < this.Songs.length; i++){
	
				if (this.Songs[i].izvodjac.toLowerCase().trim().includes(this.unos) == true || this.Songs[i].ime.toLowerCase().trim().includes(this.unos) == true){
					
					this.pretraga.push(this.Songs[i]);
									
					}			
				}
		}
		else {
				this.pretraga = [];
			}

				if (this.unos != ""){
					$(".tijelo-pjesme").children().css("display", "none");
						
				}

				else{
						$(".tijelo-pjesme").children().css("display", "block");
				}					
				
	},
		
		toggle2(){
			document.getElementById("choose-home").style.display = "none";
			document.getElementById("queue-home").style.display = "block";
			document.getElementById("tijelo-home").style.display = "none";
			document.getElementById("tijelo-home2").style.display = "block";
			document.getElementById("search-box").style.display = "none";
									
		},

		toggle1(){
			document.getElementById("queue-home").style.display = "none";
			document.getElementById("choose-home").style.display = "block";
			document.getElementById("tijelo-home2").style.display = "none";
			document.getElementById("tijelo-home").style.display = "block";
			document.getElementById("search-box").style.display = "block";
			document.getElementById("search-box").style.margin = "auto";
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

#footer-home{
   grid-template-columns: 1fr 1fr;
   display: grid;
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   padding-top: 5px;
   background-color: #222;
   height: 60px;
   color: white;
   text-align: center;
   border-top: rgb(0, 180, 219) 3px solid;
   
}

.tijelo-pjesme{
	display: grid;
	grid-template-columns: 5fr 1fr;
	text-align: left;
}

.fade-enter-active, .fade-leave-active {
  transition: 1.5s;
}

.tijelo-pjesme div{
	margin: 3px 10px;
}

#footer-home div{
	display: block;
	margin: auto;
}

#footer-home img{
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

 #varijanta2{
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

#tijelo-home{
	max-height: 100%;
	overflow-y: auto;
	margin-top: 100px;
}


#tijelo-home2{
	max-height: 100%;
	overflow-y: auto;
	margin-top: 60px;
}

.tijelo-pjesme img{
	width: 25px;
}

#tijelo-home2, #queue-home{
	display: none;
}
body{
		background: black;
	}

</style>

