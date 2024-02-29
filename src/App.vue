<template>
      <MainPage />
      <!-- <Login /> -->
</template>


<script>
import MainPage from './views/MainPage.vue';
import Login from './views/Login.vue';

export default {
  name: 'App',
  components: {
    MainPage,
    Login,
  },

  // computed: {
  //   isLoggedIn: function() {
  //     return this.$store.getters.isLoggedIn
  //   }
  // }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding: 0;
  margin-top: 3.5rem;
  padding-top: 30px;
}
</style>
