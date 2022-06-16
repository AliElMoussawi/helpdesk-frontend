<template>
    <TheNavigation />
    <div class="p-10">
        <div id="collapse-left" v-show="!isOpen">
            <button style="margin-left:10px;" class="collapse" @click="isOpen = !isOpen">
                <svgMain name="expandArrow" />
            </button>
        </div>
        <CollapseTransition dimension="width" :duration="500">
            <div class="tab-container" v-show="isOpen">
                <div class="views-title">
                    <button class="collapse" @click="isOpen = !isOpen">
                        <svgMain name="collapseArrow" />
                    </button>
                    <p id="views">Views</p>
                </div>

                <div v-for="col in respectiveColumns" :key="col.tabName">
                    <button class="tab" v-on:click="changeCurrentTab(col.tabName)">
                        {{ col.tabName }} <span id="numTickets">{{ col.respectiveRows.length }}</span>
                    </button>
                </div>
            </div>
        </CollapseTransition>
        <div class="table-container">
            <div id="top-right-elements" style="margin-top: 50px;">
                <button class="button-39" role="button"
                    v-show="this.ticketIdsSelected.length == 0 && (this.currentTypeName != 'Deleted tickets' && this.currentTypeName != 'Suspended tickets')">Play</button>
                <button class="button-39" id="clear-selection" v-show="this.ticketIdsSelected.length != 0"
                    v-on:click="clearSelection()">Clear
                    selection</button>
                <button @click="$refs.modalName.openModal()" class="button-39" id="edit-ticket"
                    v-show="this.ticketIdsSelected.length != 0 && this.currentTypeName != 'Deleted tickets'">Edit
                    ticket</button>

                <Popper>
                    <button class="button-39" id="menu-selected"
                        v-show="this.ticketIdsSelected.length != 0 && this.currentTypeName != 'Deleted tickets'">˅</button>
                    <template #content>
                        <div id="popcontent-menu-edit">
                            <div class="menu-component">Merge tickets into another ticket</div>
                            <div @click="showModal = true" class="menu-component">Delete</div>
                            <div class="menu-component" @click="showModalSpam = true">Mark as spam</div>
                        </div>
                    </template>
                </Popper>
                <button class="button-39" id="restore-ticket"
                    v-show="this.ticketIdsSelected.length != 0 && this.currentTypeName == 'Deleted tickets'"
                    @click="restoreTicket()">Restore
                    {{ this.ticketIdsSelected.length }} ticket(s)</button>

                <Popper>
                    <button class="button-39" id="menu-selected2"
                        v-show="this.ticketIdsSelected.length != 0 && this.currentTypeName == 'Deleted tickets'">˅</button>
                    <template #content>
                        <div id="popcontent-menu-edit2" v-show="this.ticketIdsSelected.length != 0">
                            <div class="menu-component" @click="showModalDeleteForever = true">Delete {{
                                    this.ticketIdsSelected.length
                            }} ticket(s) forever
                            </div>
                            <div class="menu-component" @click="restoreTicket()">Restore {{
                                    this.ticketIdsSelected.length
                            }} ticket(s)</div>
                        </div>
                    </template>
                </Popper>
                <Popper>
                    <button class="button-39" id="down-menu"
                        v-show="this.currentTypeName != 'Deleted tickets' && this.currentTypeName != 'Suspended tickets'">˅</button>
                    <template #content>
                        <div id="popcontent-menu" style="margin-right: 30px;">
                            <div class="menu-component" id="CSV">Export as CSV</div>
                            <div class="menu-component">Edit</div>
                            <div class="menu-component">Clone</div>
                        </div>
                    </template>
                </Popper>
            </div>
            <div id="table-title">
                <h2>{{ this.currentTypeName }}</h2>
                {{ this.respectiveColumns[currentIndex].respectiveRows.length }} tickets
                <br />
                <br />
            </div>
            <table id="tickets">
                <thead>
                    <tr id="header">
                        <th><input name="select_all" type="checkbox" @click="selectAll" v-model="allSelected"></th>
                        <th class="p-5" v-for="(colHead, index) in this.respectiveColumns[currentIndex].tabColumns"
                            :key="index" v-on:click="sortTable(colHead)">
                            {{ colHead }}
                            <div class="arrow" v-if="colHead == sortColumn"
                                v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ticket in this.respectiveColumns[currentIndex].respectiveRows" :key="ticket.id">
                        <td><input type="checkbox" v-model="ticketIdsSelected" @click="select(ticket.id)"
                                :value="ticket.id" /></td>
                        <td v-show="checkExists('ID')">{{ ticket.id }}</td>

                        <td v-show="checkExists('Subject')" id="pop">
                            <Popper hover>
                                {{ ticket.subject }}
                                <template #content>
                                    <div id="popcontent">
                                        <div id="content-header">
                                            <div class="open-badge">OPEN</div>
                                            <div>{{ ticket.type }} ({{ ticket.priority }})</div>
                                        </div>
                                        <br />
                                        <div><strong>{{ ticket.subject }}</strong></div>
                                        <br />
                                        <div>Hey there, I am sending this email beacuse I am having a problem with
                                            setting up my account.
                                            Please help me fix it. Thanks.</div>
                                    </div>
                                </template>
                            </Popper>
                        </td>
                        <td v-show="checkExists('Requester')">{{ ticket.requester.username }}</td>
                        <td v-show="checkExists('Requested')">{{ ticket.requested }}</td>
                        <td v-show="checkExists('Type')">{{ ticket.ticketType == null ? "" : ticket.ticketType.name }}
                        </td>
                        <td v-show="checkExists('Priority')">{{ ticket.priority == null ? "" : ticket.priority.name }}
                        </td>
                        <td v-show="checkExists('Group')">{{ ticket.assignedGroup == null ? ""
                                : ticket.assignedGroup.name
                        }}
                        </td>
                        <td v-show="checkExists('Updated')">{{ ticket.updated }}</td>
                        <td v-show="checkExists('Assignee')">{{
                                ticket.assignedUser == null ? "" : ticket.assignedUser.username
                        }}</td>
                        <td v-show="checkExists('Received')">{{ ticket.requested }}</td>
                        <td v-show="checkExists('Deleted by')">{{ ticket.deletedBy == null ? "" :
                                ticket.deletedBy.username
                        }}</td>
                        <!-- <td v-show="checkExists('Cause of suspension')">{{ ticket.suspension_cause }}</td> -->

                    </tr>
                    <div v-show="this.load" class="loader">Loading...</div>
                </tbody>
            </table>
        </div>
    </div>

    <ModalItem ref="modalName" id="modal">
        <template v-slot:header>
            <h4 id="popup-header">Update {{ this.ticketIdsSelected.length }} ticket(s)</h4>
        </template>

        <template v-slot:body>
            <div class="float-container-popup">
                <div class="float-child-1">
                    <div class="macro">
                        <span class="text-modal">Assignee*</span>
                        <br />
                        <span class="text-modal" id="link-style"
                            @click="changeAssignee(this.getGroup(this.currentUserID) + '/' + this.getUserName(this.currentUserID))">take
                            it</span>
                        <br />
                        <div class="dropdown-1">
                            <button class="dropbtn-1" @click="toggleAssigneePanel()">{{
                                    this.chosenAssignee
                            }} <span class="down-arrow">⯆</span></button>
                            <div class="dropdown-content-1" v-show="assigneeClicked === true">
                                <a @click="changeAssignee('- No Change -')">- No Change -</a>
                                <a @click="groupClicked === false ? groupClicked = true : groupClicked = false">
                                    <svgMain name="groupOfPeople" />
                                    {{ this.getGroup(this.currentUserID) }}
                                    <div style="float: right; margin-right: 8px;">
                                        <svgMain name="expandArrow" />
                                    </div>
                                </a>
                            </div>
                            <div class="dropdown-content-1" v-show="groupClicked === true">
                                <a @click="groupClicked = false">Back</a>
                                <a @click="changeAssignee(this.getGroup(this.currentUserID))">
                                    <svgMain name="groupOfPeople" />
                                    {{ this.getGroup(this.currentUserID) }}
                                </a>
                                <template v-for="user in getCurrentGroupUsers(this.getGroup(this.currentUserID))"
                                    :key="user.id">
                                    <a @click="changeAssignee(this.getGroup(user.id) + '/' + user.userName)">
                                        <div style="margin-right: 5px;"></div>
                                        <svgMain name="personFill" />
                                        {{ user.userName }}
                                    </a>
                                </template>
                            </div>
                        </div>
                        <br />
                        <br />
                        <span class="text-modal">Add Tags</span>
                        <br />
                        <vue3-tags-input :tags="tagsToAdd" placeholder="input tags"
                            @on-tags-changed="handleChangeTagAdd" />
                        <br />
                        <span class="text-modal">Remove Tags</span>
                        <br />
                        <vue3-tags-input :tags="tagsToRemove" placeholder="input tags"
                            @on-tags-changed="handleChangeTagRemove" />
                        <br />
                        <div class="float-container-popup">
                            <div class="type">
                                <span class="text-modal">Type</span>
                                <br />
                                <DropDown :options="this.typeOptions"></DropDown>
                            </div>
                            <div class="type" id="priority-choose">
                                <span class="text-modal">Priority</span>
                                <br />
                                <DropDown :options="this.priorityOptions"></DropDown>
                            </div>
                        </div>
                        <br v-show="chosenType == 'Task'" />
                        <span class="text-modal" v-show="chosenType == 'Task'">Due Date</span>
                        <Datepicker v-model="date" :enableTimePicker="false" weekStart="0" :format="format"
                            :previewFormat="format" placeholder="Select date" :textInputOptions="textInputOptions"
                            textInput v-show="chosenType == 'Task'" />
                    </div>
                </div>
                <div class="float-child-2">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" value="- No Change -">
                    <br />
                    <!-- <EmojiPicker picker-type="textarea" @select="onSelectEmoji" /> -->
                    <div :class="{ note: noteActive }"
                        style="border: 1px solid rgb(228, 227, 227); border-radius: 5px; height: 100%;">
                        <div>
                            <Popper placement="bottom" :show="showPopper">
                                <button :class="{ note: noteActive }" id="reply-button"
                                    @click="showPopper == true ? showPopper = false : showPopper = true">
                                    <svgMain v-if="this.buttonText == 'Public reply'" name="arrowLeft" />
                                    <svgMain v-if="this.buttonText == 'Internal note'" name="pencilNote" />
                                    {{ this.buttonText }}
                                    <svgMain name="arrowHeadBottom" />
                                </button>
                                <template #content>
                                    <div id="popcontent-menu-reply"
                                        style="border: 1px solid rgb(228, 227, 227); border-radius: 5px;">
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
                        <div style="flex-grow: 2; margin-right: 4px; margin-bottom: 4px; margin-left: 10px;">
                            <textarea id="textarea-typing" class="static" :class="{ note: noteActive }"
                                rows="15"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <div id="buttons-right-popup">
                <button class="button-39" id="submit-button">Submit</button>
                <Popper>
                    <button class="button-39" id="menu-submit">˅</button>
                    <template #content>
                        <div id="popcontent-menu3">
                            <div class="menu-component wide">
                                <div class='box red'></div>Submit as <strong>Open</strong>
                            </div>
                            <div class="menu-component wide">
                                <div class='box blue'></div>Submit as <strong>Pending</strong>
                            </div>
                            <div class="menu-component wide">
                                <div class='box gray'></div>Submit as <strong>Solved</strong>
                            </div>
                        </div>
                    </template>
                </Popper>
            </div>
        </template>
    </ModalItem>

    <VueModal v-model="showModal" title="Delete Tickets">
        <p>If you need to restore them, go to Deleted tickets.</p>
        <br />
        <div>
            <button class="button-39" id="deleteButton" @click="deleteTicket()">Delete tickets</button>
            <button class="button-39" id="cancelButton" @click="showModal = false">Cancel</button>
        </div>
        <br />
        <br />
        <br />
    </VueModal>

    <VueModal v-model="showModalDeleteForever" title="Permanently delete ticket(s)">
        <p>This can't be undone.</p>
        <br />
        <div>
            <button class="button-39" id="permanentlyDeleteButton" @click="permanentlyDeleteTicket()">Permanently delete
                ticket(s)</button>
            <button class="button-39" id="cancelButton" @click="showModalDeleteForever = false">Cancel</button>
        </div>
        <br />
        <br />
        <br />
    </VueModal>

    <VueModal v-model="showModalSpam" title="Mark tickets as spam">
        <p>This will delete the tickets and block the requesters.</p>
        <br />
        <div>
            <button class="button-39" id="spamButton">Mark as spam</button>
            <button class="button-39" id="cancelButtonSpam" @click="showModalSpam = false">Cancel</button>
        </div>
        <br />
        <br />
        <br />
    </VueModal>
</template>

<script>

import svgMain from './svgMain.vue'
import ticketsData from '../assets/tickets_data.json';
import Popper from "vue3-popper";
import ModalItem from "./Modal.vue";
import CollapseTransition from "./CollapseTransition.vue";
// import EmojiPicker from 'vue3-emoji-picker';
// import '../assets/emojipickerstyle.css'
import Vue3TagsInput from 'vue3-tags-input';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios'
import TheNavigation from './TheNavigation.vue';
import DropDown from './ourBeautifulDropdown.vue'


export default {
    name: 'ViewTicket',
    components: {
        Popper,
        ModalItem,
        CollapseTransition,
        // EmojiPicker,
        Vue3TagsInput,
        VueModal,
        Datepicker,
        TheNavigation,
        DropDown,
        svgMain
    },
    data() {
        return {
            showPopper: false,
            url: 'http://192.168.3.25:8080/',
            showModalSpam: false,
            showModal: false, //for the deleteTicket
            showModalDeleteForever: false,
            groupClicked: false,
            chosenAssignee: "- No Change -",
            assigneeClicked: false,
            typeOptions: ['- No Change -', 'Question', 'Incident', 'Problem', 'Task'],
            priorityOptions: ['- No Change -', 'Low', 'Normal', 'High', 'Urgent'],
            tagsToAdd: [],
            tagsToRemove: [],
            isOpen: true, // for collapsing the views panel
            ascending: false,
            sortColumn: '',
            currentUserID: this.$store.state.id,
            users: [],
            tickets: [],
            groups: [],
            load: false,
            currentType: "userUnSolvedTickets",
            currentTypeName: "Your unsolved tickets",
            currentIndex: 0,
            ticketIdsSelected: [],
            buttonText: 'Public reply',
            noteActive: false,
            allSelected: false,
            respectiveColumns: [
                {
                    "tabName": "Your unsolved tickets",
                    "tabType": "userUnSolvedTickets",
                    "tabColumns": ['Subject', 'Requester', 'Requested', 'Type', 'Priority'],
                    "respectiveRows": [],

                },
                {
                    "tabName": "Unassigned tickets",
                    "tabType": "unAssignedTickets",
                    "tabColumns": ['Subject', 'Requester', 'Requested', 'Priority', 'Group'],
                    "respectiveRows": []
                },
                {
                    "tabName": "All unsolved tickets",
                    "tabType": "unsolvedTickets",
                    "tabColumns": ['Subject', 'Requester', 'Requested', 'Priority', 'Updated'],
                    "respectiveRows": []
                },
                {
                    "tabName": "Recently updated tickets",
                    "tabType": "updatedTickets",
                    "tabColumns": ['Subject', 'Requester', 'Requested', 'Priority', 'Group', 'Assignee'],
                    "respectiveRows": []
                },
                {
                    "tabName": "New tickets in your groups",
                    "tabType": "newTickets",
                    "tabColumns": ['Subject', 'Requester', 'Requested', 'Priority', 'Assignee'],
                    "respectiveRows": []
                },
                {
                    "tabName": "Pending tickets",
                    "tabType": "pendingTickets",
                    "tabColumns": ['Subject', 'Requester', 'Requested', 'Priority', 'Group', 'Assignee'],
                    "respectiveRows": []
                },
                {
                    "tabName": "Recently solved tickets",
                    "tabType": "solvedTickets",
                    "tabColumns": ['Subject', 'Requester', 'Requested', 'Priority', 'Group'],
                    "respectiveRows": []
                },
                // {
                //     "tabName": "Unsolved tickets in your groups",
                //     "tabType": "unsolvedTickets",
                //     "tabColumns": ['Subject', 'Requester', 'Requested'],
                //     "respectiveRows": []
                // },
                {
                    "tabName": "Suspended tickets",
                    "tabType": 'suspendedTickets',
                    "tabColumns": ['Received', 'Subject'],
                    "respectiveRows": []
                },
                {
                    "tabName": "Deleted tickets",
                    "tabType": "deletedTickets",
                    "tabColumns": ['ID', 'Subject', 'Deleted by'],
                    "respectiveRows": []
                }
            ],
        }
    },

    methods: {
        getTabTypeByName(tName) {
            return this.respectiveColumns.find(c => c.tabName === tName).tabType;
        },
        getIndexByName(tName) {
            return this.respectiveColumns.indexOf(this.respectiveColumns.find(c => c.tabName === tName));
        },
        handleChangeTagAdd(tags) {
            this.tagsToAdd = tags;
        },
        handleChangeTagRemove(tags) {
            this.tagsToRemove = tags;
        },
        toggleAssigneePanel() {
            this.assigneeClicked === false ? this.assigneeClicked = true : this.assigneeClicked = false;
            this.groupClicked = false;
        },
        changeAssignee(newAssignee) {
            this.assigneeClicked === false ? this.assigneeClicked = true : this.assigneeClicked = false;
            this.chosenAssignee = newAssignee;
            this.assigneeClicked = false;
            this.groupClicked = false;
        },
        getUserName(id) {
            return this.users.find(u => u.id === id).username;
        },
        selectAll() {
            this.ticketIdsSelected = [];

            if (!this.allSelected) {
                for (const row of this.respectiveColumns.find(c => c.tabType === this.currentType).respectiveRows) {
                    this.ticketIdsSelected.push(row.id.toString());
                }
            }
        },
        select(id) {
            this.allSelected = false;
            if (this.ticketIdsSelected.includes(id.toString())) {
                const ticketId = this.ticketIdsSelected.indexOf(id.toString());
                this.ticketIdsSelected.splice(ticketId, 1);
            } else {
                this.ticketIdsSelected.push(id.toString());
            }
        },
        sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;

            const tabSort = [
                {
                    name: 'Subject',
                    sort: 'subject',
                    sort1: null
                }, {
                    name: 'Requester',
                    sort: 'requester',
                    sort1: 'username'
                }, {
                    name: 'Requested',
                    sort: 'requested',
                    sort1: null
                }, {
                    name: 'Type',
                    sort: 'ticketType',
                    sort1: 'name'
                }, {
                    name: 'Priority',
                    sort: 'priority',
                    sort1: 'name'
                }, {
                    name: 'Group',
                    sort: 'assignedGroup',
                    sort1: 'name'
                }, {
                    name: 'Updated',
                    sort: 'updated',
                    sort1: null
                }, {
                    name: 'Assignee',
                    sort: 'assignedUser',
                    sort1: 'username'
                }, {
                    name: 'ID',
                    sort: 'id',
                    sort1: null
                }, {
                    name: 'Received',
                    sort: 'requested',
                    sort1: 'name'
                }, {
                    name: 'Deleted by',
                    sort: 'deletedBy',
                    sort1: 'username'
                }
            ];
            const index = tabSort.indexOf(tabSort.find(g => g.name === col));
            if (tabSort[index].sort1 == null) {
                this.respectiveColumns[this.currentIndex].respectiveRows.sort(function (a, b) {
                    if (a[tabSort[index].sort] > b[tabSort[index].sort]) {
                        return ascending ? 1 : -1
                    } else if (a[tabSort[index].sort] < b[tabSort[index].sort]) {
                        return ascending ? -1 : 1
                    }
                    return 0;
                })
            }
            else {
                this.respectiveColumns[this.currentIndex].respectiveRows.sort(function (a, b) {
                    if (a[tabSort[index].sort][tabSort[index].sort1] > b[tabSort[index].sort][tabSort[index].sort1]) {
                        return ascending ? 1 : -1
                    } else if (a[tabSort[index].sort][tabSort[index].sort1] < b[tabSort[index].sort][tabSort[index].sort1]) {
                        return ascending ? -1 : 1
                    }
                    return 0;
                })
            }
        },
        getData() {
            console.log()
            setTimeout(function () { this.load = true; }.bind(this), 10);

            setTimeout(function () {
                for (var respectiveColumn of this.respectiveColumns) {
                    this.getRespectiveRows(respectiveColumn.tabType)
                }
            }.bind(this), 500);

            setTimeout(function () { this.tickets = ticketsData; }.bind(this), 500);
            setTimeout(function () { this.getUsers() }.bind(this), 500);
            setTimeout(function () { this.getGroups() }.bind(this), 500);

            setTimeout(function () { this.load = false; }.bind(this), 500);
        },
        getCurrentGroupUsers(groupName) {
            return this.groups.find(g => g.name === groupName).user;
        },
        getGroup(id) {
            var name = '';
            for (let i = 0; i < this.groups.length; i++) {
                for (let j = 0; j < this.groups[i].user.length; j++) {
                    if (this.groups[i].user[j].id == id) {
                        name = this.groups[i].name;
                        return name;
                    }
                }
            }
            return name;
        },
        getDate(timestamp) {
            if (timestamp == null) {
                return null
            }
            var ts = new Date(timestamp);

            return (ts.getDate() +
                "/" + (ts.getMonth() + 1) +
                "/" + ts.getFullYear() +
                " " + ts.getHours() +
                ":" + ts.getMinutes()
            )
        },
        clearSelection() {
            this.ticketIdsSelected = [];
            this.allSelected = false;
        },
        checkExists(val) {
            try {
                for (let i = 0; i < this.respectiveColumns.length; i++) {
                    if (this.respectiveColumns[i].tabName === this.currentTypeName) {
                        if (this.respectiveColumns[i].tabColumns.includes(val)) {
                            return true;
                        }
                        return false;
                    }
                }
            } catch (e) {
                console.log(e);
            }

            return false;
        },
        changeCurrentTab(val) {
            this.currentTypeName = val;
            this.allSelected = false;
            this.ticketIdsSelected = [];
            this.currentType = this.getTabTypeByName(this.currentTypeName);
            this.currentIndex = this.getIndexByName(this.currentTypeName);
        },
        setPublicReply() {
            this.buttonText = 'Public reply';
            this.noteActive = false;
            this.showPopper = false;
        },
        setInternalNote() {
            this.buttonText = 'Internal note';
            this.noteActive = true;
            this.showPopper = false;
        },
        async getRespectiveRows(type) {
            var instance = axios.create({
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                }
            })
            instance.get(this.url + 'ticket/' + type).then((response) => {
                this.respectiveColumns.find(c => c.tabType === type).respectiveRows = response.data;
            }).catch((error) => {
                console.log(error.response);
            })
        },
        async getGroups() {
            var instance = axios.create({
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                }
            })
            instance.get(this.url + 'group').then((response) => {
                this.groups = response.data;
                console.log(this.groups)
            }).catch((error) => {
                console.log(error.response);
            })
        },
        async getUsers() {
            var instance = axios.create({
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                }
            })
            instance.get(this.url + 'user/').then((response) => {
                this.users = response.data;
            }).catch((error) => {
                console.log(error.response);
            })
        },
        deleteTicket() {
            axios.delete(this.url + 'ticket/deleteTickets', {
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                },
                data: {
                    'ticketsIds': this.ticketIdsSelected
                }
            }).then(() => {
                for (var respectiveColumn of this.respectiveColumns) {
                    this.getRespectiveRows(respectiveColumn.tabType)
                }
            }).then(() => {
                this.showModal = false;
                this.ticketIdsSelected = [];
            });
        },
        permanentlyDeleteTicket() {
            axios.delete(this.url + 'ticket/deleteTicketsForever', {
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                },
                data: {
                    'ticketsIds': this.ticketIdsSelected
                }
            }).then(() => {
                for (var respectiveColumn of this.respectiveColumns) {
                    this.getRespectiveRows(respectiveColumn.tabType)
                }
                this.showModalDeleteForever = false;
                this.ticketIdsSelected = [];
            })
        },
        restoreTicket() {
            axios.patch(this.url + 'ticket/undeleteTickets',
                {
                    'ticketsIds': this.ticketIdsSelected
                }, {
                headers: {
                    'sessionId': this.$store.state.session,
                    'token': this.$store.state.token
                }
            }).then(() => {
                for (var respectiveColumn of this.respectiveColumns) {
                    this.getRespectiveRows(respectiveColumn.tabType)
                }
                this.ticketIdsSelected = [];

            });
        }
    },
    created() {
        this.getData();
    },

    setup() {
        const date = ref();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const format = (date) => {
            const day = date.getDate();
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();

            return `${month} ${day}, ${year}`;
        }
        const textInputOptions = ref({
            format: `mm dd, yyyy`
        })

        return {
            date,
            format,
            textInputOptions,
        }
    },
};
</script> 

<style scoped>
.p-10 {
    width: 100%;
    display: flex;
    font-family: 'Roboto', sans-serif;
}

.tab-container {
    width: 20%;
    display: flex;
    flex-direction: column;
    padding-right: 25px;
    border-right: 1px solid rgb(230, 230, 230);
}

td {
    padding-right: 5px;
    padding-left: 5px;
}

.views-title {
    padding-left: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
    margin-left: 5%;
    padding-top: 20px;
    margin-bottom: 10px;
}

#views {
    width: 100px;
    margin: 0px;
}

button {
    cursor: pointer;
    width: 100%;
    margin-left: 5%;
    padding: 8px;
    background-color: transparent;
    border: 0px;
    text-align: left;
    border-radius: 5px;
}

button:hover {
    background-color: rgb(232, 239, 240);
}

#table-title {
    margin-left: 3%;
}

table {
    margin-left: 3%;
    width: 100%;
}

#tickets td,
#tickets th {
    padding: 12px;
    border: 1px solid rgb(232, 239, 229);
    border-left: none;
    border-right: none;
    border-collapse: collapse;
}

tr:hover {
    background-color: rgb(232, 239, 240);
}

#tickets th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
}

#textarea-typing {
    border: none;
    resize: none;
    width: 100%;
    outline: none;
    overflow-y: scroll;
    height: 100%;
}

.note {
    background-color: #fff4d7;
}

.note:hover {
    background-color: #fff4d7;
}

#header:hover {
    background-color: transparent;
}

table {
    border-collapse: collapse;
}

h5 {
    color: rgb(185, 191, 192);
    margin-left: 30px;
}

.loader {
    color: #000000;
    font-size: 20px;
    margin: 100px auto;
    margin-left: 450%;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
}

@-webkit-keyframes load4 {

    0%,
    100% {
        box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }

    12.5% {
        box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }

    25% {
        box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }

    37.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }

    50% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }

    62.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }

    75% {
        box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }

    87.5% {
        box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
}

@keyframes load4 {

    0%,
    100% {
        box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
    }

    12.5% {
        box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }

    25% {
        box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
    }

    37.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }

    50% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
    }

    62.5% {
        box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
    }

    75% {
        box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
    }

    87.5% {
        box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
    }
}

.arrow_down {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0EAQAAAAxT8tCAAAAAmJLR0T//xSrMc0AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAAfQAAAH0AEy0ozwAABYQSURBVHja7d3nl51VGcbhPTPpEEglIYT03ntID1bs2BuKiAgCgigqKu0/09B77yn03lsgdfywVQxpU845+32f97rW8rNP1kq453f2JNPV29vbmwCAWusufQAAMHgGHQACMOgAEIBBB4AADDoABGDQASAAgw4AARh0AAjAoANAAAYdAAIw6AAQgEEHgAAMOgAEYNABIACDDgABGHQACMCgA0AABh0AAjDoABCAQQeAAAw6AARg0AEgAIMOAAEYdAAIwKADQAAGHQACMOgAEIBBB4AADDoABGDQASAAgw4AARh0AAjAoANAAAYdAAIw6AAQgEEHgAAMOgAEYNABIACDDgABGHQACMCgA0AABh0AAjDoABCAQQeAAAw6AARg0AEgAIMOAAEYdAAIwKADQAAGHQACMOgAEIBBB4AADDoABGDQASAAgw4AARh0AAjAoANAAAYdAAIw6AAQgEEHgAAMOgAEYNABIACDDgABGHQACMCgA0AABh0AAjDoABCAQQeAAAw6AARg0AEgAIMOAAEYdAAIwKADQAAGHQACMOgAEIBBB4AADDoABGDQASAAgw4AARh0AAjAoANAAAYdAAIw6AAQgEEHgAAMOgAEYNABIACDDgABGHQACMCgA0AABh0AAjDoABCAQQeAAAw6AARg0AEgAIMOAAEYdAAIwKADQAAGHQACMOgAEIBBB4AADDoABGDQASAAgw4AARh0AAjAoANAAAYdAAIw6AAQgEEHgAAMOgAEYNABIACDDgABGHQACMCgA0AABh0AAjDoABCAQQeAAAw6AARg0AEgAIMOAAEYdAAIwKADQAAGHQACGFL6ADpj+/aUduwofQVQBdu3p/TPf5a+glZT6A1x882lLwCqwn8PYjLoDbF9e/4f0GznnpvStm2lr6Adunp7e3tLH0Fn7Nhh1KHpduxIaevW0lfQDgq9QbZty1+dA830hS8Y88gUesPccouP26CpbrklpS1bSl9Buyj0htm6NX+VDjTLF79ozKNT6A10660+doOmufXWlDZvLn0F7aTQG2jLlvzVOtAMX/qSMW8Chd5Qt93m4zdoittu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')
}

.arrow_up {
    background-image: url('data:image/png;base64,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gAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIACDHQAAAAowEAHAACAAgx0AAAAKMBABwAAgAIMdAAAACjAQAcAAIDZtfb/cWXIw1uG1hEAAAAASUVORK5CYII=')
}

.arrow {
    float: right;
    width: 12px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: bottom;
}

.open-badge {
    background: rgb(206, 105, 105);
    color: white;
    border-radius: 5px;
    border-radius: 5px;
    margin-right: auto;
    margin-top: 1%;
    margin-bottom: 1%;
    width: 30%;
    height: 10%;
    text-align: center;
}

#content-header {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
}

#popcontent {
    text-align: left;
    width: 300px;
    background: rgb(255, 255, 255);
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    border: 1px solid rgb(173, 169, 169);
    border-radius: 10px;
    box-shadow: 5px 5px #888888;
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

#top-right-elements {
    position: fixed;
    top: 20px;
    right: 10px;
    width: 400px;
    height: 200px;
    margin-right: 20px;
    display: flex;
    align-items: right;
    justify-content: end;
    z-index: 0;
}

#top-right-elements:hover {
    z-index: 2;
}

td#pop div.inline-block {
    width: 100%;
    border: none !important;
    margin: 0px !important;
}

#down-menu {
    width: 40px;
    margin-left: 10px;
}

.menu-component {
    height: 35px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: white;
}

.menu-component:hover {
    cursor: pointer;
}

#popcontent-menu3 {
    background: rgb(255, 255, 255);
    padding-top: 5px;
    border: 1px solid rgb(233, 230, 230);
    border-radius: 10px;
    margin-right: 100px;
}

#popcontent-menu {
    width: 150px;
    background: rgb(255, 255, 255);
    padding-top: 5px;
    border: 1px solid rgb(233, 230, 230);
    border-radius: 10px;
}

#popcontent-mneu3 :hover,
#popcontent-menu :hover {
    background-color: aliceblue;
}

#CSV {
    border-bottom: 1px solid rgb(233, 230, 230);
}

#restore-ticket,
#edit-ticket {
    color: #FFFFFF;
    background-color: rgb(62, 109, 179);
    width: 100px;
    border-radius: 5px 0px 0px 5px;
}

#restore-ticket {
    color: #FFFFFF;
    background-color: rgb(62, 109, 179);
    width: 150px;
    border-radius: 5px 0px 0px 5px;
}

#restore-ticket:hover,
#edit-ticket:hover {
    background-color: rgb(29, 50, 83);
}

#spamButton,
#deleteButton {
    color: #FFFFFF;
    background-color: rgb(62, 109, 179);
    width: 130px;
    border-radius: 5px;
    font-weight: normal;
    float: right;
}

#permanentlyDeleteButton {
    color: #FFFFFF;
    background-color: #CC3340;
    border: none;
    width: 220px;
    border-radius: 5px;
    font-weight: normal;
    float: right;
}

#cancelButtonSpam,
#cancelButton {
    border: none;
    box-shadow: none;
    margin-left: 0px;
    width: 80px;
    font-weight: normal;
    float: right;
}

#clear-selection {
    width: 140px;
}

#menu-selected2,
#menu-selected {
    width: 40px;
    margin-left: 1px;
    color: #FFFFFF;
    background-color: rgb(62, 109, 179);
    border-radius: 0px 5px 5px 0px;
}

#menu-selected2:hover,
#menu-selected:hover {
    background-color: rgb(29, 50, 83);
}

.overflow-hidden {
    overflow: hidden;
}

#popup-header {
    margin-top: 0px;
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

#reply-button:hover {
    background-color: transparent;
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

.float-container-popup {
    display: flex;
    font-family: 'Roboto', sans-serif;
}

.float-child-1 {
    width: 30%;
    /* display: flex; */
    padding: 10px;
    padding-right: 30px;
    border-right: 1px solid rgb(228, 227, 227);
    flex-direction: column;
    background-color: #f2f2f2;
    padding-right: 10px;
    font-size: 0.8em;
}

.float-child-2 {
    display: flex;
    width: 64%;
    padding: 20px;
    flex-direction: column;
}

#buttons-right-popup {
    float: right;
    width: 150px;
}

.macro {
    padding: 10px 10px 10px;
    border: 1px solid rgb(228, 227, 227);
    border-radius: 5px;
    background-color: white;
    max-height: 380px;
    overflow-y: auto;
}

.type {
    width: 50%;
    float: left;
    padding-right: 20px;
}

.table-container {
    width: 75%;
}


.collapse {
    float: right;
    width: 30px;
}

#collapse-left {
    margin-left: 0px;
    padding-right: 10px;
    border-right: 1px solid rgb(230, 230, 230);
    padding-top: 20px;
}

.wide {
    width: 155px;
}

#numTickets {
    float: right;
}

.tab {
    padding-right: 25px;
}

#modal {
    max-height: 600px;
}

#popcontent-menu-edit2,
#popcontent-menu-edit {
    width: 280px;
    background: rgb(255, 255, 255);
    padding-top: 5px;
    border: 1px solid rgb(233, 230, 230);
    border-radius: 10px;
}

#popcontent-menu-edit2 :hover,
#popcontent-menu-edit :hover {
    background-color: aliceblue;
}

input[type=text] {
    width: 100%;
    padding: 8px 10px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
}

.text-modal {
    margin-bottom: 8px;
    display: inline-block;
    font-weight: bold;
}

a {
    max-width: 100%;
    margin: 0px;
    height: 25px;
    border-bottom: 2px solid rgb(255, 255, 255);
    border-top: 2px solid rgb(255, 255, 255);
}

.down-arrow {
    float: right;
}



.dropbtn-1 {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    font-size: 12px;
    border: 1px solid rgb(228, 227, 227);
    cursor: pointer;
    height: 30px;
    margin: auto;
    text-align: left;
    padding-top: 2px;
    padding-bottom: 2px;
    width: 100%;
}

.dropdown-1 {
    display: inline-block;
    width: 100%;
}

.dropdown-content-1 {
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-color: #8888;
    z-index: 1;
    width: 278px;
    margin: 0px;
}

.dropdown-content-1 a {
    color: black;
    text-decoration: none;
    display: block;
    width: 268px;
    padding-left: 10px;
    padding-top: 10px;
    cursor: pointer;
}

.dropdown-content-1 a:hover {
    background-color: #c3d5da;
    border-bottom: 2px solid rgb(113, 160, 212);
    border-top: 2px solid rgb(113, 160, 212);
}

.dropdown-1:hover .dropbtn-1 {
    border-color: rgb(0, 60, 138);
    background-color: white;
}

#priority-choose {
    padding-right: 0px;
}

#link-style {
    color: #0000EE;
    font-weight: normal;
    margin-bottom: 0px;
}

#link-style:hover {
    text-decoration: underline;
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

.blue {
    background-color: rgb(0, 132, 255);
}

.gray {
    background-color: gray;
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
}

.vm {
    position: relative;
    margin: 0 auto;
    width: calc(100% - 20px);
    min-width: 110px;
    max-width: 500px;
    background-color: #fff;
    top: 30px;
    cursor: default;
    box-shadow: 0 5px 15px #00000080;
    font-family: 'Roboto';
    border-radius: 5px;
    font-size: 14px;
}

.vm-title {
    margin-top: 2px;
    margin-bottom: 0;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
}

.svg-icon {
    width: 1em;
    height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
    fill: #727171;
}

.svg-icon circle {
    stroke: #727171;
    stroke-width: 1;
}
</style> 