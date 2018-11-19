


<template>
<!---
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
--------------> 

   
<div id="wrapper">
	<nav>
		<img id="menuicon" onclick="change()" src="./imgs/menuicon.png">		
	</nav>

	<div id="dodaj-pjesmu">
		<div></div>

		<div id="centralni">

			<div>
				<input id="search-box" type="text" placeholder="Search.." name="search">
      			<button id="search-icon" type="submit"><i class="fa fa-search"></i></button>
			</div>
			
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


			<div id="kemal_sam">
				<h3>Izabrali ste pjesmu:</h3>
				<iframe width="320" height="315" src="https://www.youtube.com/embed/t5GhBdU_Q74" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<div></div>
			</div>
		<div style="border-bottom: solid 2px #4c8fff;"></div> <!-- De živ bio ovo promijeni -->
		<h1 id="acc-natpis">Your account</h1>
		<div id="karte">
		    <img src="imgs/user2.jpg" alt="Card image"> 
		    <h4>Ime i prezime</h4>
		    <p>Some example text.</p>
		    <a href="#"><button id="kemal_sam2">Log in</button></a>
		    <a href="#"><button id="kemal_sam3">Registruj se</button></a>
		</div>
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

function change() {

    var centralni = document.getElementById("centralni");
    var tijelo = document.getElementById("tijelo");
    var kontakt = document.getElementById("kontakt");
    var novosti = document.getElementById("novosti");

    if (centralni.style.display === "none") {
        $("#novosti").fadeOut(300);
        setTimeout(function(){ centralni.style.display = "grid"; kontakt.style.display = "block"; }, 250);
        tijelo.style.overflow = "visible";
        novosti.style.display = "none";
    } 
    else {
        centralni.style.display = "none";
        $("#novosti").fadeIn(300);
        tijelo.style.overflow = "hidden";
        kontakt.style.display ="none";
        novosti.style.display = "grid";
    }
}

function bug(){
	$("#pop-up-ask").fadeIn(500);
	document.getElementById("pop-up-ask").style.display = "grid";
}

function zatvoribug(){
	$("#pop-up-ask").fadeOut(300);
}
/*
document.getElementById("kemal_sam2").setAttribute("disabled", true);
document.getElementById("kemal_sam3").setAttribute("disabled", true);*/
</script>


<style>
/*@media only screen and (max-width: 600px){*/
	body{
		margin: 0;
		width: 100%;
		font-family: 'Roboto', sans-serif;
		overflow-x: hidden;
		}

		#pop-up-ask{
			display: none;
			grid-template-columns: 1fr 8fr 1fr;
			width: 100%;
			height: 100%;
			position: fixed;
			background-color: rgba(0, 0, 0, 0.7);
			z-index: 2000;
			top: 0;
			justify-content: center;
		}

		#submit2{
			margin: 0;
			background-color: #4c8fff; 
			border: none;
			color: white;
			text-align: center;
			text-decoration: none;
			display: grid;
			border-radius: 2px;
			height:22px;  
			width: 70%;
			margin: auto;
		}

		#pop-up-ask img{
			position: absolute;
			width: 25px;
			margin: 5%;
		}

		#bg-modal{
			margin: auto;
		}
		footer p a {
			color: #330000;
			font-weight: bold;
		}

		footer p a:hover{
			cursor: pointer;
		}

		nav{
			width: 100%;
			background: #4c8fff;
			height: 50px;
		}

		nav img{
			padding-right: 25px;
			float: right;
			width: 40px;
			height: 50px;
		}

		footer{
			color: white;
			padding: 10px;
			text-align: center;
			line-height: 0.8em;
			width: 100%;
			height: 200px;
			background-color: #4c8fff;
		}

		footer img{
			margin: 0px 5px 10px 5px;
			width: 30px;
		}

		#wrapper{
			background: rgba(76, 143, 255, 0.15);;
			box-sizing: border-box;
			display: block;
			background-image: url("imgs/logo.png");
			background-attachment: fixed;
			background-repeat: no-repeat;
			background-position: center; 
			}

			#dodaj-pjesmu{
				display: grid;
				grid-template-columns: 1fr  8fr 1fr;

			}
			#centralni{
				display: grid;
				grid-row-gap: 1em;
				float: none;
			}

			#dodaj-pjesmu > div:nth-child(2) {
				width: 100%;
				padding: 10px 0;
				text-align: center;
  				color: white;
			}

			#centralni button{
				margin: 0;
			 	background-color: #4c8fff; 
			    border: none;
			    color: #383838;
			    text-align: center;
			    text-decoration: none;
			    display: inline-block;
			    height:22px; 

			}

			#search-box{
				margin: 0;
			}

			#centralni button:active{
				background-color: #9bc0ff;
				transition: 0.1s ease-in;
			}

			#karte img{
				width: 200px;
				height: 200px;
				border-radius: 2px;
				box-shadow: 2px 2px 2px 2px #444444;

			}


			#karte{
				color: black;
				padding-bottom: 20px;
			}

			#karte button{
				background: #4c8fff;
				border-radius: 2px;
				width: 50%;
				margin: 5px;
				cursor: pointer;
			}

			#karte a button{
				text-decoration: none;
				color: white;
				font-weight: bold;
			}

			#karte button:active{
				background-color: #9bc0ff;
				transition: 0.1s ease-in;
			}
			#karte button:active a{
				color:  #330000;
			}

			#acc-natpis{
				color: #330000;
			}

			table {
			    font-family: arial, sans-serif;
			    border-collapse: collapse;
			    width: 100%;
			    color: #330000;
				border-radius: 25px;
			}

			td, th {
			    border: 1px solid #dddddd;
			    text-align: left;
			    padding: 5px 8px;
			}



			tr{
			    background-color: rgba(76, 143, 255, 0.3);
			
			}

			tr:nth-child(1) {
			    background-color: #4c8fff;
			}

			tr:hover{
				background: red;
			}
			
			#tabela{
				margin: auto;
			}

			#kemal_sam{
				grid-template-columns: auto  400px auto;
				color: #330000;

			}

			#kemal_sam > div:nth-child(2) {
				width: 100%;
				padding: 50px 0;
				text-align: center;
  				background: red; 
			}

			#novosti{
				padding-top: 100px;
				grid-template-rows: 0;
				grid-template-columns: 1fr 8fr 1fr;
				width: 100%;
				height: 800px;
				background: rgba(76, 143, 255, 0.2);
				display: none;
			}

			#menuicon:hover{
			cursor: pointer;
		}

			

@media only screen and (max-width: 350px){
	iframe {
		width: 300px;
		height: 300px;
	}
}




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

