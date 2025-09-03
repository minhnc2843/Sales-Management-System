<template>
    <div class="container mt-4 ">
        <h1 class="text-center text-danger ">Cập nhật Thông tin người dùng</h1>
        <div class="card p-4 shadow-lg">
        <form @submit.prevent="hendelSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">ID: {{ customer.id }}</label>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Tên Người dùng</label>
                <input type="text" class="form-control" id="name" v-model="customer.name">
                <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input type="text" class="form-control" id="phone" v-model="customer.phone">
                <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>
            <div class="mb-3">
                <label for="address" class="form-label">Địa chỉ</label>
                <input type="text" class="form-control" id="address" v-model="customer.address">
                <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Hình ảnh</label>
                <input type="text" class="form-control" id="image" v-model="customer.image">
                <div v-if="errors.image" class="text-danger">{{ errors.image }}</div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="text" class="form-control" id="category" v-model="customer.email">
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Vai trò:</label>
                <select v-model="customer.role" class="form-select" id="status">
                        <option value="Khách hàng">Khách hàng</option>
                        <option value="Nhân viên">Nhân viên</option>
                        <option value="Quản trị viên">Quản trị viên</option>
                    </select>
                    <div v-if="errors.role" class="text-danger">{{ errors.role }}</div>
            </div>
            <button type="submit" class="btn btn-primary me-3">Cập nhật</button>
            <router-link to="/customers" class="btn btn-success me-2">
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
const customer = ref({
    name: '',
    phone: '',
    image: '',
    email: '', 
    role: '',
    address:''
});
const errors = ref({});

// Hàm validate dữ liệu đầu vào
const validateCustomer = () => {
    errors.value = []; // Reset lỗi

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
    } 
    // else if (!/\.(jpeg|jpg|gif|png|svg|webp)$/i.test(customer.value.image)) {
    //     errors.value.image = "Hình ảnh phải là URL hợp lệ.";
    // }

    if (!customer.value.role) {
        errors.value.role = "Bạn phải chọn vai trò.";
    }

    return Object.keys(errors.value).length === 0; // Trả về true nếu không có lỗi
};
const getcustomers = async () => {
    try {
        const {data} = await instanceAxios.get(`/customers/${params.id}`);
        customer.value = data;
    } catch (error) {
        console.error("Lỗi khi call API khách:", error);
    }
};
const hendelSubmit = async () => {
    if (!validateCustomer()) return;
   await instanceAxios.put(`/customers/${params.id}`, customer.value);
   router.push('/customers');
};

onMounted(() => {
    getcustomers();
});
</script>

<style lang="scss" scoped>

</style>