<template>
    <div class="login">
        <h3> Sign in </h3>
        <form v-on:submit.prevent="login">
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button type="submit">Log in</button>
        </form>
        <button v-on:click.prevent="passwords">xd</button>
        <p><router-link to="/sign-up">Create account</router-link></p>
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
    }
  }
};
</script>

<style scoped>
</style>