<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (this.$store.state.session != null) {
      this.$router.push({ name: 'Tickets' })
    }
    else {
      this.$router.push({ name: 'Login' })
    }
  },

}
</script>

<style>
</style>
