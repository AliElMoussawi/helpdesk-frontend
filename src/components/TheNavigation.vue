<template>
    <header>
        <nav>
            <div>
                <Popper>
                    <button id="user-button">
                        <svgMain name="personFill" />
                    </button>
                    <template #content>
                        <div id="popcontent-menu">
                            <div class="menu-component">Product updates</div>
                            <div class="menu-component">Get help</div>
                            <div class="menu-component">Support help center</div>
                            <div class="menu-component">Keyboard shortcuts</div>
                            <div class="menu-component">Support help center</div>
                            <div class="menu-component">Give feedback</div>
                            <div class="menu-component">About</div>
                            <div class="menu-component">Privacy policy</div>
                            <div class="menu-component" @click="signout()">Sign out</div>
                        </div>
                    </template>
                </Popper>
            </div>
        </nav>
        <div >
            <router-link id="add-button" to="/newTicket"> + Add </router-link>
        </div>
    </header>
</template>

<script>
import Popper from "vue3-popper";
import axios from 'axios'
import router from '../router'
import svgMain from  './svgMain.vue'
export default {
    data() {
        return {
            url: 'http://localhost:8080/',
        }
    },
    components: {
        Popper,
        svgMain,
    },
    methods: {
        async signout() {
            var instance = axios.create({
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                }
            })
            instance.get(this.url + 'auth/signOut').then(() => {
                this.$store.commit('signout')
                router.push({ name: 'Login' })
            })
        }
    }
}
</script>

<style scoped>
header {
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 25px;
    height: 50px;
    background: #ffffff;
    transition: background 0.3s ease-in-out;
    border-bottom: 1px solid rgb(230, 230, 230);
    z-index: -2;
}

header nav {
    display: flex;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1;
    margin-right: 20px;
    align-items: right;
    justify-content: end;
}

#user-button {
    padding: 4px 6px;
    border-radius: 50%;
    border: 4px solid rgb(231, 231, 231);
    background-color: rgb(231, 231, 231);
}

#popcontent-menu {
    width: 180px;
    background: rgb(255, 255, 255);
    padding-top: 5px;
    border: 1px solid rgb(233, 230, 230);
    border-radius: 10px;
    margin-right: 30px;
}

#popcontent-menu :hover {
    background-color: aliceblue;
}

.menu-component {
    height: 35px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
}

#add-button {
    border: none;
    background: none;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    color: black;
    text-decoration: none;
}

#add-button:hover {
    cursor: pointer;
}

</style>