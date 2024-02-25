<template>
  <div>
    <h1>Capibara CRM</h1>
    <img class="logo" alt="Vue logo" src="../assets/logo.jpg">
  </div>
  <Authorization/>
</template>

<script>
import Authorization from '../components/Authorization.vue';

export default {
  name: 'HomeView',
  components: {
    Authorization
  }
}
</script>

<style>
.logo {
    width: 350px;
    height: 350px;
}
</style>