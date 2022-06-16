<template>
    <expandArrow v-if="name=='expandArrow'"></expandArrow>
    <collapseArrow v-if="name=='collapseArrow'"></collapseArrow>
    <personFill v-if="name=='personFill'"></personFill>
    <infoIcon v-if="name=='infoIcon'"></infoIcon>
    <tickIcon v-if="name=='tickIcon'"></tickIcon>
    <arrowLeft v-if="name=='arrowLeft'"></arrowLeft>
    <pencilNote v-if="name=='pencilNote'"></pencilNote>
    <arrowHeadBottom v-if="name=='arrowHeadBottom'"></arrowHeadBottom>
    <personTransparent v-if="name=='personTransparent'"></personTransparent>
    <groupOfPeople v-if="name=='groupOfPeople'"></groupOfPeople>
</template>

<script>
import expandArrow from '../svg_components/expandArrow.vue'
import collapseArrow from '../svg_components/collapseArrow.vue'
import personFill from '../svg_components/personFill.vue'
import infoIcon from '../svg_components/infoIcon.vue'
import tickIcon from '../svg_components/tickIcon.vue'
import arrowLeft from '../svg_components/arrowLeft.vue'
import pencilNote from '../svg_components/pencilNote.vue'
import arrowHeadBottom from '../svg_components/arrowHeadBottom.vue'
import personTransparent from '../svg_components/personTransparent.vue'
import groupOfPeople from '../svg_components/groupOfPeople.vue'
export default{
    name: 'svgComponent',
    props: ['name'],
    components:{
        expandArrow,
        collapseArrow,
        personFill,
        infoIcon,
        tickIcon,
        arrowLeft,
        pencilNote,
        arrowHeadBottom,
        personTransparent,
        groupOfPeople,
    }
}
</script>