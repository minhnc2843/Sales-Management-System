<template>
    <div class="container mt-4">
        <h1 class="text-center text-success mb-4">Thêm sản phẩm mới</h1>
        <div class="card p-4 shadow-lg">
            <form @submit.prevent="hendelSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">Tên sản phẩm</label>
                    <input v-model="product.name" type="text" class="form-control" id="name" >
                    <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Giá</label>
                    <input v-model="product.price" type="number" class="form-control" id="price" >
                    <div v-if="errors.price" class="text-danger">{{ errors.price }}</div>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Mô tả</label>
                    <textarea v-model="product.description" class="form-control" id="description"></textarea>
                    <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Hình ảnh</label>
                   <input v-model="product.image" type="text" id="image" class="form-control">
                   <div v-if="errors.image" class="text-danger">{{ errors.image }}</div>
                </div>
                <div class="mb-3">
                    <label for="category_id" class="form-label">Danh mục</label>
                    <select v-model="product.category_id" class="form-select" id="category_id">
                        <option value="Điện thoại">Điện thoại</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Phụ kiện">Phụ kiện</option>
                    </select>
                    <div v-if="errors.category_id" class="text-danger">{{ errors.category_id }}</div>
                </div>
                <div class="mb-3">
                    <label for="status" class="form-label">Trạng thái</label>
                    <select v-model="product.status" class="form-select" id="status">
                        <option value="">Trạng thái</option>
                        <option value="Còn hàng">Còn hàng</option>
                        <option value="Hết hàng">Hết hàng</option>
                    </select>
                    <div v-if="errors.status" class="text-danger">{{ errors.status }}</div>
                </div>
                <div class="d-flex justify-content-between">
                    <router-link to="/" class="btn btn-secondary">
                        <i class="bi bi-arrow-left"></i> Quay lại danh sách
                    </router-link>
                    <button type="submit" class="btn btn-success">
                        <i class="bi bi-plus-circle"></i> Thêm sản phẩm
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import instanceAxios from "@/ultis/configAxios";

const router = useRouter();
const product = ref({
    name: "",
    price: "",
    description: "",
    image: null,
    category_id:"" ,
    status: "",
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

    if (!product.value.category_id) {
        errors.value.category_id = "Bạn phải chọn danh mục.";
    }

    if (!product.value.status) {
        errors.value.status = "Bạn phải chọn trạng thái.";
    }

    return Object.keys(errors.value).length === 0; // Trả về true nếu không có lỗi
};
const hendelSubmit = async () => {
    if (!validateProduct()) return; 
    try {
        const { data } = await instanceAxios.post("/products", product.value);
        console.log(data);
        router.push("/");
    } catch (error) {
        console.error("Thêm sản phẩm thất bại", error);
    }
};


// Xử lý khi tải ảnh

</script>

<style scoped>
.card {
    border-radius: 12px;
}
.img-thumbnail {
    border-radius: 8px;
}
</style>
