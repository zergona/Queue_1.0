<template>
    
    
    <div class="login">
      	

				<div id="centralni-login">
					Make your day a bit better, <br> order your favourite song!
				</div>
				
		 <!--  <footer id="footer2">
					<div>
            <br>
            <br>
            <br>
						<a href="https://www.facebook.com/Ho%C5%A1-Muzi%C4%8Dku-198880370989464/" target="_blank"><img src="./imgs/facebook.png"></a>
						<a href="" target="_blank"><img src="./imgs/instagram.png"></a>
					</div>
				</footer> -->
        <form v-on:submit.prevent="login">
        <br>
        <input type="text" v-model="email" placeholder="Email"><br><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button type="submit">Log in</button>
        </form>
    </div>
  

</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data: function() {
    return {
      pass: ""
    };
  },
  methods: {
    passwords: function() {
      for (var i = 0; i < 100; i++) {
        var generator = require("generate-password");
        var password = generator.generate({
          length: 10,
          numbers: true
        });
        db.collection("Passes").add({ password });
      }
    },
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("admin");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
  showPassword() {
        var x = document.getElementById("pw-input");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
  }
};
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


.login{
	background: black; 
	width: 100%;
	height: 100%;
	position: fixed;
}

footer{
	position: fixed;
	bottom: 0;
	height: 100px;
	width: 100%;
	background: black;
}

#header2 img{
	width: 200px;
}

#centralni-login{
		margin-top: 20px;
		padding: 5px 0;
		border-top: 5px solid rgb(0, 180, 219);
		border-bottom: 5px solid rgb(0, 180, 219);
		color: rgb(0, 180, 219);
		font-weight: bold;
		font-size: 25px;
}

.login button{
	margin-top: 30px;
	padding: 5px 0;
	font-size: 25px;
	font-weight: bold;
	width: 250px;
	background: black;
	color: rgb(0, 180, 219);
	border: 3px solid rgb(0, 180, 219);
	border-radius: 30px;
}

#footer2 img{
	padding: 10px 20px;
	height: 70px;
}

#footer2{
	font-size: 20px;
	color: rgb(0, 180, 219);
	font-weight: bold;

}

</style>