<template>
    <div class="top-bar">
        <el-icon color="white"><UserFilled /></el-icon>
        <text class="manager">{{ email }} | роль</text>
        <el-button class="logout" size="small" @click="logout">Выйти</el-button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const logout = () => {
  store.dispatch('logout')
    .then(() =>  {
      router.push('/login');
    });
};

const email = store.state.email
</script>

<style>
.top-bar {
  background-color: #4d4d4d;
  height: 2rem; /* Высота полосы */
  width: 100%; /* Ширина полосы, чтобы она растянулась на всю ширину экрана */
  align-items: center;
  display: flex;
  justify-content: right;
}

.manager {
    font-family: 'Arimo', sans-serif;
    font-size: small;
    color: white;
}

.logout {
    size: small;
    margin: 2rem;
}
</style>