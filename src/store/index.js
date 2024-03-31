import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    email: localStorage.getItem('email') || '',
    clients: [],
    shipment_locations: [],
    contractors: [],
    suppliers: [],
    typesOfApplications: [],
    partners: [],
    partners_addresses: [],
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
    get_clients(state, clients) {
      state.clients = clients;
    },
    get_shipment_locations(state, shipment_locations) {
      state.shipment_locations = shipment_locations;
    },
    get_contractors(state, contractors) {
      state.contractors = contractors;
    },
    get_addresses_for_partners(state, addresses) {
      state.partners_addresses = addresses;
    },
    get_suppliers(state, suppliers) {
      state.suppliers = suppliers;
    },
    get_types_of_applications(state, typesOfApplications) {
      state.typesOfApplications = typesOfApplications;
    },
    get_partners(state, partners) {
      state.partners = partners;
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
    get_shipment_locations({ commit }) {
      console.log("get shipment locations");
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/locations/get_filter';
        const params = {
          'limit': 1000,
          'contractor_id': -1
        }
        axios.get(url, { params })
          .then(resp => {
            const shipmentLocationsData = resp.data;
            // Создаем списки словарей для каждого клиента
            const shipmentLocationsList = shipmentLocationsData.map(shipment_location => ({
              id: shipment_location.id,
              name: shipment_location.name
            }));
            // Вызываем мутацию для обновления состояния хранилища
            commit('get_shipment_locations', shipmentLocationsList);

            console.log("shipment locations: ", shipmentLocationsList);
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
              name: contractor.name,
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
    get_suppliers({ commit }) {
      console.log("get_suppliers");
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/contractor/get_filter';
        const params = {
          'limit': 1000,
          'is_supplier': true
        }
        axios.get(url, { params })
          .then(resp => {
            const suppliersData = resp.data;
            // Создаем списки словарей для каждого клиента
            const suppliersList = suppliersData.map(supplier => ({
              id: supplier.id,
              name: supplier.name
            }));
            commit('get_suppliers', suppliersList);
            console.log("suppliers: ", suppliersList);
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
    get_partners({ commit, dispatch }) {
      console.log("get_partners");
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/contractor/get_filter';
        const params = {
          'limit': 1000,
        }
        axios.get(url, { params })
          .then(resp => {
            const partnersData = resp.data;
            // Создаем списки словарей для каждого контрагента
            const partnersList = partnersData.map(partner => ({
              id: partner.id,
              name: partner.name,
              is_contractor: partner.is_contractor,
              is_carrier: partner.is_carrier,
              is_client: partner.is_client,
              is_supplier: partner.is_supplier,
              addresses: [],
            }));

            // Цикл для получения адресов для каждого контрактора
            for (const partner of partnersList) {

              dispatch('get_addresses_for_partners', { commit, partner_id: partner.id })

                .then(addressesData => {
                  // Получаем адреса для текущего контрактора и добавляем их в массив addresses
                  partner.addresses = addressesData.data.map(address => ({
                    address: address.address,
                    name: address.name,
                    location_type: address.location_type
                  }));
                })
                .catch(error => {
                  console.error(`No address found for partner with ID ${partner.id}:`);
                });
            }
            // Вызываем мутацию для обновления состояния хранилища
            commit('get_partners', partnersList);
            console.log("partners: ", partnersList);
            resolve(resp);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    get_addresses_for_partners({ commit }, { partner_id }) {
      console.log("get_address for partner: ", partner_id);
      return new Promise((resolve, reject) => {
        const url = 'http://89.104.68.248:8000/api/locations/get_filter';
        const params = {
          'limit': 1000,
          'contractor_id': partner_id,
        }
        axios.get(url, { params })
          .then(resp => {
            const addressesData = resp.data;
            // Создаем списки словарей для каждого клиента
            const addressesList = addressesData.map(address => ({
              address: address.address,
              name: address.name,
              location_type: address.location_type
            }));
            commit('get_addresses_for_partners', addressesList);
            // console.log("address: ", addressesList);
            resolve(resp);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
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
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    clients: state => state.clients,
    shipment_locations: state => state.shipment_locations,
    contractors: state => state.contractors,
    suppliers: state => state.suppliers,
    typesOfApplications: state => state.typesOfApplications
  },
  modules: {
  }
},
);
