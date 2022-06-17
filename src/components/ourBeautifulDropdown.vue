<template>
    <div class="dropdown">
        <button class="dropbtn" @click="WordClicked === false ? WordClicked = true : WordClicked = false">{{
                this.chosenWord
        }} <span class="down-arrow">⯆</span></button>
        <div class="dropdown-content" v-show="WordClicked === true">
            <a v-for="(option, index) in options" :key="index" @click="changeWord(option)">{{ option }}</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chosenWord: '- No Change -',
            WordClicked: false,
        }
    },
    props: ['options'],
    methods: {
        changeWord(newWord) {
            this.WordClicked === false ? this.WordClicked = true : this.WordClicked = false;
            this.chosenWord = newWord;
            this.$emit('chosenType', newWord);
        }
    }
}
</script>

<style >
.dropbtn {
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
    border-radius: 5px;
}

.dropdown {
    display: inline-block;
    width: 100%;
}

.dropdown-content {
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-color: #888888;
    z-index: 1;
    max-width: 130px;
    margin: 0px;
}

a {
    max-width: 100%;
    margin: 0px;
    height: 25px;
    border-bottom: 2px solid rgb(255, 255, 255);
    border-top: 2px solid rgb(255, 255, 255);
}

.dropdown-content a {
    color: black;
    text-decoration: none;
    display: block;
    width: 120px;
    padding-left: 10px;
    padding-top: 10px;
    cursor: pointer;
}

.dropdown-content a:hover {
    background-color: #c3d5da;
    border-bottom: 2px solid rgb(113, 160, 212);
    border-top: 2px solid rgb(113, 160, 212);
}

.dropdown:hover .dropbtn {
    border-color: rgb(0, 60, 138);
    background-color: white;
}

.down-arrow {
    float: right;
}
</style>