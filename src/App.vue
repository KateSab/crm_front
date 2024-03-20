<template>
      <MainPage />
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
  margin-top: 20vh;
}

@media screen and (max-width: 1240px) {
  body {
    margin-top: 0;
    margin-left: 5rem;
  }
}
</style>
