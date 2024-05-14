<template>
    <div class="header">
    <TopBar />
    <NavBar />
  </div>
  <router-view></router-view>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'MainPage',
  components :{
      TopBar,
      NavBar,
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
  margin: 0;
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
