<template>
    <div class="container mt-4">
        <h1 class="mb-4 text-primary text-center ">Danh sách sản phẩm</h1>
        <router-link :to="`/products/add`" class="btn btn-success btn-sm mb-3">Thêm mới</router-link>
        <table class="table table-bordered table-striped table-hover">
            <thead class="table-secondary text-center">
                <tr>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                    <th>Danh mục</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="product in paginatedProducts" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td><img :src="product.image" alt="Hình ảnh" class="img-thumbnail" width="50" height="50"/></td>
                    <td>{{ product.category_id }}</td>
                    <td>{{ product.status }}</td>
                    <td>
                        <router-link :to="`/products/detail/${product.id}`" class="btn btn-primary btn-sm me-2">Chi tiết</router-link>
                        <router-link :to="`/products/edit/${product.id}`" class="btn btn-warning btn-sm me-2">Sửa</router-link>
                        <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center mt-3">
            <vue-awesome-paginate
                :total-items="products.length"
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

// const products = ref([]);
// const currentPage = ref(1);
// const itemsperPage = 5;

// const paginatedProducts = computed(() => {
//     const start = (currentPage.value - 1) * itemsperPage;
//     const end = start + itemsperPage;
//     return products.value.slice(start, end);
// });

const getProducts = async () => {
    try {
        const response = await instanceAxios.get("/products");
        products.value = response.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (id) => {
    const check = confirm("Xác nhận xóa?");
    if (!check) return;
    await instanceAxios.delete(`/products/${id}`);
    getProducts();
};

onMounted(getProducts);
</script>

<style>
.pagination-container {
    display: flex;
    column-gap: 10px;
}
.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}
.paginate-buttons:hover {
    background-color: #d8d8d8;
}
.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.active-page:hover {
    background-color: #2988c8;
}
</style>