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
 -->    
   
<div id="tijelo">

  <div id="wrapper">

    <nav>
		  <img id="menuicon" v-on:click="toggleBtn()" src="./imgs/menuicon.png">		
	  </nav>

    <div id="dodaj-pjesmu">

      <div></div>  <!-- KRAJNJI LIJEVI -->

      <div id="centralni"> <!--- BOG NAM JE DAO SLOVA PA KAO ŠTO SE ZOVE TU JE I POZICIONIRAN -->
        <!-- -->
        <div>
				  <input id="search-box" type="text" placeholder="XDDDD" name="search">
      		<button id="search-icon" type="submit"><i class="fa fa-search"></i></button>
			  </div>
			<!-- -->
     
		 
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
                    <input type="submit" class="btn btn-primary" value="Dodaj" v-on:click.prevent="addSong2(pjesme.pjesma, pjesme.id, pjesme.ime, pjesme.izvodjac)"><br> 
                  </td>
                    </tr>
                  </tbody>
                </table>
								<h3>Pjesme na redu:</h3>
						<table class="table table-striped">
              <thead>
                  <tr>
                      <th>
                        Ime
                      </th>
                      <th>
                        Izvođač
                      </th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="(pjesme, idx) in Songs2" :key="idx">
                  <td>
                    {{pjesme.ime}}
                  </td>
                  <td>
                    {{pjesme.izvodjac}}
                  </td>
                    </tr>
                  </tbody>
                </table>
              </div>		
					<div style="border-bottom: solid 2px #4c8fff;"></div>

					<h1 id="acc-natpis">Your account</h1>

					<div id="karte">
							<img src="./imgs/user2.jpg" alt="Card image"> 
							<h4>Ime i prezime</h4>
							<p>Some example text.</p>
							<a href="#"><button id="login">Log in</button></a>
							<a href="#"><button id="reg">Registruj se</button></a>
					</div>

            </div>


				<div id="pop-up-ask">
						<div></div>

						<img v-on:click="zatvoribug()" class ="close-icon" src="./imgs/closeicon.png" alt="close-icon">

							<div id="bg-modal" >
										<div>
											<textarea rows="10" cols="30" id="contact-form-msg" name="Msg" placeholder="Molimo Vas da opišite bug sa kojim ste se susreli!"></textarea> 
											<br>
											<button id="submit2" type="submit">Submit</button>
										</div>
						</div>
						<div></div>
					</div>

    
      </div>

      <!-- -->

      
      
      <!--- TRPAT ELEMENT IZNAD OVOGA DA BI BILO SVE U JEDNOJ LINIJI -->
      <div></div> <!---- KRAJNJI DESNI -->
      
    </div>
 <!-- -->
 <footer id="kontakt">
      <p v-on:click="bug()"> Našli ste bug? Prijavite ga <a>ovdje</a></p>
      <p>Telefon: </p>
      <p>Email: </p>
      <p>Adresa: (Grad, Poštanski broj)</p>
      <a href="https://facebook.com/" target="_blank"><img src="./imgs/fblogoblack.png"></a>
      <a href="https://instagram.com/" target="_blank"><img src="./imgs/iglogoblack.png"></a>
      <a href="https://twitter.com/" target="_blank"><img src="./imgs/twitterlogoblack.png"></a>
      <a href="https://linkedin.com/" target="_blank"><img src="./imgs/linkedinlogoblack.png"></a>
    </footer>
  	<div id="novosti">
		<div></div>

		<div id="tabela2">
			<div>Nove pjesme koje smo dodali na playlistu su:</div>
			
				</div>		
			<div></div>
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
    };
  },
  firestore() {
    return {
      Songs: db.collection("Songs2").orderBy("createdAt"),
			Songs2: db.collection("Songs").orderBy("createdAt")
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
		},
		toggleBtn() {
			var centralni = document.getElementById("dodaj-pjesmu");
			var kontakt = document.getElementById("kontakt");
			var novosti = document.getElementById("novosti");

    if (centralni.style.display === "none") {
				$("#novosti").fadeOut(300);
				setTimeout(function(){ centralni.style.display = "grid"; kontakt.style.display = "block"; }, 250);
        
    } 
    else {
        centralni.style.display = "none";
        $("#novosti").fadeIn(300);
				kontakt.style.display ="none";
				novosti.style.display = "grid";        
   	 	}
		},
		bug(){
			$("#pop-up-ask").fadeIn(500);
		document.getElementById("pop-up-ask").style.display = "grid";
		},
		zatvoribug(){
			$("#pop-up-ask").fadeOut(300);
		}
  }
};

</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   margin: 0px;

}

/*@media only screen and (max-width: 600px){*/
	#tijelo{
		margin: 0;
		display: grid;
		max-width: 100%;
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
      width: 50px;
      height: 40px;

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
				max-width: 200px;
				max-height: 200px;
				border-radius: 2px;
				box-shadow: 2px 2px 2px 2px #444444;
        margin-bottom: 20px;
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
				border: none;
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
				background: #E0CDC5;
			}
			
			#tabela2, #tabela{
				margin: auto;
				color: black;
			}

			#yt_prozor{
				grid-template-columns: auto  300px auto;
				color: #330000;
        margin-bottom: 20px;
			}

			#yt_prozor > div:nth-child(2) {
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
	#tijelo{
		max-width: 320px;
	}
	iframe {
		width: 280px;
		height: 300px;
	}
}
</style>

