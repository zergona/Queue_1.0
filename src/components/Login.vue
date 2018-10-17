<template>
    <div class="login">
        <h3> Sign in </h3>
        <form v-on:submit.prevent="login">
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button type="submit">Log in</button>
        </form>
        <p><router-link to="/sign-up">Create account</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase'
    export default {
        name: 'login',
        data: function(){
            return {}
        },
        methods: {
            login: function(){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        this.$router.replace('HelloWorld')
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    },
                    
                );

            }
        }

    }


</script>

<style scoped>
</style>