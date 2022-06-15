<template>
  <router-view></router-view>
</template>

<script>
// import ViewTicket from "./components/viewTickets.vue";
export default {
  name: 'App',
  created(){
    if(this.$store.state.session != null){
      this.$router.push({name: 'Tickets'})
    }
    else{
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style>

</style>
