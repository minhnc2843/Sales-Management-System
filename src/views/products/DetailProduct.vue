<template>
    <div class="container mt-4">
        <h1 class="text-center text-primary mb-4">Chi tiết sản phẩm</h1>
        <div class="card shadow-lg p-4">
            <div class="row">
                <!-- Hình ảnh sản phẩm -->
                <div class="col-md-5 text-center">
                    <img :src="product.image" alt="Hình ảnh sản phẩm" class="img-fluid rounded shadow-sm" style="max-height: 400px;"> 
                </div>
                
                <!-- Thông tin sản phẩm -->
                <div class="col-md-7">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>ID sản phẩm:  </strong> {{ product.id }}</li>
                        <li class="list-group-item"><strong>Tên sản phẩm: </strong> {{ product.name }}</li>
                        <li class="list-group-item"><strong>Giá:    </strong> 
                            <span class="text-danger fw-bold">{{ product.price}}</span>
                        </li>
                        <li class="list-group-item"><strong>Mô tả:</strong> {{ product.description }}</li>
                        <li class="list-group-item"><strong>Danh mục:</strong> {{ product.category_id }}</li>
                    </ul>
                </div>
            </div>

            <!-- Nút hành động -->
            <div class="d-flex justify-content-center mt-4">
                <router-link to="/" class="btn btn-success me-2">
                    <i class="bi bi-arrow-left"></i> Quay lại danh sách
                </router-link>
                <router-link :to="`/products/edit/${product.id}`" 
                class="btn btn-warning btn-sm me-2">Sửa sản phẩm</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import instanceAxios from '@/ultis/configAxios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const product = ref({});
const route = useRoute();

const getProduct = async () => {
    try {
        const { data } = await instanceAxios.get(`/products/${route.params.id}`);
        product.value = data;
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
};


onMounted(() => {
    getProduct();
});
</script>

