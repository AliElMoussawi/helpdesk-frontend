<template>
    <transition name="fade">
        <div class="modal" v-if="show">
            <div class="modal__backdrop" @click="closeModal()" />

            <div class="modal__dialog">
                <div class="modal__header">
                    <slot name="header" />
                    <button type="button" class="modal__close" @click="closeModal()">
                        <svg class="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
							c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
							c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
							c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
                        </svg>
                    </button>
                </div>

                <div class="modal__body">
                    <slot name="body" />
                </div>

                <div class="modal__footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ModalItem",
    data() {
        return {
            show: false
        };
    },
    methods: {
        closeModal() {
            this.show = false;
            document.querySelector("body").classList.remove("overflow-hidden");
        },
        openModal() {
            this.show = true;
            document.querySelector("body").classList.add("overflow-hidden");
        }
    }
};
</script>


<style lang="scss" scoped>
.modal {
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    font-family: 'Roboto', sans-serif;

    &__backdrop {
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
    }

    &__dialog {
        background-color: #ffffff;
        position: relative;
        width: 1000px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        z-index: 2;

        @media screen and (max-width: 992px) {
            width: 90%;
        }
    }

    &__close {
        width: 30px;
        height: 30px;
        background-color: transparent;
        border: 0px solid transparent;
        padding-bottom: 15px;
    }

    &__header {
        padding: 20px 20px 10px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-bottom: 1px solid rgb(228, 227, 227);
        height: 20px;
    }

    &__body {
        padding: 0px 0px 0px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    &__footer {
        padding: 10px 10px 10px;
        border-top: 1px solid rgb(228, 227, 227);
        background-color: #f2f2f2;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.svg-icon {
    width: 1em;
    height: 1em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
    fill: #808093;
}

.svg-icon circle {
    stroke: #808083;
    stroke-width: 1;
}
</style>