<template>
  <nav>
    <img src="../assets/logohead.png" alt="россувенир" width="120">
    <!-- <router-link to="/" class="nav-link" :class="{ 'active': currentTab === '/' }">Логин и вход в учетку</router-link> -->
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

nav {
  height: 9lvh;
  background: white;
  box-shadow: 0 5px 7px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  padding: 0rem 1rem;
}

.nav-link {
  font-family: 'Arimo', sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #4c4c4c;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 0 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-link:hover {
  background-color: #3d9cfb54;
  transform: translateY(-3px);
}

.active {
  background-color: #3d9cfb;
  color: white;
}

@media screen and (max-width: 1240px) { /* Пример: меняем стили для экранов шириной до 768px */
  nav {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    width: 9vw;
    height: 100vh;
    overflow-y: auto;
    padding: 1rem;
  }
  .nav-link {
    font-size: 14px; /* Уменьшаем размер текста */
    padding: 8px 12px; /* Уменьшаем отступы */
    margin: 5px; /* Уменьшаем отступы между ссылками */
  }
}
</style>
