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
import { ref } from 'vue';

const email = ref('');
const store = useStore();
const router = useRouter();

email.value = store.state.email;

const logout = () => {
  store.dispatch('logout')
    .then(() =>  {
      email.value = '';
      router.push('/login');
    });
};

store.watch(() => store.state.email, (newValue) => {
  email.value = newValue;
});
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