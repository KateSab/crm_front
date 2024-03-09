import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    email: localStorage.getItem('email') || '',
    clients: [],
    contractors: [],
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, { token }) {
      state.status = 'success'
      state.token = token
      console.log("token: ", token);
    },
    auth_error(state) {
      state.status = 'error'
    },
    user_data(state, email) {
      state.email = email
    },
    get_clients(state, clients) {
      state.clients = clients;
    },
    get_contractors(state, contractors) {
      state.contractors = contractors;
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit, dispatch }, user) {
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
            localStorage.setItem('token', token)
            commit('auth_success', { token })
            dispatch('get_user')
            resolve(resp)
            console.log("auth success");
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    get_clients({ commit }) {
      console.log("get_clients");
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/contractor/get_filter';
        const params = {
          'limit': 1000,
          'is_client': true
        }
        axios.get(url, { params })
          .then(resp => {
            const clientsData = resp.data;
            // Создаем списки словарей для каждого клиента
            const clientsList = clientsData.map(client => ({
              id: client.id,
              name: client.name
            }));
            // Вызываем мутацию для обновления состояния хранилища
            commit('get_clients', clientsList);

            console.log("clients: ", clientsList);
            resolve(resp);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    get_contractors({ commit }) {
      console.log("get_contractors");
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/contractor/get_filter';
        const params = {
          'limit': 1000,
          'is_contractor': true
        }
        axios.get(url, { params })
          .then(resp => {
            const contractorsData = resp.data;
            // Создаем списки словарей для каждого клиента
            const contractorsList = contractorsData.map(contractor => ({
              id: contractor.id,
              name: contractor.name
            }));
            commit('get_contractors', contractorsList);
            console.log("contractors: ", contractorsList);
            resolve(resp);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      resolve()
    })
  },
  get_user({ commit }, token) {
    return new Promise((resolve, reject) => {
      if (localStorage.token) {
        fetch('http://89.104.68.248:8000/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
          .then(resp => {
            if (!resp.ok) {
              throw new Error('Network response was not ok');
            }
            return resp.text(); // Получаем текстовое представление данных ответа
          })
          .then(text => {
            const data = JSON.parse(text); // Преобразуем текст в объект JSON
            const email = data.email; // Получаем email из данных ответа
            localStorage.setItem('email', email);
            commit('user_data', email);
            console.log("email: ", email);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    clients: state => state.clients,
  },
  modules: {
  }
},
);
