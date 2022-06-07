<template>
  <router-view></router-view>
</template>

<script>
// import ViewTicket from "./components/viewTickets.vue";
export default {
  name: 'App',
  created(){
    this.$router.push("login")
  }
}
</script>

<style>

</style>
