<template>
    <div class="container mt-4">
        <h1 class="text-center text-success mb-4">Thêm người dùng</h1>
        <div class="card p-4 shadow-lg">
            <form @submit.prevent="hendelSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">Tên người dùng</label>
                    <input v-model="customer.name" type="text" class="form-control" id="name">
                    <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Hình ảnh</label>
                   <input v-model="customer.image" type="text" id="image" class="form-control">
                   <div v-if="errors.image" class="text-danger">{{ errors.image }}</div>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Số điện thoại</label>
                    <input v-model="customer.phone" type="text" class="form-control" id="phone" >
                    <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
                </div> 
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="customer.email" type="text" class="form-control" id="email" >
                    <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                </div>             
                <div class="mb-3">
                    <label for="price" class="form-label">Địa chỉ</label>
                    <input v-model="customer.address" type="text" class="form-control" id="address" >
                    <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
                </div>
                <div class="mb-3">
                    <label for="status" class="form-label">Vai trò</label>
                    <select v-model="customer.role" class="form-select" id="status">
                        <option value="Khách hàng">Khách hàng</option>
                        <option value="Nhân viên">Nhân viên</option>
                        <option value="Quản trị viên">Quản trị viên</option>
                    </select>
                    <div v-if="errors.role" class="text-danger">{{ errors.role }}</div>
                </div>
                <div class="d-flex justify-content-between">
                    <router-link to="/customers" class="btn btn-secondary">
                        <i class="bi bi-arrow-left"></i> Quay lại danh sách
                    </router-link>
                    <button type="submit" class="btn btn-success">
                        <i class="bi bi-plus-circle"></i> Thêm người dùng
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
const customer = ref({
    name: "",
    phone: "",
    email: "",
    address: "",
    image: null,
    role:"" ,
   
});
const errors = ref({});

// Hàm validate dữ liệu đầu vào
const validateCustomer = () => {
    errors.value = {}; // Reset lỗi

    if (!customer.value.name) {
        errors.value.name = "Tên không được để trống.";
    } else if (/\d/.test(customer.value.name)) {
        errors.value.name = "Tên không được chứa số.";
    }

    if (!customer.value.phone) {
    errors.value.phone = "Số điện thoại không được để trống.";
    } else if (!/^\d+$/.test(customer.value.phone)) {
        errors.value.phone = "Số điện thoại chỉ được chứa số.";
    }

    if (!customer.value.email) {
        errors.value.email = "Email không được để trống.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.value.email)) {
        errors.value.email = "Email không hợp lệ.";
    }

    if (!customer.value.address) {
        errors.value.address = "Địa chỉ không được để trống.";
    }

    if (!customer.value.image) {
        errors.value.image = "Hình ảnh không được để trống.";
    } else if (!/\.(jpeg|jpg|gif|png|svg|webp)$/i.test(customer.value.image)) {
        errors.value.image = "Hình ảnh phải là URL hợp lệ.";
    }

    if (!customer.value.role) {
        errors.value.role = "Bạn phải chọn vai trò.";
    }

    return Object.keys(errors.value).length === 0; // Trả về true nếu không có lỗi
};
const hendelSubmit = async () => {
    if (!validateCustomer()) return;
    try {
        const { data } = await instanceAxios.post("/customers", customer.value);
        console.log(data);
        router.push("/customers");
    } catch (error) {
        console.error("Thêm sản phẩm thất bại", error);
    }
};



</script>

<style scoped>
.card {
    border-radius: 12px;
}
.img-thumbnail {
    border-radius: 8px;
}
</style>
