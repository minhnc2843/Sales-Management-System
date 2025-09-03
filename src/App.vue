<template>
  <div v-if="isAuthenticated">
    <div v-if="authStore.user?.role === 'Quản trị viên'" class="container bg-Light">
      <HEADER></HEADER>
      <RouterView />
      <FOOTER></FOOTER>
    </div>
    <div v-else class="unauthorized">
      <h2>Bạn không có quyền truy cập admin</h2>
      <h2>Vui lòng đăng nhập lại</h2>
      <button @click="logout" class="btn btn-danger">back</button>
    </div>
  </div>
  <div v-else>
    <RouterView /> <!-- Cho phép hiển thị trang đăng nhập -->
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import HEADER from "@/views/layout/Header.vue";
import FOOTER from "@/views/layout/Footer.vue";
import { useAuthStore } from '@/store/auth.js';
import { computed } from 'vue';


import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();

// Kiểm tra nếu người dùng đã đăng nhập
const isAuthenticated = computed(() => authStore.user !== null);

// Hàm đăng xuất
const logout = () => {
  authStore.logout();
  router.push('/') // Reset trang để quay về form đăng nhập
};
</script>

<style scoped>
.unauthorized {
  text-align: center;
  margin-top: 50px;
  color: red;
}

</style>
