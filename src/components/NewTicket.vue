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
                    <div v-for="(item, index) in filteredUsers" :key="index" v-show="search.length != 0">
                        <div class="filteredAllUsers">
                            <div style="display: flex; flex-direction: row">
                                <button id="user-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg></button>
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
                <span class="text-modal">Followers <svg
                        style="display: inline-block; vertical-align: -0.125em; margin-left: 5px"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg></span>
                <div id="tags-container">
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
                            <button class="button-39" :class="{ note: noteActive }" id="reply-button"> <svg
                                    v-show="this.buttonText == 'Public reply'"
                                    style="display: inline-block; vertical-align: -0.125em; margin-right: 6px"
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                                </svg> <svg v-show="this.buttonText == 'Internal note'"
                                    style="display: inline-block; vertical-align: -0.125em; margin-right: 6px"
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>{{ this.buttonText }} <svg
                                    style="display: inline-block; vertical-align: -0.125em;"
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
                                </svg></button>
                            <template #content>
                                <div id="popcontent-menu-reply">
                                    <div class="menu-component button-text" @click="setPublicReply()"
                                        style="border-bottom: 1px solid rgb(228, 227, 227);"><svg
                                            style="display: inline-block; vertical-align: -0.125em; margin-right: 6px"
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                                        </svg>Public reply</div>
                                    <div class="menu-component button-text" @click="setInternalNote()">
                                        <svg style="display: inline-block; vertical-align: -0.125em; margin-right: 6px"
                                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>Internal note
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
                    <button id="person-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg></button>
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
                <div class="text-modal" >Role</div>

                <div>
                    <Popper placement="top" style="width: 100%;">
                        <div id="staff-type">{{ chosenStaffType }}</div>
                        <template #content>
                            <div id="popcontent-menu-user-type">
                                <div class="menu-component">
                                    Agent
                                </div>
                                <div class="menu-component">
                                    Administrator
                                </div>
                                <div class="menu-component">
                                    Light Agent
                                </div>
                            </div>
                        </template>
                    </Popper>
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
            chosenStaffType: 'Light agent'
        }
    },
    components: {
        TheNavigation,
        Vue3TagsInput,
        Popper,
        VueModal,
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
    border: 1px solid rgb(230, 230, 230);
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

#popcontent-menu-user-type {
    /* margin-left: 15px; */
}

#staff-type{
    border: 1px solid rgb(230, 230, 230);
    height: 24px;
    padding-left: 15px;
    margin-left: 15px;
    padding-top: 5px;
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