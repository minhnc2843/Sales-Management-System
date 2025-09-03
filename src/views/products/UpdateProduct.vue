<template>
    <div class="container mt-4 ">
        <h1 class="text-center text-danger ">Cập nhật sản phẩm</h1>
        <div class="card p-4 shadow-lg">
        <form @submit.prevent="hendelSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Tên sản phẩm</label>
                <input type="text" class="form-control" id="name" v-model="product.name">
                <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Giá</label>
                <input type="number" class="form-control" id="price" v-model="product.price">
                <div v-if="errors.price" class="text-danger">{{ errors.price }}</div>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Mô tả</label>
                <textarea class="form-control" id="description" v-model="product.description"></textarea>
              <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
            </div>
            

            <div class="mb-3">
                <label for="image" class="form-label">Hình ảnh</label>
                <input type="text" class="form-control" id="image" v-model="product.image">   
                <div v-if="errors.image" class="text-danger">{{ errors.image }}</div>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Danh mục:</label>
                <select v-model="product.category_id" class="form-select" id="ctegory">
                        <option value="Điện thoại">Điện thoại</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Phụ kiện">Phụ kiện</option>
                    </select>
                    <div v-if="errors.category_id" class="text-danger">{{ errors.category_id }}</div>
            </div>
            
            <div class="mb-3">
                <label for="status" class="form-label">Trạng thái</label>
                <select v-model="product.status" class="form-select" id="status">
                        <option value="Hết hàng">Hết hàng</option>
                        <option value="Còn hàng">Còn hàng</option>
                    </select>
                    <div v-if="errors.status" class="text-danger">{{ errors.status }}</div>
            </div>
            <button type="submit" class="btn btn-primary me-3">Cập nhật</button>
            <router-link to="/" class="btn btn-success me-2">
                <i class="bi bi-arrow-left"></i> Quay lại danh sách
            </router-link>
        </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import instanceAxios from '@/ultis/configAxios.js';

const {params} = useRoute();
const router = useRouter();
const product = ref({
    name: '',
    price: '',
    description: '',
    category_id: '', 
    status: ''
});

const errors = ref({});

// Hàm kiểm tra dữ liệu sản phẩm
const validateProduct = () => {
    errors.value = {}; // Reset lỗi

    if (!product.value.name) {
        errors.value.name = "Tên sản phẩm không được để trống.";
    } 

    if (!product.value.price) {
        errors.value.price = "Giá không được để trống.";
    } else if (product.value.price <= 0) {
        errors.value.price = "Giá phải lớn hơn 0.";
    }

    if (!product.value.description) {
        errors.value.description = "Mô tả không được để trống.";
    }

    if (!product.value.image) {
        errors.value.image = "Hình ảnh không được để trống.";
    } 
    // else if (!/\.(jpeg|jpg|gif|png|svg|webp)$/i.test(product.value.image)) {
    //     errors.value.image = "Hình ảnh phải là URL hợp lệ.";
    // }

    if (!product.value.category_id) {
        errors.value.category_id = "Bạn phải chọn danh mục.";
    }

    if (!product.value.status) {
        errors.value.status = "Bạn phải chọn trạng thái.";
    }

    return Object.keys(errors.value).length === 0; // Trả về true nếu không có lỗi
};
const getProducts = async () => {
    try {
        const {data} = await instanceAxios.get(`/products/${params.id}`);
        product.value = data;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
    }
};
const hendelSubmit = async () => {
    if (!validateProduct()) return; // Kiểm tra dữ liệu trước khi gửi API
   await instanceAxios.put(`/products/${params.id}`, product.value);
   router.push('/products');
};

onMounted(() => {
    getProducts();
});
</script>

<style lang="scss" scoped>

</style>