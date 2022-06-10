<template>
    <header>
        <nav>
            <div>
                <Popper>
                    <button id="user-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg></button>
                    <template #content>
                        <div id="popcontent-menu" >
                            <div class="menu-component">Product updates</div>
                            <div class="menu-component">Get help</div>
                            <div class="menu-component">Support help center</div>
                            <div class="menu-component">Keyboard shortcuts</div>
                            <div class="menu-component">Support help center</div>
                            <div class="menu-component">Give feedback</div>
                            <div class="menu-component">About</div>
                            <div class="menu-component">Privacy policy</div>
                            <div class="menu-component">Sign out</div>
                        </div>
                    </template>
                </Popper>
            </div>
        </nav>
        <div>
            <router-link id="add-button" to="/newTicket"> + Add </router-link>
        </div>
    </header>
</template>

<script>
import Popper from "vue3-popper";

export default {
    components: {
        Popper
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

#add-button{ 
    border: none;
    background: none;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    color: black;
    text-decoration: none;
}

#add-button:hover{ 
    cursor: pointer;
}

</style>