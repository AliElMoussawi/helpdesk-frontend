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
        <span id="add-button" @click="navigate()"> + Add </span>
    <div class="dropdown-content">
        <div class="adding">New</div>

        <router-link id="a" to="/newTicket"> + Add ticket </router-link>
        <a  id="a" class="addgroup" @click="showModalAddUser = true">Add user</a>
        <a  id="a" class="addgroup" @click="showModalAddGroup = true">Add group</a>
        <router-link id="a" to="/Modal">search </router-link>
    </div>   </div>
    </header>
   <VueModal v-model="showModalAddGroup" title="Add Group" style="display: flex; flex-direction: column;">

            <div class="text-modal">Name</div>
            <div><input type="text" v-model="newGroupName" class="add-user-input"></div>
           <div class ="note">Note:
              <div class ="note_content">Hey there, Only the Administrator of the company can add new groups.</div></div>
            <div style="margin-left:15px; margin-top: 5px;">


            </div>
            <br />
            <div>
                <button class="button-39" @click="addNewGroup()"  id="addButton" >Add</button>
                <button class="button-39" id="cancelButton" @click="showModalAddGroup = false">Cancel</button>
            </div>
            <br />
            <br />
            <br />
        </VueModal>
        <VueModal v-model="showModalAddUser" title="Add new user" style="display: flex; flex-direction: column;">

            <div class="text-modal">Name</div>
            <div><input type="text" v-model="newUserName" class="add-user-input"></div>
            <div class="text-modal">Email</div>
            <div><input type="email" v-model="newUserEmail" class="add-user-input"></div>
            <div class="text-modal">User type</div>
            <div style="margin-left:15px; margin-top: 5px;">
                <label class="radio-cotainer">End user
                    <input type="radio" name="user-type" checked="checked" @click="this.radioChange('end-user')">
                    <span class="checkmark"></span>
                </label>

                <label class="radio-cotainer">Staff member
                    <input type="radio" name="user-type" @click="this.radioChange('staff-member')">
                    <span class="checkmark"></span>
                </label>
            </div>

            <div v-show="this.selectedUserType == 'staff-member'">
                <div class="text-modal">Role</div>
                <div>

                    <div v-show="showMenu" id="staff-menu">
                        <div class="menu-component" @click="changeStaffType('Agent')"
                            style="display:flex;flex-direction:row;padding-left: 5px;">
                            <div style="min-width:16px;margin-right: 5px;">
                                <div v-show="chosenStaffType == 'Agent'">
                                    <svgMain name="tickIcon" />
                                </div>
                            </div>
                            Agent
                        </div>
                        <div class="menu-component" @click="changeStaffType('Administrator')"
                            style="display:flex;flex-direction:row;padding-left: 5px;">
                            <div style="min-width:16px; margin-right: 5px;">
                                <div v-show="chosenStaffType == 'Administrator'">
                                    <svgMain name="tickIcon" />
                                </div>

                            </div>
                            Administrator
                        </div>
                        <div class="menu-component" @click="changeStaffType('Light Agent')"
                            style="display:flex;flex-direction:row;padding-left: 5px;">
                            <div style="min-width:16px; margin-right: 5px;">
                                <div v-show="chosenStaffType == 'Light agent'">
                                    <svgMain name="tickIcon" />
                                </div>

                            </div>
                            Light Agent
                        </div>
                    </div>
                </div>
                <div id="staff-type" @click="showMenu == true ? showMenu = false : showMenu = true">{{ chosenStaffType
                }}
                </div>

            </div>


            <br />
            <div>
                <button class="button-39" id="addButton" @click="addNewUser()">Add</button>
                <button class="button-39" id="cancelButton" @click="showModalAddUser= false">Cancel</button>
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
            newGroupName:null,
            newGroupEmail:null,
            newUserName:null,
            newUserEmail:null,
            showAddUser: true,
            newUserRole: 1,
            selectedUserType: 'end-user',
            chosenStaffType: 'Light agent',
            showMenu: false,
            showModalAddUser:false,
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
        },addNewGroup() {
            axios
                .post(this.url + 'group/', {
                    username: this.newGroupName,
                    email: this.newUserEmail
                }, {
                    headers: {
                        'sessionId': this.$store.state.session,
                        'token': this.$store.state.token
                    }
                })
                .then(() => {
                    this.newGroupName = '';
                    this.newGroupEmail = '';
                    this.showModalAddGroup = false;
                    this.getData();
                }).catch((error) => {
                    console.log(error.response)
                })
        },addNewUser() {
            axios
                .post(this.url + 'user/', {
                    username: this.newUserName,
                    email: this.newUserEmail,
                    category: this.newUserRole
                }, {
                    headers: {
                        'sessionId': this.$store.state.session,
                        'token': this.$store.state.token
                    }
                })
                .then(() => {
                    this.newUserName = '';
                    this.newUserEmail = '';
                    this.newUserRole = 1;
                    this.showModal = false;
                    this.getData();
                }).catch((error) => {
                    console.log(error.response)
                })
        } ,radioChange(val) {
            this.selectedUserType = val;
            if (val == 'Staff member') {
                this.newUserRole = this.roles.find(r => r.name == this.chosenStaffType).id;
            } else {
                this.newUserRole = 1;
            }

        },
        changeStaffType(val) {        
            this.chosenStaffType = val;
            this.newUserRole = this.roles.find(r => r.name == this.chosenStaffType).id;
            this.showMenu == true ? this.showMenu = false : this.showMenu = true;
        },
        navigate(){
            console.log("newTicket") 
            this.$router.push("newTicket")
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



#add-button {
    width: 80px;
    height: 40px;
    font-size: 15px;
    padding-top:15px;
    color: black;
    text-decoration: none;
      position: absolute;
  top: 0%;
  width: 100%;
  text-align: center;
 position: absolute;
will-change: translate3d(0px, 49px, 0px);
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
  display: flex;

  width:80px;
  height: 50px;
  
}

.dropdown-content {
  display: none;
 width:311px;
  height: 225px;
position: absolute;
  background-color: white ;
  min-width: 300px;
  z-index: 1;
  border: 1px solid rgb(160, 159, 159);
  border-radius: 5px;
}
.dropdown-content{
top:35px;
left:15px;
}
.dropdown-content #a {
  color: black;
  padding: 8px 8px;
  text-decoration: none;
  display: block;
}

.adding{
     padding: 8px 8px;
  border-bottom: 0.5px solid rgb(160, 159, 159);
}
.text-modal .note {
    margin-bottom: 5px;
    display: inline-block;
    font-weight: bold;
    padding-left: 15px;
    margin-top: 18px;
}
.note{padding-top: 15px;}
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

.addGroup {
    background-color: #f3f3f3;
    padding-left: 10px;
    margin-right: 15px;
    margin-left: 15px;
    border: 1px solid rgb(230, 230, 230);
    z-index: 1;
}
.note_content{
    
    padding-left: 35px;
    padding-top: 10px;
    border-top-width: 5px;
    width: 400px;
    font-size: 12px;
   color:grey

}
.button-39 {
    background-color: #FFFFFF;
    border: 1px solid  lightgray;
    border-radius: .3rem;
    box-sizing: border-box;
    color: gray;
    font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: .75rem 1rem;
    text-align: center;
    text-decoration: none #D1D5DB solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    touch-action: manipulation;
    width: 60px;
    height: 45px;
}

.button-39:hover {
    background-color: rgb(249, 250, 251);
    z-index: 100;
}

.button-39:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
}

.button-39:focus-visible {
    box-shadow: none;
}
#cancelButton {
    border: none;
    box-shadow: none;
    margin-right: 20px;
    width: 80px;
    font-weight: normal;
    float: right;
}#addButton {
    color: #FFFFFF;
    background-color: rgb(62, 109, 179);
    width: 70px;
    border-radius: 5px;
    font-weight: normal;
    float: right;
}.radio-cotainer {
    display: block;
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.radio-cotainer input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}.info {
    padding-left: 15px;
}

#user-button {
    padding: 4px 6px;
    border-radius: 50%;
    border: 4px solid rgb(207, 206, 206);
    background-color: rgb(207, 206, 206);
    display: inline-block;
    margin-left: 10px;
}

#email {
    font-size: 12px;
    color: #909091
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    border: 1px solid gray;
}

.radio-cotainer:hover input~.checkmark {
    background-color: rgb(235, 245, 252);
    border: 1px solid #124f81;
}

.radio-cotainer input:checked~.checkmark {
    background-color: #124f81;
    border: 1px solid #124f81;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.radio-cotainer input:checked~.checkmark:after {
    display: block;
}

.radio-cotainer .checkmark:after {
    top: 5px;
    left: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
}
.menu-component {
    height: 35px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #FFFFFF;
}
#staff-type {
    border: 1px solid rgb(230, 230, 230);
    height: 24px;
    padding-left: 15px;
    margin-left: 15px;
    padding-top: 5px;
    border-radius: 5px;
}

#staff-type {
    border: 1px solid rgb(230, 230, 230);
    height: 24px;
    padding-left: 15px;
    margin-left: 15px;
    padding-top: 5px;
    border-radius: 5px;
}

#staff-menu {
    border: 1px solid rgb(230, 230, 230);
    margin-left: 14px;
    position: absolute;
    top: 210px;
    width: calc(100% - 60px);
    border-radius: 5px;
}
.menu-component:hover {
    cursor: pointer;
    background-color: aliceblue;
}
#a{
height: 20px;width: 94.5%; 
font-size:12px;
}
</style>