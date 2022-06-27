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
    <div class="dropdown">
        <router-link id="add-button" to="/newTicket"> + Add </router-link>
    <div class="dropdown-content">
        <router-link id="a" to="/newTicket"> + Add ticket </router-link>
        <router-link id="a" to="/Modal">search </router-link>
        <a  id="a addgroup" @click="showModalAddGroup = true">Add group</a>
        <router-link id="a" to="/Modal">search </router-link>
    </div>
       
    </div>
    </header>
   <VueModal v-model="showModalAddGroup" title="Add new user" style="display: flex; flex-direction: column;">

            <div class="text-modal">Name</div>
            <div><input type="text" class="add-user-input"></div>
            <div class="text-modal">Email</div>
            <div><input type="email" class="add-user-input"></div>
            <div class="text-modal">User type</div>
            <div style="margin-left:15px; margin-top: 5px;">


            </div>

            <div v-show="this.selectedUserType == 'staff-member'">
                
                <div id="staff-type" @click="showMenu == true ? showMenu = false : showMenu = true">{{ chosenStaffType
                }}
                </div>

            </div>


            <br />
            <div>
                <button class="button-39" id="addButton" >Add</button>
                <button class="button-39" id="cancelButton" @click="showModalAddGroup = false">Cancel</button>
            </div>
            <br />
            <br />
            <br />
        </VueModal>
</template>

<script>
import Popper from "vue3-popper";
import axios from 'axios'
import router from '../router'
import VueModal from '@kouts/vue-modal';
import svgMain from  './svgMain.vue'
export default {
    data() {
        return {
            url: 'http://localhost:8080/',
            showModalAddGroup: false,
             roles: [
                {
                    name: 'New',
                    id: 1
                },
                {
                    name: 'Agent',
                    id: 2
                },
                {
                    name: 'Administrator',
                    id: 3
                },
                {
                    name: 'Light Agent',
                    id: 4
                }
            ]
        }
    },
    components: {
        Popper,
        svgMain,
         VueModal,
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
.dropbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 135px;
  box-shadow: 10px 8px 16px 10px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content #a {
  color: black;
  padding: 8px 8px;
  text-decoration: none;
  display: block;
}
.text-modal {
    margin-bottom: 5px;
    display: inline-block;
    font-weight: bold;
    padding-left: 15px;
    margin-top: 18px;
}
#title {
    padding-top: 3px;
    background-color: rgb(233, 233, 233);
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    width: 80px;
    padding-bottom: 8px;
    padding-left: 10px;
    padding-right: 6px;
}
.dropdown-content #a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #3e8e41;}
.add-user-input {
    width: 95%;
    margin-left: 15px;
    margin-right: 15px;
    height: 25px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
}

#addGroup {
    background-color: #f3f3f3;
    padding-left: 10px;
    margin-right: 15px;
    margin-left: 15px;
    border: 1px solid rgb(230, 230, 230);
    z-index: 5;
}
</style>