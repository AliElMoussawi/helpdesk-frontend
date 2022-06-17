<template>
    <div class="container">
        <div id="title">
            <h1 id="text-title">helpdesk</h1>
        </div>
        <div id="box-container">
            <div class="box">

                <p>Sign in to your account</p>

                <span class="label">Username</span>
                <input v-model="this.username" type="text" id="email" name="email">
                <span class="label">Password</span>
                <input v-model="this.password" type="password" id="password" name="password">

                <button id="login-button" v-on:click="login()">Sign in</button>

                <p class="bottom-text">Forgot my password</p>
                <br />
                <p class="bottom-text">Privacy Policy</p>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
    name: 'LoginItem',

    data() {
        return {
            username: '',
            password: '',
            url: 'http://192.168.3.25:8080/',
        }
    },
    methods: {
        login() {
            axios
                .post(this.url + 'auth/login', {
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    this.$store.commit('login', response.data)
                    router.push({name: 'Tickets'})
                    // console.log(this.$store.state)
                }).catch((error) => {
                    console.log(error.response)
                })
        }
    }

}

</script>
<style>
body,
html {
    margin: 0;
    padding: 0;
}
</style>
<style scoped>
#box-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.conatiner {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#text-title {
    border-bottom: 1px solid rgb(240, 240, 240);
    font-family: 'Maven Pro', sans-serif;
    font-family: 'Ubuntu', sans-serif;
    padding-left: 5%;
    padding-bottom: 20px;
}

.box {
    font-family: 'Roboto', sans-serif;
    width: 90%;
    max-width: 300px;
    border: 6px solid rgb(220, 220, 220);
    border-radius: 5px;
    padding: 40px;
    margin: 10px;
}

.label {
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    text-align: left;
}

.bottom-text {
    font-size: 12px;
    color: rgb(71, 71, 71);
    text-align: center;
    width: 100%;
}

.bottom-text:hover {
    text-decoration: underline;
    cursor: pointer;
}

span::after,
span::before {
    content: '\A';
    white-space: pre;
}

input {
    width: 98%;
    height: 30px;
    margin-top: 5px;
}

#login-button {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 5px;
    color: white;
    font-weight: bold;
    background-color: #1f73b7;
    border-radius: 5px;
    border: none;
    padding-top: 5px;
    padding-bottom: 5px;
    height: 40px;
}

p {
    text-align: center;
}
</style>