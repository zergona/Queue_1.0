<template>
    <div class="sign-up">
        <p>Please fill in all information</p>
        <form v-on:submit.prevent="signUp">
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button type="submit">Register</button>
        </form>
        <p><router-link to="/login">Go back to login</router-link></p>
        
    </div>
</template>
<script>
import firebase from 'firebase'
    export default{
        name: 'signUp',
        data: function() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            signUp: function(){                
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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

<style scoped></style>