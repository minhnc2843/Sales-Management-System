<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Thông tin Đơn hàng</h2>
    <div v-if="order" class="card p-4 shadow-sm">
      <p><strong>Mã đơn hàng:</strong> {{ order.id }}</p>
      <p><strong>Khách hàng:</strong> {{ order.customer_name }}</p>
      <p><strong>Ngày đặt hàng:</strong> {{ order.order_date }}</p>
      <p><strong>Trạng thái:</strong> <span class="badge bg-primary">{{ order.status }}</span></p>
      <p><strong>Ghi chú:</strong> {{ order.note }}</p>
      <p><strong>Giảm giá:</strong> {{ order.discount }}%</p>
      <p><strong>Tổng tiền:</strong> {{ formatPrice(order.total_price) }} VNĐ</p>
      
      <button @click="goBack" class="btn btn-warning mt-3">Quay lại danh sách</button>
    </div>
    <div v-else class="text-center">
      <p>Đang tải dữ liệu...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import instanceAxios from '@/ultis/configAxios';

const route = useRoute();
const router = useRouter();
const order = ref(null);

const formatPrice = (value) => {
  return Number(value).toLocaleString();
};

const goBack = () => {
  router.push('/donhangs');
};

onMounted(() => {
  const orderId = route.params.id;
  instanceAxios.get(`/orders/${orderId}`)
    .then(response => {
      order.value = response.data;
    })
    .catch(error => console.error('Lỗi khi lấy chi tiết đơn hàng:', error));
});
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: auto;
  border-radius: 10px;
  background: #fff;
}
</style>