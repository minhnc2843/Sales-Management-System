<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-semibold mb-4">Chi tiết đơn hàng </h2>
    <div v-if="order">
      <div v-if="error" class="text-danger mb-2">{{ error }}</div>
      <label for="id"><strong>Mã đơn hàng #{{ order.id }}</strong></label><br>
      
      <label class="block mt-2">Khách hàng:</label>
      <input v-model="order.customer_name" type="text" class="border p-2 w-full" />
      
      <label class="block mt-2">Trạng thái:</label>
      <select v-model="order.status" class="border p-2 w-full">
        <option value="Chờ xác nhận">Chờ xác nhận</option>
        <option value="Đang giao">Đang giao</option>
        <option value="Hoàn thành">Hoàn thành</option>
        <option value="Đã hủy">Đã hủy</option>
      </select> 
      <label class="block mt-2">Ghi chú:</label>
      <input v-model="order.note" type="text" class="" />
    
      <label class="block mt-2">Giảm giá (%):</label>
      <input v-model.number="order.discount" type="number" class="border p-2 w-full" />
      
      <table class="text-center mt-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">Ảnh</th>
            <th class="border p-2">Tên</th>
            <th class="border p-2">Số lượng</th>
            <th class="border p-2">Giá</th>
            <th class="border p-2">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.products" :key="index" class="border">
            <td class="border p-2"><img :src="item.image" alt="Ảnh" width="50px" /></td>
            <td class="border p-2">{{ item.name }}</td>
            <td class="border p-2">
              <button @click="increaseQuantity(item)" class="btn btn-primary btn-sm">+</button>
              {{ item.quantity }}
              <button @click="decreaseQuantity(item)" class="btn btn-warning btn-sm">-</button>
            </td>
            <td class="border p-2">{{ formatPrice(item.quantity * item.price) }} VNĐ</td>
            <td class="border p-2"><button class="btn btn-danger" @click="removeFromOrder(index)">Xóa</button></td>
          </tr>
        </tbody>
      </table>

      <p class="font-bold mt-2">Tổng tiền: {{ formatPrice(finalPrice) }} VNĐ</p>

      <button @click="updateOrder" class="btn btn-success mt-3">Cập nhật đơn hàng</button>
    </div>
    <div v-else>
      <p>Đang tải dữ liệu...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import instanceAxios from '@/ultis/configAxios';

const route = useRoute();
const order = ref(null);
const error = ref("");

const formatPrice = (value) => Number(value).toLocaleString();

const finalPrice = computed(() =>
  order.value ? order.value.products.reduce((total, item) => total + item.price * item.quantity, 0) * (1 - order.value.discount / 100) : 0
);

const increaseQuantity = (product) => {
  product.quantity++;
};

const decreaseQuantity = (product) => {
  if (product.quantity > 1) {
    product.quantity--;
  } else {
    order.value.products = order.value.products.filter(p => p.id !== product.id);
  }
};

const removeFromOrder = (index) => {
  order.value.products.splice(index, 1);
};

const updateOrder = () => {
  error.value = "";
  if (!order.value.customer_name) {
    error.value = "Vui lòng nhập tên khách hàng!";
    return;
  }
  if (order.value.products.length === 0) {
    error.value = "Đơn hàng phải có ít nhất một sản phẩm!";
    return;
  }

  instanceAxios.put(`/orders/${route.params.id}`, order.value)
    .then(() => alert("Cập nhật đơn hàng thành công!"))
    .catch(error => console.error("Lỗi khi cập nhật đơn hàng:", error));
};

onMounted(() => {
  instanceAxios.get(`/orders/${route.params.id}`)
    .then(response => {
      order.value = response.data;
    })
    .catch(error => console.error("Lỗi khi lấy dữ liệu đơn hàng:", error));
});
</script>

<style scoped>
button {
  cursor: pointer;
}
img {
  object-fit: cover;
  border-radius: 5px;
}
</style>