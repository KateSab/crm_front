import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    email: localStorage.getItem('email') || '',
    supplier_orders: [],
    types_of_applications: [],
    addresses: [],
    delivery_types: [{ name: 'До склада', id: 0 }, { name: 'До ПВЗ', id: 1 }, { name: 'До ТК', id: 2 }],
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
    get_addresses(state, addresses) {
      state.addresses = addresses;
    },
    get_supplier_orders(state, supplier_orders) {
      state.supplier_orders = supplier_orders;
    },
    get_types_of_applications(state, types_of_applications) {
      state.types_of_applications = types_of_applications;
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.email = ''
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
    get_supplier_orders({ commit }) {
      console.log("get_supplier_orders");
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/supplier_order/get_filter';
        const params = {
          'limit': 1000,
        }
        axios.get(url, { params })
          .then(resp => {
            const supplierOrdersData = resp.data;
            // Создаем списки словарей для каждого клиента
            const supplierOrdersList = supplierOrdersData.map(supplier_order => ({

              contractor_id: supplier_order.contractor_id,
              supplier_order_number: supplier_order.supplier_order_number,
              create_date: supplier_order.create_date,
              delivery_type: supplier_order.delivery_type,
              carrier_order_id: supplier_order.carrier_order_id,
              id: supplier_order.id,
              shipment_date_planned: supplier_order.shipment_date_planned,
              shipment_date_fact: supplier_order.shipment_date_fact,
              invoice_id: supplier_order.invoice_id,
              owner_id: supplier_order.owner_id
            }));
            commit('get_supplier_orders', supplierOrdersList);
            console.log("supplier orders: ", supplierOrdersList);
            resolve(resp);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    get_types_of_applications({ commit }) {
      console.log("get_types_of_applications");
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/branding_types/get_all';
        axios.get(url)
          .then(resp => {
            const typesOfApplicationsData = resp.data;
            const typesOfApplicationsList = typesOfApplicationsData.map(type => ({
              id: type.id,
              title: type.title,
            }));
            commit('get_types_of_applications', typesOfApplicationsList);
            console.log("typesOfApplications: ", typesOfApplicationsList);
            resolve(resp);
          })
          .catch(error => {
            reject(error);
          });
      })
    },
    get_addresses({ commit }) {
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/locations/get_filter';
        const params = {
          'limit': 1000,
        }
        axios.get(url, { params })
          .then(resp => {
            const addressesData = resp.data;
            // Создаем списки словарей для каждого клиента
            const addressesList = addressesData.map(address => ({
              id: address.id,
              address: address.address,
              partner_id: address.contractor_id,
              name: address.name,
              location_type: address.location_type
            }));
            commit('get_addresses', addressesList);
            console.log("address: ", addressesList);
            resolve(resp);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        resolve()
      })
    },
    get_user({ commit }) {
      return new Promise(() => {
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
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    types_of_applications: state => state.types_of_applications
  },
  modules: {
  }
},
);
