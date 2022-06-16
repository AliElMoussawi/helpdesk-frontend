<template>
    <div id="container">
        <TheNavigation style="z-index=100" />
        <div>
            <div id="heading-stripe">
                <div id="title"><span id="new">NEW</span> <span id="title-name">Ticket</span></div>
            </div>
        </div>
        <div class="float-container">
            <div class="child1">
                <span class="text-modal">Requester</span>
                <input type="text" class="icon" placeholder="search name or contact info" v-model="search" autofocus
                    v-on:focusout="delay()" v-on:focus="showAddUser = true">
                <div class="dropdown-content-1" v-if="showAddUser">
                    <div v-for="(item, index) in filteredUsers" :key="index" v-show="search.length != 0"
                        style="border: 1px solid rgb(230, 230, 230)">
                        <div class="filteredAllUsers">
                            <div style="display: flex; flex-direction: row">
                                <button id="user-button">
                                    <svgMain name="personFill"/>
                                </button>
                                <div @click="search = item.userName">
                                    <div class="info">{{ item.userName }}</div>
                                    <div class="info" id="email">{{ item.email }}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <a id="addUser" @click="showModal = true">+ Add user</a>

                </div>
                <span class="text-modal">Assignee</span>
                <span class="text-modal">Followers
                    <svgMain name="infoIcon" />
                </span>
                <input type="text" class="icon" placeholder="search agents" v-model="searchAgents" autofocus
                    v-on:focusout="setAgent()" v-on:focus="showAgents = true">
                <div class="dropdown-content-1" v-show="searchAgents.length != 0 && showAgents == true"
                    style="border: 1px solid rgb(230, 230, 230)">
                    <div v-for="(item, index) in filteredAgents" :key="index">
                        <div class="filteredAllAgents">
                            <div @click="searchAgents = item.userName">
                                <div style="display: flex; flex-direction: row">
                                    <button id="user-button">
                                        <svgMain name="personFill"/>
                                    </button>
                                    <div>
                                        <div class="info">{{ item.userName }}</div>
                                        <div class="info" id="email">{{ item.email }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="tags-container" style="margin-top: 10px;">
                    <span class="text-modal" style="margin-top: 0px;">Tags</span>
                    <div id="tags">
                        <vue3-tags-input :tags="tagsToAdd" placeholder="input tags"
                            @on-tags-changed="handleChangeTagAdd" id="tags" />
                    </div>
                </div>
            </div>
            <div class="child2">
                <div id="subchild1">
                    <input placeholder="Subject" id="subject-input" />
                </div>
                <div id="subchild2"></div>
                <div id="subchild3" style="flex-grow: 2; display: flex; flex-direction: column;"
                    :class="{ note: noteActive }">
                    <div>
                        <Popper placement="top">
                            <button class="button-39" :class="{ note: noteActive }" id="reply-button">
                                <svgMain v-if="this.buttonText == 'Public reply'" name="arrowLeft" />
                                <svgMain v-if="this.buttonText == 'Internal note'" name="pencilNote" />
                                {{ this.buttonText }}
                                <svgMain name="arrowHeadBottom" />
                            </button>
                            <template #content>
                                <div id="popcontent-menu-reply">
                                    <div class="menu-component button-text" @click="setPublicReply()"
                                        style="border-bottom: 1px solid rgb(228, 227, 227);">
                                        <svgMain name="arrowLeft" />
                                        Public reply
                                    </div>
                                    <div class="menu-component button-text" @click="setInternalNote()">
                                        <svgMain name="pencilNote" />
                                        Internal note
                                    </div>
                                </div>
                            </template>
                        </Popper>
                    </div>
                    <div style="flex-grow: 2; margin-right: 4px; margin-bottom: 4px;">
                        <textarea id="textarea-typing" :class="{ note: noteActive }"></textarea>
                    </div>
                </div>
            </div>
            <div class="child3">
                <div style="border-bottom: 1px solid rgb(228, 227, 227);">
                    <button id="person-button">
                        <svgMain name="personTransparent"/>
                    </button>
                </div>
            </div>
        </div>
        <div id="footer">
            <div id="buttons-right">
                <button class="button-39" id="submit-button">Submit</button>
                <Popper>
                    <button class="button-39" id="menu-submit">˅</button>
                    <template #content>
                        <div id="popcontent-menu">
                            <div class="menu-component">
                                <div class='box orange'></div>Submit as <strong>New</strong>
                            </div>
                            <div class="menu-component">
                                <div class='box red'></div>Submit as <strong>Open</strong>
                            </div>
                            <div class="menu-component">
                                <div class='box blue'></div>Submit as <strong>Pending</strong>
                            </div>
                            <div class="menu-component">
                                <div class='box gray'></div>Submit as <strong>Solved</strong>
                            </div>
                        </div>
                    </template>
                </Popper>
            </div>
        </div>
        <VueModal v-model="showModal" title="Add new user" style="display: flex; flex-direction: column;">

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
                <button class="button-39" id="addButton">Add</button>
                <button class="button-39" id="cancelButton" @click="showModal = false">Cancel</button>
            </div>
            <br />
            <br />
            <br />
        </VueModal>
    </div>
</template>

<script>
import TheNavigation from './TheNavigation.vue';
import Vue3TagsInput from 'vue3-tags-input';
import Popper from "vue3-popper";
import VueModal from '@kouts/vue-modal';
import axios from 'axios';
import svgMain from './svgMain.vue'

export default {
    name: 'NewTicket',
    data() {
        return {
            url: 'http://192.168.3.25:8080/',
            tagsToAdd: [],
            buttonText: 'Public reply',
            noteActive: false,
            showModal: false,
            search: '',
            allUsers: [],
            agents: [],
            showAddUser: true,
            newUserName: '',
            newUserEmail: '',
            selectedUserType: 'end-user',
            chosenStaffType: 'Light agent',
            showMenu: false,
            searchAgents: '',
            showAgents: false,
        }
    },
    components: {
        TheNavigation,
        Vue3TagsInput,
        Popper,
        VueModal,
        svgMain
    },
    methods: {
        delay() {
            setTimeout(() => {
                this.showAddUser = false;
            }, 120)
            setTimeout(() => {
                if (this.allUsers.find(g => g.userName === this.search) == undefined) {
                    this.search = ''
                }
            }, 130)
        },
        setAgent() {
            setTimeout(() => {
                this.showAgents = false;
            }, 120)
            setTimeout(() => {
                if (this.agents.find(g => g.userName === this.Agents) == undefined) {
                    this.Agents = ''
                }
            }, 130)
        },
        handleChangeTagAdd(tags) {
            this.tagsToAdd = tags;
        },
        setPublicReply() {
            this.buttonText = 'Public reply';
            this.noteActive = false;
        },
        setInternalNote() {
            this.buttonText = 'Internal note';
            this.noteActive = true;
        },
        async getAllUsers() {
            var instance = axios.create({
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                }
            })
            instance.get(this.url + 'user/').then((response) => {
                this.allUsers = response.data;
            }).catch((error) => {
                console.log(error.response);
            })
        },
        getAgents() {
            var instance = axios.create({
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                }
            })
            instance.get(this.url + 'user/allagents').then((response) => {
                this.agents = response.data;
            }).catch((error) => {
                console.log(error.response);
            })
        },
        getData() {
            this.getAgents();
            this.getAllUsers();
        },
        radioChange(val) {
            this.selectedUserType = val;
        },
        changeStaffType(val) {
            this.chosenStaffType = val;
            this.showMenu == true ? this.showMenu = false : this.showMenu = true;
        }
    },
    created() {
        this.getData();
    },
    computed: {
        filteredUsers() {
            return this.allUsers.filter(item => {
                return ((item.userName.toLowerCase().indexOf(this.search.toLowerCase()) > -1) || (item.email.toLowerCase().indexOf(this.search.toLowerCase()) > -1))
            })
        },
        filteredAgents() {
            return this.agents.filter(item => {
                return ((item.userName.toLowerCase().indexOf(this.searchAgents.toLowerCase()) > -1) || (item.email.toLowerCase().indexOf(this.searchAgents.toLowerCase()) > -1))
            })
        }
    },
}
</script>

<style scoped>
header[data-v-128f56e5] {
    z-index: 100;
}

#container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
}

.icon {
    padding-left: 32px;
    background: url("https://capenetworks.com/static/images/testimonials/user-icon.svg") no-repeat left;
    background-size: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    font-size: 14px;
    margin-left: 15px;
    margin-right: 15px;
    background-position: left 8px top 3px;
}

#heading-stripe {
    height: 45px;
    background-color: rgb(247, 247, 247);
    border-bottom: 1px solid rgb(230, 230, 230);
    padding-left: 20px;
    padding-top: 10px;
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

#new {
    height: 10px;
    background-color: rgb(255, 186, 59);
    border-radius: 5px;
    border-color: transparent;
    font-size: 11px;
    padding: 4px;
}

.box {
    border-radius: 5px;
    height: 15px;
    width: 15px;
    clear: both;
    border: none;
    display: inline-block;
    vertical-align: -0.125em;
    margin-right: 6px;
}

.red {
    background-color: red;
}

.orange {
    background-color: orange;
}

.blue {
    background-color: rgb(0, 132, 255);
}

.gray {
    background-color: gray;
}

#title-name {
    height: 10px;
    border-radius: 5px;
    border-color: transparent;
    font-size: 14px;
    padding: 2px;
}

.float-container {
    display: flex;
    font-family: 'Roboto', sans-serif;
    flex-grow: 2;
}

.child1 {
    width: 25%;
    border-right: 1px solid rgb(228, 227, 227);
    flex-direction: column;
    display: flex;
    font-size: 0.85em;
}

.child2 {
    width: 70%;
    flex-direction: column;
    border-right: 1px solid rgb(228, 227, 227);
    display: flex;
}

.child3 {
    width: 5%;
    flex-direction: column;
    margin-right: 10px;
    margin-left: 10px;
}

#popcontent-menu-reply {
    border: 1px solid rgb(228, 227, 227);
    border-radius: 5px;
    box-shadow: #dcdcdc;
}

#footer {
    border-top: 1px solid rgb(228, 227, 227);
    padding-top: 5px;
    padding-bottom: 5px;
}

#buttons-right {
    float: right;
    width: 150px;
}

#submit-button {
    color: #FFFFFF;
    background-color: rgb(63, 64, 66);
    width: 100px;
    border-radius: 5px 0px 0px 5px;
    border-color: rgb(63, 64, 66);
}

#submit-button:hover {
    background-color: rgb(91, 94, 94);
    border-color: rgb(91, 94, 94);
}

#menu-submit {
    width: 40px;
    margin-left: 1px;
    color: #FFFFFF;
    background-color: rgb(63, 64, 66);
    border-radius: 0px 5px 5px 0px;
    border-color: rgb(63, 64, 66);
}

#menu-submit:hover {
    background-color: rgb(91, 94, 94);
    border-color: rgb(91, 94, 94);
}

.button-39 {
    background-color: #FFFFFF;
    border: 1px solid rgb(62, 109, 179);
    border-radius: .3rem;
    box-sizing: border-box;
    color: rgb(62, 109, 179);
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

.text-modal {
    margin-bottom: 5px;
    display: inline-block;
    font-weight: bold;
    padding-left: 15px;
    margin-top: 18px;
}

#tags-container {
    padding-top: 15px;
    padding-bottom: 15px;
    border-top: 1px solid rgb(228, 227, 227);
    border-bottom: 1px solid rgb(228, 227, 227);
}

#tags {
    padding-left: 15px;
    padding-right: 15px;
}

#person-button {
    background-color: transparent;
    border: none;
    width: 30px;
    height: 30px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

#reply-button {
    width: 170px;
    border: none;
    color: rgb(47, 57, 65);
    box-shadow: none;
}

#reply-button:hover {
    background-color: transparent;
}

#person-button:hover {
    background-color: #f1f8ff;
    border-radius: 5px;
}

#popcontent-menu {
    border: 1px solid rgb(230, 230, 230);
    margin-right: 10px;
    border-radius: 5px;
}

#subchild1 {
    padding: 20px;
}

#subject-input {
    width: 100%;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 5px;
    font-size: 16px;
    padding: 2px;
}

#subchild2 {
    flex-grow: 2;
    border-top: 1px solid rgb(230, 230, 230);
    border-bottom: 1px solid rgb(230, 230, 230);
}

.note {
    background-color: #fff4d7;
}

.note:hover {
    background-color: #fff4d7;
}

.menu-component {
    height: 35px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #FFFFFF;
}

.menu-component:hover {
    cursor: pointer;
    background-color: aliceblue;
}

.inline-block[data-v-5784ed69] {
    display: inline-block;
    border: none !important;
    margin: 0px !important;
}

#textarea-typing {
    border: none;
    resize: none;
    width: 100%;
    outline: none;
    overflow-y: scroll;
    height: 100%;
}

.dropdown-content-1 {
    border-radius: 5px;
    margin-right: 15px;
    margin-left: 15px;
}

.dropdown-content-1 a {
    color: black;
    text-decoration: none;
    padding-left: 10px;
    padding-top: 10px;
    cursor: pointer;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    position: absolute;
    max-width: calc(25% - 45px);
    left: 0;
    right: 0;
}

#addUser {
    background-color: #f3f3f3;
    padding-left: 10px;
    margin-right: 15px;
    margin-left: 15px;
    border: 1px solid rgb(230, 230, 230);
    z-index: 5;
}

.filteredAllAgents,
.filteredAllUsers {
    background-color: #FFFFFF;
    height: 33px;
    border-bottom: 3px solid #FFFFFF;
    border-top: 3px solid #FFFFFF;
    text-decoration: none;
    padding-top: 10px;
    cursor: pointer;
    position: relative;
    width: 100%;
    left: 0;
    right: 0;
    margin-right: 15px;
    padding-bottom: 10px;
}

.filteredAllAgents:hover,
.filteredAllUsers:hover {
    background-color: #e3f0f3;
    border-bottom: 3px solid rgb(146, 179, 216);
    border-top: 3px solid rgb(146, 179, 216);
}

#cancelButton {
    border: none;
    box-shadow: none;
    margin-right: 20px;
    width: 80px;
    font-weight: normal;
    float: right;
}

#addButton {
    color: #FFFFFF;
    background-color: rgb(62, 109, 179);
    width: 70px;
    border-radius: 5px;
    font-weight: normal;
    float: right;
}

.info {
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

.radio-cotainer {
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

.add-user-input {
    width: 95%;
    margin-left: 15px;
    margin-right: 15px;
    height: 25px;
    border: 1px solid rgb(230, 230, 230);
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
</style>

<style>
.v3ti span.v3ti-tag {
    display: flex;
    font-weight: 400;
    margin: 3px;
    padding: 0 5px;
    background: #f3f3f3 !important;
    color: #000000 !important;
    height: 27px;
    border-radius: 5px;
    align-items: center;
    border: 1px solid #636363;
}

.v3ti .v3ti-tag .v3ti-remove-tag {
    color: #000000;
    transition: opacity 0.3s ease;
    opacity: 0.8;
    cursor: pointer;
    padding: 0 5px 0 7px;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
}

.v3ti {
    border-color: rgb(230, 230, 230);
}

.vm-content {
    padding: 10px 15px 15px;
    margin-right: 15px;
}

.vm-titlebar {
    padding: 15px 30px;
    padding-right: 30px;
    overflow: auto;
    border-bottom: 1px solid #e5e5e5;
}
</style>