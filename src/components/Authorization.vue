<template>
    <el-footer class="row">
      <el-input type="email" v-model="email" placeholder="Email" style="width: 30%; margin-bottom: 1rem;"/>
      <el-input
        v-model="password"
        type="password"
        placeholder="Введите пароль"
        show-password
        style="width: 30%"
      ></el-input>
      <el-button color="rgb(255, 226, 111)" style="width: 15%; margin-top: 2rem;" @click="login">Войти</el-button>
    </el-footer>
  </template>
  
  <script>
  // import axios from 'axios';
  
  export default {
  data() {
    return {
      email: '',
      password: ''
    }; 
  },
  
  methods: {
    login: function () {
      const user = {
      email: this.email,
      password: this.password
    };

      this.$store.dispatch('login', user)
        .then(() =>  this.$router.push('/buyers'))
        .catch(err => console.log(err))
      
    }
  }
};
</script>
  
  <style>
    .row {
      display: flex;
      flex-direction: column;
      justify-content: center; 
      align-items: center; 
    }
  </style>
  



  <!-- // login() {
    //     const url = 'http://89.104.68.248:8000/api/auth/jwt/login';
    //     const formData = new FormData();

    //     formData.append('username', this.email);
    //     formData.append('password', this.password);

    //     axios.post(
    //         url,
    //         formData,
    //     )
    //       .then((response) => {
    //         console.log(response.data);
    //         this.$router.push({ name: 'MainPage' });
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    // }, -->