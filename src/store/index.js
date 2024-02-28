import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        const url = 'http://89.104.68.248:8000/api/auth/jwt/login';

        const formData = new FormData();
        formData.append('username', user.email);
        formData.append('password', user.password);

        axios.post(
          url,
          formData,
        )
          .then(resp => {
            const token = resp.data.access_token; // Изменили на правильный ключ для токена
            const user = resp.data.user;
            localStorage.setItem('token', token)
            commit('auth_success', { token, user })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        resolve()
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  modules: {
  }
},
);
