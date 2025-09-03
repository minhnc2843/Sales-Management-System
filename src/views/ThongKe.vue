<template>
  <div class="container bg-light p-4 rounded shadow">
    <h1 class="text-center text-primary mb-4">Thống kê doanh số</h1>

    <div class="row g-3">
      <div class="col-md-3">
        <div class="card text-white bg-success">
          <div class="card-body text-center">
            <h5 class="card-title">Tổng doanh thu tháng:</h5>
            <p class="card-text fs-4">{{ formatCurrency(totalRevenue) }}</p>
            <h5 class="card-title">Tổng doanh thu năm:</h5>
            <p class="card-text fs-4">{{ formatCurrency(totalRevenue) }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-white bg-success">
          <div class="card-body text-center">
            <h5 class="card-title">Tổng sản phẩm bán</h5>
            <p class="card-text fs-4">{{ totalProductsSold }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-white bg-success">
          <div class="card-body text-center">
            <h5 class="card-title">Danh sách 5 sản phẩm bán chạy nhất</h5>
            <ul class="list-group">
              <li class="list-group-item bg-success text-white" v-for="product in bestSellingProducts" :key="product.id">
                {{ product.name }} ({{ product.quantity }} sp)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-white bg-success">
          <div class="card-body text-center">
            <h5 class="card-title">Top 5 khách hàng</h5>
            <ul class="list-group">
              <li class="list-group-item bg-success text-white" v-for="customer in topCustomers" :key="customer.name">
                {{ customer.name }} - {{ formatCurrency(customer.totalSpent) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3" style="width: 100%; height: 50;">
      <canvas ref="chartCanvas" class="w-100"></canvas>
      <h3 class="text-center text-primary">Biểu đồ sản tất cả sản phẩm bán ra</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import instanceAxios from "@/ultis/configAxios";

const orders = ref([]);
const totalRevenue = ref(0);
const totalProductsSold = ref(0);
const bestSellingProducts = ref([]);
const topCustomers = ref([]);
const chartCanvas = ref(null);

const fetchOrders = async () => {
  try {
    const response = await instanceAxios.get("/orders");
    orders.value = response.data.filter(order => order.status === "Hoàn thành");

    totalRevenue.value = orders.value.reduce((sum, order) => sum + order.total_price, 0);

    const productCounts = {};
    const customerSpending = {};

    orders.value.forEach(order => {
      order.products.forEach(product => {
        if (!productCounts[product.id]) {
          productCounts[product.id] = { id: product.id, name: product.name, quantity: 0 };
        }
        productCounts[product.id].quantity += product.quantity;
      });

      if (!customerSpending[order.customer_name]) {
        customerSpending[order.customer_name] = 0;
      }
      customerSpending[order.customer_name] += order.total_price;
    });

    totalProductsSold.value = Object.values(productCounts).reduce((sum, product) => sum + product.quantity, 0);
    bestSellingProducts.value = Object.values(productCounts).sort((a, b) => b.quantity - a.quantity).slice(0, 5);

    topCustomers.value = Object.entries(customerSpending)
      .map(([name, totalSpent]) => ({ name, totalSpent }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    drawChart(productCounts);
  } catch (error) {
    console.error("Lỗi khi tải đơn hàng:", error);
  }
};

const drawChart = productCounts => {
  const ctx = chartCanvas.value.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.values(productCounts).map(p => p.name),
      datasets: [
        {
          label: "Số lượng bán",
          data: Object.values(productCounts).map(p => p.quantity),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
  });
};

const formatCurrency = value => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

onMounted(fetchOrders);
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.stat-card {
  background: #f3f4f6;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>