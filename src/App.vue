<template>
  <div class="header">
    <NavBar/>
  </div>
  <body>
    <router-view/>
  </body>
</template>


<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  }
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
  margin: 0;
  padding-top: 40px;
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
