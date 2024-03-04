<template>
  <div class="login">
    <h2>Capibara CRM</h2>
    <img class="logo" alt="Vue logo" src="../assets/logo.jpg">
  </div>
  <router-view><Authorization/></router-view>
</template>

<script>
import Authorization from '../components/Authorization.vue';

export default {
  name: 'Login',
  components: {
    Authorization
  }
}
</script>

<style>
.login {
  margin-top: 4rem;
}
.logo {
    width: 350px;
    height: 350px;
}
</style>