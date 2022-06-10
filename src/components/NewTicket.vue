<template>
    <div style="height: 100vh; display: flex; flex-direction: column;">
        <TheNavigation />
        <div style="font-family: 'Roboto', sans-serif;">
            <div id="heading-stripe">
                <div id="title"><span id="new">NEW</span> <span id="title-name">Ticket</span></div>
            </div>
        </div>
        <div class="float-container" style="flex-grow: 2">
            <div class="child1">
                <span class="text-modal">Requester</span>
                <input type="text" class="icon" value placeholder="search name or contact info">

                <span class="text-modal">Assignee</span>
                <span class="text-modal">Followers</span>
                <div id="tags-container">
                    <span class="text-modal" style="margin-top: 0px;">Tags</span>
                    <div id="tags">
                        <vue3-tags-input :tags="tagsToAdd" placeholder="input tags"
                            @on-tags-changed="handleChangeTagAdd" id="tags" />
                    </div>
                </div>
            </div>
            <div class="child2" style="display: flex;">
                <div id="subchild1">
                    <input placeholder="Subject" id="subject-input" />
                </div>
                <div id="subchild2">

                </div>
                <div id="subchild3" style="flex-grow: 2;">

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
                <button class="button-39" id="menu-submit">˅</button>
            </div>
        </div>
    </div>
</template>

<script>
import TheNavigation from './TheNavigation.vue';
import Vue3TagsInput from 'vue3-tags-input';

export default {
    name: 'NewTicket',
    data() {
        return {
            tagsToAdd: [],
        }
    },
    components: {
        TheNavigation,
        Vue3TagsInput
    },
    methods: {
        handleChangeTagAdd(tags) {
            this.tagsToAdd = tags;
        },
    }
}
</script>

<style scoped>
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
}

.child3 {
    width: 5%;
    flex-direction: column;
    margin-right: 10px;
    margin-left: 10px;
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

#person-button:hover {
    background-color: #f1f8ff;
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

.v3ti{
    border-color: rgb(230, 230, 230);
}
</style>