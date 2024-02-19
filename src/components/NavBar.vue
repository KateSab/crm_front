<template>
  <nav>
    <router-link to="/" class="nav-link" :class="{ 'active': currentTab === '/' }">Логин и вход в учетку</router-link>
    <router-link to="/buyers" class="nav-link" :class="{ 'active': currentTab === '/buyers' }">Заказы покупателей</router-link>
    <router-link to="/suppliers" class="nav-link" :class="{ 'active': currentTab === '/suppliers' }">Заказы поставщикам</router-link>
    <router-link to="/contractors" class="nav-link" :class="{ 'active': currentTab === '/contractors' }">Заказы подрядчикам</router-link>
    <router-link to="/carriers" class="nav-link" :class="{ 'active': currentTab === '/carriers' }">Заказы перевозчикам</router-link>
    <router-link to="/moving" class="nav-link" :class="{ 'active': currentTab === '/moving' }">Задачи на перемещение</router-link>
    <router-link to="/bills" class="nav-link" :class="{ 'active': currentTab === '/bills' }">Счета на оплату</router-link>
    <router-link to="/stock" class="nav-link" :class="{ 'active': currentTab === '/stock' }">Склад</router-link>
    <router-link to="/partners" class="nav-link" :class="{ 'active': currentTab === '/partners' }">Контрагенты</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      currentTab: ''
    };
  },
  watch: {
    '$route'(to, from) {
      this.currentTab = to.path;
    }
  }
}
</script>

<style lang="scss">

// *{
//   margin: 0%;
// }

nav {
  height: 13lvh;
  background: rgba(170, 170, 252, 0.897);
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 0 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(108, 108, 209, 0.2);
  transform: translateY(-3px);
}

.active {
  background-color: rgb(108, 108, 209);
  color: white;
}
</style>
