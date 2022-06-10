<template>
    <transition :name="name"
                @before-appear="beforeAppear"
                @appear="appear"
                @after-appear="afterAppear"
                @appear-cancelled="appearCancelled"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @enter-cancelled="enterCancelled"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
                @leave-cancelled="leaveCancelled"
    >
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        name: "CollapseTransition",
        props: {
            name: {
                type: String,
                required: false,
                default: 'collapse'
            },
            dimension: {
                type: String,
                required: false,
                default: 'height',
                validator: (value) => {
                    return ['height', 'width'].includes(value)
                }
            },
            duration: {
                type: Number,
                required: false,
                default: 300
            },
            easing: {
                type: String,
                required: false,
                default: 'ease-in-out'
            },
        },
        watch: {
            dimension() {
                this.clearCachedDimensions()
            }
        },
        data() {
            return {
                cachedStyles: null,
            }
        },
        computed: {
            transition() {
                let transitions = []
                Object.keys(this.cachedStyles).forEach((key) => {
                    transitions.push(`${this.convertToCssProperty(key)} ${this.duration}ms ${this.easing}`)
                })
                return transitions.join(', ')
            }
        },
        methods: {
            beforeAppear(el) {
                this.$emit('before-appear', el)
            },
            appear(el) {
                this.$emit('appear', el)
            },
            afterAppear(el) {
                this.$emit('after-appear', el)
            },
            appearCancelled(el) {
                this.$emit('appear-cancelled', el)
            },
            beforeEnter(el) {
                this.$emit('before-enter', el)
            },
            enter(el, done) {

                this.detectAndCacheDimensions(el)
                this.setClosedDimensions(el)
                this.hideOverflow(el)
                this.forceRepaint(el)
                this.setTransition(el)
                this.setOpenedDimensions(el)
                this.$emit('enter', el, done)

                setTimeout(done, this.duration)
            },
            afterEnter(el) {
                this.unsetOverflow(el)
                this.unsetTransition(el)
                this.unsetDimensions(el)
                this.clearCachedDimensions()
                this.$emit('after-enter', el)
            },
            enterCancelled(el) {
                this.$emit('enter-cancelled', el)
            },
            beforeLeave(el) {
                this.$emit('before-leave', el)
            },
            leave(el, done) {

                this.detectAndCacheDimensions(el)
                this.setOpenedDimensions(el)
                this.hideOverflow(el)
                this.forceRepaint(el)
                this.setTransition(el)
                this.setClosedDimensions(el)
                this.$emit('leave', el, done)
                setTimeout(done, this.duration)
            },
            afterLeave(el) {
                this.unsetOverflow(el)
                this.unsetTransition(el)
                this.unsetDimensions(el)
                this.clearCachedDimensions()
                this.$emit('after-leave', el)
            },
            leaveCancelled(el) {
                this.$emit('leave-cancelled', el)
            },
            detectAndCacheDimensions(el) {
                if (this.cachedStyles) return
                const visibility = el.style.visibility
                const display = el.style.display

                el.style.visibility = 'hidden'
                el.style.display = ''
                this.cachedStyles = this.detectRelevantDimensions(el)
                el.style.visibility = visibility
                el.style.display = display
            },
            clearCachedDimensions() {
                this.cachedStyles = null
            },
            detectRelevantDimensions(el) {
                if (this.dimension === 'height') {
                    return {
                        'height': el.offsetHeight + 'px',
                        'paddingTop': el.style.paddingTop || this.getCssValue(el, 'padding-top'),
                        'paddingBottom': el.style.paddingBottom || this.getCssValue(el, 'padding-bottom'),
                    }
                }
                if (this.dimension === 'width') {
                    return {
                        'width': el.offsetWidth + 'px',
                        'paddingLeft': el.style.paddingLeft || this.getCssValue(el, 'padding-left'),
                        'paddingRight': el.style.paddingRight || this.getCssValue(el, 'padding-right'),
                    }
                }
                return {}
            },
            setTransition(el) {
                el.style.transition = this.transition
            },
            unsetTransition(el) {
                el.style.transition = ''
            },
            hideOverflow(el) {
                el.style.overflow = 'hidden'
            },
            unsetOverflow(el) {
                el.style.overflow = ''
            },
            setClosedDimensions(el) {
                Object.keys(this.cachedStyles).forEach(key => {
                    el.style[key] = '0'
                })
            },
            setOpenedDimensions(el) {
                Object.keys(this.cachedStyles).forEach((key) => {
                    el.style[key] = this.cachedStyles[key]
                })
            },
            unsetDimensions(el) {
                Object.keys(this.cachedStyles).forEach((key) => {
                    el.style[key] = ''
                })
            },
            forceRepaint(el) {
                getComputedStyle(el)[this.dimension]
            },
            getCssValue(el, style) {
                return getComputedStyle(el, null).getPropertyValue(style)
            },
            convertToCssProperty(style) {
                const upperChars = style.match(/([A-Z])/g)
                if ( ! upperChars) {
                    return style
                }
                for (let i = 0, n = upperChars.length; i < n; i++) {
                    style = style.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase())
                }
                if (style.slice(0, 1) === '-') {
                    style = style.slice(1)
                }
                return style
            }
        }
    }
</script>