<template>
    <div class="container  bg-light p-4 rounded shadow">
      <h1 class="mb-4 text-primary text-center">Lịch sử đơn hàng</h1>
      <router-link :to="`/orders/add`" class="btn btn-success btn-sm mb-3">Thêm mới đơn hàng</router-link>
      <table class="table table-bordered table-striped table-hover">
        <thead class="table-secondary text-center">
          <tr class="bg-gray-200">
            <th>Mã đơn</th>
            <th>Sản phẩm</th>
            <th>Ngày đặt</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
            <th>Mã giảm giá</th>
            <th>Tổng tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in paginatedOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>
              <div v-for="product in order.products" :key="product.name">
                {{ product.name }} - SL: {{ product.quantity }} - Giá: 
                {{ product.price && !isNaN(product.price) ? product.price.toLocaleString() : '0' }}
              </div>
            </td> 
            <td>{{ order.order_date }}</td>
            <td>{{ order.note }}</td>
            <td class="text-center"><td :class="getStatusClass(order.status)">{{ order.status }}</td></td>
            <td>{{ order.discount_code || 'Không có' }}</td>
            <td>
              {{ order.total_price && !isNaN(order.total_price) ? order.total_price.toLocaleString() : '0' }} VNĐ
            </td>
            <td>
              <router-link :to="`/orders/detail/${order.id}`" class="btn btn-primary btn-sm me-2" >Chi tiết</router-link>
              <router-link 
                  v-if="order.status !== 'Hoàn thành' && order.status !== 'Đã hủy'" 
                  :to="`/orders/edit/${order.id}`" 
                  class="btn btn-warning btn-sm me-2"
                >Cập nhật</router-link>
              <button class="btn btn-danger btn-sm" @click="deleteOrder(order.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="d-flex justify-content-center mt-3">
        <vue-awesome-paginate
          :total-items="orders.length"
          :items-per-page="itemsperPage"
          :max-pages-shown="5"
          :show-ending-buttons="true"
          :show-breakpoint-buttons="false"
          v-model="currentPage"
        />
      </div>
    </div>
  </template>
  <script setup lang="js">
  import { ref, onMounted, computed } from "vue";
  import instanceAxios from '@/ultis/configAxios.js';
  
  const orders = ref([]);
  const currentPage = ref(1);
  const itemsperPage = 5;
  
  // Tính toán phân trang
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsperPage;
    const end = start + itemsperPage;
    return orders.value.slice(start, end);
  });
  
  // Lấy danh sách đơn hàng từ API
  const getOrders = async () => {
    try {
      const response = await instanceAxios.get("/orders");
      orders.value = response.data;
    } catch (error) {
      console.log(error);
      // Có thể thêm thông báo lỗi nếu cần
    }
  };
  // Xóa đơn hàng
  const deleteOrder = async (orderId) => {
    try {
      await instanceAxios.delete(`/orders/${orderId}`);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const getStatusClass = (status) => {
  if (status === 'Hoàn thành') return 'badge text-success';
  if (status === 'Đã hủy') return 'badge text-danger';
  return 'badge text-primary';
 };
  onMounted(getOrders);
  </script>
  