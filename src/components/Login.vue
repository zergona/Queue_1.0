<template>
    
    
    <div class="login">
      
        <form id="wrapper" v-on:submit.prevent="login">
       <div></div>
<!-------------------------------------->
	<div id="tijelo">
	
		<div id="icon-user">
			<div></div>
			<div>
				<img src="./imgs/user.png" class="user-logo">
			</div>
			<div></div>
		</div>

		<div id="icon-email">
			<div></div>
			<div>
				<img src="./imgs/email.png">
			</div>
			<div></div>
		</div>
		
		<div id="email">
			<input type="text" v-model="email" placeholder="Email">
		</div>
		
		<div id="icon-key">
			<div></div>
			<div>
				<img src="./imgs/pw.png">
			</div>
			<div></div>
		</div>
		
		<div id="pw">
			<input type="password" v-model="password" placeholder="Password" id="pw-input">
		</div>
		
		<div id="show-pw">
			<div id="wrap"><input type="checkbox" v-on:click="showPassword()"><p>Show password</p></div>
		</div>
		
		<div id="btn">
			<div></div>
			<div>
				<button type="submit">Log in</button>
			</div>
			<div></div>
		</div>
		
		<div id="ostalo">
			<a href="#">Forgot password?</a>
      <p><router-link to="/sign-up">Create account</router-link></p>
		</div>
	
	</div>
<!-------------------------------------->
	<div></div>

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
            this.$router.replace("home");
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

#wrapper{
	margin: 10% auto;
	display: grid;
	grid-template-columns: 1fr 8fr 1fr;
	
}

#tijelo{
	box-sizing: border-box;
}

#tijelo img, input{
	display: block;
	margin: auto;
	padding-bottom: 15px;
  border: none;
}


#email input, #pw input{
  height: 30px;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  padding-top: 15px;
}

#icon-user img{
	border-bottom: solid black 2px;
	max-width: 100px;
	max-height: 100px;
}

#icon-user{
	display: grid;
	grid-template-rows: 1fr 5fr 1fr;
}

#tijelo{
	width: 100%;
	background:rgba(66, 134, 244, 0.5);
	}

#icon-email, #icon-key{
	width: 100%;
	height: 30px;
	display: grid;
	padding: 10px 0;
	grid-template-rows: 1fr 10fr 1fr;
}

#icon-email img{
	height: 30px;
}
/*
#icon-key{
	display: grid;
	grid-template-rows: 1fr 10fr 1fr;
	width: 100%;
	height: 50px;
}*/

#icon-key img{
	height: 30px;
}

#show-pw{
	margin: auto;
	display: block;
  padding: 10px 0;
  max-height: 40px;
 }

#show-pw div{
	margin: auto;
	display: block;
	text-align: center;
}
#btn{
	display: grid;	
	}

#btn button{
	font-weight: bold;
	height: 40px;
	width: 150px;
	display: block;
	margin: auto;
	border: none;
	border-radius: 5px;
}

#show-pw input, #show-pw p{
	display: inline-block;
	text-align: center;
}

#wrap{
	text-align: center;
}

#ostalo{
	padding: 10px 0;
	text-align: center;
}

</style>