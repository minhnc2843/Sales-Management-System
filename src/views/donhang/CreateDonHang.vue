<template>
  <div class="container py-4">
    <div class="row">
      <!-- Bên trái: Danh sách sản phẩm (6 cột) -->
      <div class="col-md-6">
        <h2 class="text-xl fw-bold mb-2">Danh sách sản phẩm</h2>
        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm sản phẩm..." class="form-control mb-4" />
        <table class="table table-bordered text-center">
          <thead class="table-light">
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td><img :src="product.image" alt="Ảnh" width="50px" /></td>
              <td>{{ product.name }}</td>
              <td>{{ formatPrice(product.price) }} VNĐ</td>
              <td>
                <button @click="addToOrder(product)" class="btn btn-sm btn-primary me-1">+</button>
                <button @click="removeOneFromOrder(product)" class="btn btn-sm btn-warning">-</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bên phải: Đơn hàng (4 cột) -->
      <div class="col-md-4">
        <h2 class="text-xl fw-bold mb-2">Đơn hàng đang tạo</h2>

        <div v-if="errors.selectedCustomer" class="text-danger mb-1">
          {{ errors.selectedCustomer }}
        </div>
        <div v-if="errors.product" class="text-danger mb-1">
          {{ errors.product }}
        </div>

        <div class="mb-2">
          <label>Chọn khách hàng:</label>
          <select v-model="selectedCustomer" class="form-select">
            <option v-for="customer in customers" :key="customer.id" :value="customer">
              {{ customer.name }}
            </option>
          </select>
        </div>

        <form @submit.prevent="handleSubmit" class="mb-3">
          <label class="form-label">Tạo nhanh khách hàng:</label>
          <input v-model="newCustomer.name" type="text" class="form-control mb-2" placeholder="Nhập tên khách hàng" />
          <button type="submit" class="btn btn-info">Tạo khách mới</button>
        </form>

        <table class="table table-bordered text-center">
          <thead class="table-light">
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.products" :key="index">
              <td><img :src="item.image" alt="Ảnh" width="50px" /></td>
              <td>{{ item.name }}</td>
              <td>
                <button @click="addToOrder(item)" class="btn btn-sm btn-primary">+</button>
                {{ item.quantity }}
                <button @click="removeOneFromOrder(item)" class="btn btn-sm btn-warning">-</button>
              </td>
              <td>{{ formatPrice(item.quantity * item.price) }} VNĐ</td>
              <td><button class="btn btn-sm btn-danger" @click="removeFromOrder(index)">Xóa</button></td>
            </tr>
          </tbody>
        </table>

        <p class="fw-bold mt-2">Tổng tiền: {{ formatPrice(totalPrice) }} VNĐ</p>

        <div class="mb-2">
          <label>Ghi chú:</label>
          <input v-model="order.note" type="text" class="form-control" placeholder="Nhập ghi chú" />
        </div>

        <div class="mb-2">
          <label>Giảm giá (%):</label>
          <input v-model.number="order.discount" type="number" class="form-control" placeholder="Nhập giảm giá" />
        </div>

        <button @click="submitOrder" class="btn btn-success mt-3">Tạo đơn hàng</button>
      </div>
    </div>
  </div>
</template>




<script setup>
import { ref, computed, onMounted } from 'vue'
import instanceAxios from '@/ultis/configAxios'

const products = ref([])
const customers = ref([])
const searchQuery = ref("")
const selectedCustomer = ref(null)
const newCustomer = ref({ name: "" })

const order = ref({
  products: [],
  note: "",
  discount: 0,
  total_price: null,
  order_date: null,
  status: null,
  customer_name: null,
 

})
const errors = ref({
  selectedCustomer: "",
  product: "",
  name: ""
})

const formatPrice = (value) => {
  return Number(value).toLocaleString()
}

const filteredProducts = computed(() =>
  products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const totalPrice = computed(() =>
  order.value.products.reduce((total, item) => total + item.price * item.quantity, 0)
)

const finalPrice = computed(() =>
  totalPrice.value * (1 - order.value.discount / 100)
)

const addToOrder = (product) => {
  let existingProduct = order.value.products.find(p => p.id === product.id)
  if (existingProduct) {
    existingProduct.quantity++
  } else {
    order.value.products.push({ ...product, quantity: 1 })
  }
}

const removeOneFromOrder = (product) => {
  let existingProduct = order.value.products.find(p => p.id === product.id)
  if (existingProduct) {
    existingProduct.quantity--
    if (existingProduct.quantity <= 0) {
      order.value.products = order.value.products.filter(p => p.id !== product.id)
    }
  }
}

const removeFromOrder = (index) => {
  order.value.products.splice(index, 1)
}

const handleSubmit = () => {
  if (newCustomer.value.name.trim() === "") return
  const newId = Date.now()
  const created = { id: newId, name: newCustomer.value.name }
  customers.value.push(created)
  selectedCustomer.value = created
  newCustomer.value.name = ""
}

const submitOrder = () => {
  errors.value = { selectedCustomer: "", product: "", name: "" }

  if (!selectedCustomer.value) {
    errors.value.selectedCustomer = "Vui lòng chọn khách hàng!";
    return;
  } else if (order.value.products.length === 0) {
    errors.value.product = "Vui lòng thêm sản phẩm vào đơn hàng!";
    return;
  }

  const newOrder = {
    id: Date.now().toString(),
    customer_name: selectedCustomer.value.name,
    products: order.value.products,
    order_date: new Date().toISOString().split('T')[0],
    status: "Chờ xác nhận",
    note: order.value.note,
    discount: order.value.discount,
    total_price: finalPrice.value
  }

  instanceAxios.post("/orders", newOrder)
    .then(() => {
      alert("Đơn hàng đã được tạo thành công!")
      order.value = { products: [], note: "", discount: 0 }
      selectedCustomer.value = null
    })
    .catch(error => console.error("Lỗi khi tạo đơn hàng:", error))
}

onMounted(() => {
  instanceAxios.get("/products")
    .then(response => {
      products.value = response.data
    })
    .catch(error => console.error("Lỗi khi lấy sản phẩm:", error))

  instanceAxios.get("/customers")
    .then(response => {
      customers.value = response.data
    })
    .catch(error => console.error("Lỗi khi lấy khách hàng:", error))
})
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
