<template>
  <div class="login-container mt-3">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required/>
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  const res = await authStore.login(username.value, password.value);
  if (res.role === 'Quản trị viên') {
    router.push('/products');
  // Reset trang để quay về form đăng nhập
  }else if(!(res.role === 'Quản trị viên')){
    router.push('/');
  }
  else{
   
    error.value = res.message; // Sai tài khoản → Hiển thị lỗi
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 100%;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
